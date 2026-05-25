export type SpokenReplyStatusKind =
  | "queued"
  | "synthesizing"
  | "ready"
  | "playing"
  | "deferred"
  | "success"
  | "failure"
  | "stopped"
  | "muted";

export function formatSpokenReplyStatus(kind: SpokenReplyStatusKind, detail?: string): string {
  switch (kind) {
    case "queued":
      return `Spoken reply queued${detail ? `: ${detail}` : ""}`;
    case "synthesizing":
      return `Spoken reply converting text to audio${detail ? `: ${detail}` : ""}`;
    case "ready":
      return `Spoken reply ready to play${detail ? `: ${detail}` : ""}`;
    case "playing":
      return `Spoken reply playing${detail ? `: ${detail}` : ""}`;
    case "deferred":
      return `Spoken reply deferred${detail ? `: ${detail}` : ""}`;
    case "success":
      return `Spoken reply played${detail ? `: ${detail}` : ""}`;
    case "failure":
      return `Spoken reply failed${detail ? `: ${detail}` : ""}`;
    case "stopped":
      return `Spoken reply stopped${detail ? `: ${detail}` : ""}`;
    case "muted":
      return `Spoken reply muted${detail ? `: ${detail}` : ""}`;
  }
}
