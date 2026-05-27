import { createRequire } from "node:module";
import type { Readable } from "node:stream";

export type DecibriCaptureOptions = {
  sampleRate?: number;
  channels?: number;
  device?: number | string;
  format?: "int16" | "float32";
  vad?: boolean;
};

export type DecibriCaptureHandle = {
  stream(): Readable;
  stop(): Promise<void>;
};

type DecibriLike = new (options?: DecibriCaptureOptions) => Readable & { stop(): Promise<void> | void };

function loadDefaultCreateDecibri(): DecibriLike {
  return createRequire(import.meta.url)("decibri") as DecibriLike;
}

export function createDecibriCapture(
  options: DecibriCaptureOptions = {},
  createDecibri: DecibriLike = loadDefaultCreateDecibri(),
): DecibriCaptureHandle {
  const mic = new createDecibri({
    sampleRate: options.sampleRate ?? 16000,
    channels: options.channels ?? 1,
    device: options.device,
    format: options.format ?? "int16",
    vad: options.vad ?? false,
  });

  return {
    stream(): Readable {
      return mic;
    },
    async stop(): Promise<void> {
      await Promise.resolve(mic.stop());
    },
  };
}
