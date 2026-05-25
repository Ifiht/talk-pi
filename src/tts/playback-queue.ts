import fs from "node:fs/promises";
import { formatSpokenReplyStatus } from "../ui/spoken-reply-status.ts";
import { normalizeSpokenText } from "./spoken-text.ts";
import { synthesizeSpeechToWav, type PiperClientOptions } from "./piper-client.ts";
import { createWavPlayer, type WavPlayer } from "./wav-player.ts";

export type PlaybackQueueItem = {
  text: string;
  createdAt: number;
};

export type PlaybackQueueOptions = {
  synthesize?: typeof synthesizeSpeechToWav;
  player?: WavPlayer;
  isRecordingBlocked?: () => boolean;
  onNotify?: (message: string, level: "info" | "warning" | "error") => void;
  onStatus?: (message: string) => void;
  piper?: PiperClientOptions;
};

export type PlaybackQueue = {
  enqueue(text: string): Promise<void>;
  setRecordingBlocked(blocked: boolean): Promise<void>;
  setMuted(muted: boolean): Promise<void>;
  drain(): Promise<void>;
  pendingCount(): number;
  stop(): Promise<boolean>;
  isPlaying(): boolean;
  isMuted(): boolean;
};

export function createPlaybackQueue(options: PlaybackQueueOptions = {}): PlaybackQueue {
  const queue: PlaybackQueueItem[] = [];
  let busy = false;
  let recordingBlocked = false;
  let muted = false;
  let muteStopping = false;
  let stopping = false;
  let activePlayback = false;
  let currentAudioPath: string | undefined;

  const synthesize = options.synthesize ?? ((text) => synthesizeSpeechToWav(text, options.piper));
  const player = options.player ?? createWavPlayer();
  const isBlocked = () => (options.isRecordingBlocked?.() ?? recordingBlocked) || muted;

  const notify = (message: string, level: "info" | "warning" | "error") => {
    options.onNotify?.(message, level);
  };

  const status = (kind: Parameters<typeof formatSpokenReplyStatus>[0], detail?: string) => {
    options.onStatus?.(formatSpokenReplyStatus(kind, detail));
  };

  const process = async (): Promise<void> => {
    if (busy || isBlocked() || !queue.length) return;
    busy = true;

    try {
      while (queue.length && !isBlocked()) {
        const item = queue.shift();
        if (!item) break;
        const text = normalizeSpokenText(item.text);
        if (!text) {
          status("deferred", "empty reply");
          continue;
        }

        let audioPath: string | undefined;
        try {
          status("synthesizing", text.slice(0, 32));
          const result = await synthesize(text);
          audioPath = result.audioPath;
          currentAudioPath = audioPath;
          if (stopping) {
            status("stopped", pathBase(audioPath));
            break;
          }
          if (muteStopping) {
            muteStopping = false;
            status("stopped", pathBase(audioPath));
            break;
          }
          if (isBlocked()) {
            queue.unshift(item);
            status(muted ? "deferred" : "stopped", pathBase(audioPath));
            break;
          }
          status("ready", pathBase(audioPath));
          activePlayback = true;
          status("playing", pathBase(audioPath));
          await player.play(audioPath);
          activePlayback = false;
          currentAudioPath = undefined;
          if (stopping) {
            status("stopped", pathBase(audioPath));
            break;
          }
          if (muteStopping) {
            muteStopping = false;
            status("stopped", pathBase(audioPath));
            break;
          }
          if (isBlocked()) {
            queue.unshift(item);
            status(muted ? "deferred" : "stopped", pathBase(audioPath));
            break;
          }
          status("success", pathBase(audioPath));
        } catch (error) {
          activePlayback = false;
          currentAudioPath = undefined;
          if (stopping) {
            status("stopped", audioPath ? pathBase(audioPath) : undefined);
            break;
          }
          status("failure", error instanceof Error ? error.message : "playback failed");
          notify(error instanceof Error ? error.message : "playback failed", "error");
        } finally {
          if (audioPath) {
            await fs.unlink(audioPath).catch(() => undefined);
          }
        }
      }
    } finally {
      busy = false;
      currentAudioPath = undefined;
      activePlayback = false;
      const shouldRestart = queue.length > 0 && !isBlocked();
      stopping = false;
      if (shouldRestart) {
        void process();
      }
    }
  };

  return {
    async enqueue(text: string): Promise<void> {
      const reply = normalizeSpokenText(text);
      if (!reply) {
        status("deferred", "empty reply");
        return;
      }
      queue.push({ text: reply, createdAt: Date.now() });
      status("queued", reply.slice(0, 32));
      await process();
    },
    async setRecordingBlocked(blocked: boolean): Promise<void> {
      recordingBlocked = blocked;
      if (!blocked) {
        await process();
      }
    },
    async setMuted(nextMuted: boolean): Promise<void> {
      const wasMuted = muted;
      muted = nextMuted;
      if (muted && !wasMuted) {
        if (activePlayback) {
          muteStopping = true;
        }
        if (activePlayback || busy) {
          await player.stop().catch(() => undefined);
        }
        status("stopped", currentAudioPath ? pathBase(currentAudioPath) : undefined);
        activePlayback = false;
      }
      if (!muted) {
        await process();
      }
    },
    async drain(): Promise<void> {
      await process();
    },
    pendingCount(): number {
      return queue.length + (busy ? 1 : 0);
    },
    isPlaying(): boolean {
      return activePlayback;
    },
    isMuted(): boolean {
      return muted;
    },
    async stop(): Promise<boolean> {
      if (!activePlayback && !busy) {
        return false;
      }

      stopping = true;
      queue.length = 0;
      activePlayback = false;
      status("stopped", currentAudioPath ? pathBase(currentAudioPath) : undefined);
      currentAudioPath = undefined;
      if (busy) {
        void player.stop().catch(() => undefined);
      } else {
        await player.stop().catch(() => undefined);
      }
      return true;
    },
  };
}

function pathBase(audioPath: string): string {
  return audioPath.split(/[\\/]/).pop() ?? audioPath;
}
