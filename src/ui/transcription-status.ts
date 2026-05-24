export type TranscriptionStatus = "idle" | "recording" | "transcribing" | "inserting" | "ready" | "no-speech" | "error";

export function formatTranscriptionStatus(status: TranscriptionStatus, detail?: string): string {
  switch (status) {
    case "idle":
      return "Voice ready";
    case "recording":
      return `Voice recording${detail ? `: ${detail}` : ""}`;
    case "transcribing":
      return `Transcribing audio${detail ? `: ${detail}` : ""}`;
    case "inserting":
      return `Inserting transcript${detail ? `: ${detail}` : ""}`;
    case "ready":
      return `Transcript ready${detail ? `: ${detail}` : ""}`;
    case "no-speech":
      return `No speech detected${detail ? `: ${detail}` : ""}`;
    case "error":
      return `Transcription error${detail ? `: ${detail}` : ""}`;
  }
}
