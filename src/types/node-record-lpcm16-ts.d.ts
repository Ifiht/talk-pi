declare module "node-record-lpcm16-ts" {
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
    stream(): NodeJS.ReadableStream;
    stop(): void;
    pause?(): void;
    resume?(): void;
  };

  export function record(options?: RecordingOptions): RecordingHandle;
}
