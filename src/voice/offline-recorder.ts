import fs from "node:fs";
import fsp from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import type { Readable } from "node:stream";
import { setTimeout as delay } from "node:timers/promises";
import { createDecibriCapture, type DecibriCaptureHandle, type DecibriCaptureOptions } from "./decibri-capture.ts";

export type RecordingOptions = DecibriCaptureOptions;

export type MicCapture = {
  filePath: string;
  stop(): Promise<void>;
};

type MicCaptureDeps = {
  captureDir?: () => string;
  createCapture?: (options?: RecordingOptions) => DecibriCaptureHandle;
};

function captureDir(): string {
  return path.join(os.homedir(), ".pi", "voice-recordings");
}

function wavHeader(dataLength: number, sampleRate = 16000, channels = 1, bitsPerSample = 16): Buffer {
  const blockAlign = (channels * bitsPerSample) / 8;
  const byteRate = sampleRate * blockAlign;
  const header = Buffer.alloc(44);

  header.write("RIFF", 0, 4, "ascii");
  header.writeUInt32LE(36 + dataLength, 4);
  header.write("WAVE", 8, 4, "ascii");
  header.write("fmt ", 12, 4, "ascii");
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write("data", 36, 4, "ascii");
  header.writeUInt32LE(dataLength, 40);

  return header;
}

async function writeWavFile(filePath: string, pcmChunks: Buffer[]): Promise<void> {
  const pcm = Buffer.concat(pcmChunks);
  await fsp.writeFile(filePath, Buffer.concat([wavHeader(pcm.length), pcm]));
}

function isReadable(value: unknown): value is Readable {
  return Boolean(value) && typeof (value as Readable).on === "function";
}

export function startMicCapture(deps: MicCaptureDeps = {}): MicCapture {
  const filePath = path.join((deps.captureDir ?? captureDir)(), `talk-pi-voice-${Date.now()}.wav`);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  const recording = (deps.createCapture ?? createDecibriCapture)({
    sampleRate: 16000,
    channels: 1,
    format: "int16",
    vad: false,
  });

  const source = recording.stream();
  if (!isReadable(source)) {
    throw new Error("Recorder stream unavailable.");
  }

  const pcmChunks: Buffer[] = [];
  let streamError: Error | undefined;

  source.on("data", (chunk: Buffer) => {
    pcmChunks.push(Buffer.from(chunk));
  });
  source.once("error", (error: Error) => {
    streamError = error;
  });
  source.resume();

  return {
    filePath,
    async stop(): Promise<void> {
      if (streamError) {
        throw streamError;
      }

      await Promise.resolve(recording.stop());
      source.destroy();
      if (streamError) {
        throw streamError;
      }
      await writeWavFile(filePath, pcmChunks);
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
