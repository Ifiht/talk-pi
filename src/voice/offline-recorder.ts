import fs from "node:fs";
import fsp from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { once } from "node:events";
import { spawn, spawnSync } from "node:child_process";
import type { Readable } from "node:stream";
import { setTimeout as delay } from "node:timers/promises";

export type RecordingOptions = {
  sampleRate?: number;
  channels?: number;
  threshold?: number;
  thresholdStart?: number | null;
  thresholdEnd?: number | null;
  silence?: string;
  recorder?: string;
  endOnSilence?: boolean;
  audioType?: string;
  device?: string | null;
  verbose?: boolean;
};

export type RecordingHandle = {
  stream(): Readable;
  stop(): Promise<void> | void;
  pause?(): void;
  resume?(): void;
};

let recorderModule: { record?: (options?: RecordingOptions) => RecordingHandle } | undefined;

function commandExists(command: string): boolean {
  if (process.platform === "win32") {
    const result = spawnSync("where", [command], { stdio: "ignore" });
    return !result.error && result.status === 0;
  }

  const result = spawnSync("sh", ["-lc", `command -v ${command} >/dev/null 2>&1`], { stdio: "ignore" });
  return !result.error && result.status === 0;
}

function resolveRecorderProgram(): string {
  if (process.platform === "win32") {
    return "sox";
  }

  for (const candidate of ["sox", "rec", "arecord"]) {
    if (commandExists(candidate)) {
      return candidate;
    }
  }

  throw new Error("No microphone recorder found. Install sox, rec, or arecord.");
}

function buildRecorderCommand(options: RecordingOptions, recorder: string): {
  cmd: string;
  args: string[];
  spawnOptions: { env?: NodeJS.ProcessEnv };
} {
  const sampleRate = options.sampleRate?.toString() ?? "16000";
  const channels = options.channels?.toString() ?? "1";
  const audioType = options.audioType ?? "wav";
  const spawnOptions: { env?: NodeJS.ProcessEnv } = {};

  switch (recorder) {
    case "sox": {
      let args = [
        "--default-device",
        "--no-show-progress",
        "--rate",
        sampleRate,
        "--channels",
        channels,
        "--encoding",
        "signed-integer",
        "--bits",
        "16",
        "--type",
        audioType,
        "-",
      ];

      if (options.endOnSilence) {
        const thresholdStart = options.thresholdStart ?? `${options.threshold ?? 0.5}%`;
        const thresholdEnd = options.thresholdEnd ?? `${options.threshold ?? 0.5}%`;
        args = args.concat([
          "silence",
          "1",
          "0.1",
          thresholdStart.toString(),
          "1",
          options.silence?.toString() ?? "1.0",
          thresholdEnd.toString(),
        ]);
      }

      if (options.device) {
        spawnOptions.env = { ...process.env, AUDIODEV: options.device };
      }

      return { cmd: "sox", args, spawnOptions };
    }

    case "rec": {
      let args = [
        "-q",
        "-r",
        sampleRate,
        "-c",
        channels,
        "-e",
        "signed-integer",
        "-b",
        "16",
        "-t",
        audioType,
        "-",
      ];

      if (options.endOnSilence) {
        const thresholdStart = options.thresholdStart ?? `${options.threshold ?? 0.5}%`;
        const thresholdEnd = options.thresholdEnd ?? `${options.threshold ?? 0.5}%`;
        args = args.concat([
          "silence",
          "1",
          "0.1",
          thresholdStart.toString(),
          "1",
          options.silence?.toString() ?? "1.0",
          thresholdEnd.toString(),
        ]);
      }

      return { cmd: "rec", args, spawnOptions };
    }

    case "arecord":
    default: {
      const args = [
        "-q",
        "-r",
        sampleRate,
        "-c",
        channels,
        "-t",
        audioType,
        "-f",
        "S16_LE",
        "-",
      ];

      if (options.device) {
        args.unshift("-D", options.device);
      }

      return { cmd: "arecord", args, spawnOptions };
    }
  }
}

function createLocalRecorder(): { record: (options?: RecordingOptions) => RecordingHandle } {
  return {
    record(options: RecordingOptions = {}): RecordingHandle {
      const recorder = options.recorder ?? resolveRecorderProgram();
      const { cmd, args, spawnOptions } = buildRecorderCommand(options, recorder);
      const child = spawn(cmd, args, {
        stdio: ["ignore", "pipe", "pipe"],
        ...spawnOptions,
      });

      if (!child.stdout) {
        throw new Error("Recorder stdout unavailable.");
      }

      const terminate = () => {
        if (child.exitCode !== null || child.signalCode !== null) {
          return;
        }

        if (process.platform === "win32" && child.pid) {
          spawnSync("taskkill", ["/PID", String(child.pid), "/T", "/F"], { stdio: "ignore" });
          return;
        }

        child.kill("SIGINT");
        setTimeout(() => {
          if (child.exitCode === null && child.signalCode === null) {
            child.kill("SIGKILL");
          }
        }, 500).unref?.();
      };

      return {
        stream() {
          return child.stdout;
        },
        async stop(): Promise<void> {
          terminate();
          await Promise.race([
            once(child, "close").then(() => undefined),
            delay(1500).then(() => undefined),
          ]);
        },
      };
    },
  };
}

function loadRecorder(): { record: (options?: RecordingOptions) => RecordingHandle } {
  if (!recorderModule) {
    recorderModule = createLocalRecorder();
  }

  if (typeof recorderModule.record !== "function") {
    throw new Error("Recorder unavailable.");
  }

  return recorderModule;
}

export type MicCapture = {
  filePath: string;
  stop(): Promise<void>;
};

function captureDir(): string {
  return path.join(os.homedir(), ".pi", "voice-recordings");
}

type MicCaptureDeps = {
  resolveRecorderProgram?: () => string;
  loadRecorder?: () => { record: (options?: RecordingOptions) => RecordingHandle };
};

export function startMicCapture(deps: MicCaptureDeps = {}): MicCapture {
  const filePath = path.join(captureDir(), `talk-pi-voice-${Date.now()}.wav`);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const file = fs.createWriteStream(filePath, { encoding: "binary" });
  const recorder = (deps.resolveRecorderProgram ?? resolveRecorderProgram)();
  const { record } = (deps.loadRecorder ?? loadRecorder)();
  const recording = record({
    sampleRate: 16000,
    channels: 1,
    threshold: 0,
    endOnSilence: false,
    silence: "1000.0",
    audioType: "wav",
    verbose: false,
    recorder,
  });
  const source = recording.stream();

  source.pipe(file);

  return {
    filePath,
    async stop(): Promise<void> {
      source.unpipe(file);
      source.destroy();
      await Promise.resolve(recording.stop());
      if (!file.writableEnded) {
        file.end();
      }
      await Promise.race([
        Promise.all([once(file, "finish"), once(file, "close")]).then(() => undefined),
        delay(1500).then(() => undefined),
      ]);
    },
  };
}

export async function cleanupCapture(filePath: string): Promise<void> {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      await fsp.unlink(filePath);
      return;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return;
      }
      if (attempt === 4) {
        return;
      }
      await delay(50 * (attempt + 1));
    }
  }
}

export { buildRecorderCommand, resolveRecorderProgram };
