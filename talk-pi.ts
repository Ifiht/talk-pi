import { CustomEditor } from "@mariozechner/pi-coding-agent";
import { isKeyRelease, matchesKey } from "@mariozechner/pi-tui";
import { insertTranscriptIntoEditor } from "./src/input/editor-insert.ts";
import { runVoiceShortcut } from "./src/input/voice-shortcut-interrupt.ts";
import { createShortcutDebounce } from "./src/input/f5-shortcut.ts";
import { createMuteState } from "./src/ui/mute-state.ts";
import { openUnifiedTalkMenu } from "./src/ui/unified-talk-menu.ts";
import { extractAssistantReplyText } from "./src/tts/assistant-reply.ts";
import { createPlaybackQueue } from "./src/tts/playback-queue.ts";
import { formatTranscriptionStatus } from "./src/ui/transcription-status.ts";
import { createVoiceCaptureSession } from "./src/voice/voice-capture.ts";
import { loadTalkPiConfig } from "./src/config.ts";

type ExtensionContext = {
  ui: {
    setStatus(id: string, value: string): void;
    notify(message: string, level: "info" | "warning" | "error"): void;
    pasteToEditor(text: string): void;
    isIdle?: () => boolean;
    getEditorText?: () => string;
    setEditorText?: (text: string) => void;
    custom?: <T>(
      factory: (
        tui: unknown,
        theme: unknown,
        keybindings: unknown,
        done: (result: T) => void,
      ) => {
        render(width: number): string[];
        handleInput?(data: string): void;
        invalidate?(): void;
      },
      options?: { overlay?: boolean },
    ) => Promise<T>;
    setEditorComponent?: (
      factory: (tui: unknown, theme: unknown, keybindings: unknown) => unknown,
    ) => void;
  };
};

type ExtensionAPI = {
  on(event: string, handler: (event: any, ctx: ExtensionContext) => void | Promise<void>): void;
  registerCommand?(name: string, command: { description: string; handler: (args: string, ctx: ExtensionContext) => void | Promise<void> }): void;
};

export default function (pi: ExtensionAPI) {
  let activeCtx: ExtensionContext | undefined;
  const config = loadTalkPiConfig();
  const shortcutConfig = config.shortcuts;
  const muteState = createMuteState();

  const voiceSession = createVoiceCaptureSession(
    (message, level) => {
      activeCtx?.ui.notify(message, level);
    },
    {
      pushToTalkKey: shortcutConfig.pushToTalkKey,
      whisper: config.whisper,
    },
  );

  let speechStatus = "";
  const sendTranscriptDebounce = createShortcutDebounce();
  const insertTranscriptDebounce = createShortcutDebounce();

  const playbackQueue = createPlaybackQueue({
    isRecordingBlocked: () => voiceSession.status !== "idle",
    onNotify: (message, level) => {
      activeCtx?.ui.notify(message, level);
    },
    onStatus: (message) => {
      speechStatus = message;
      if (activeCtx) {
        syncStatus(activeCtx);
      }
    },
    piper: config.piper,
  });

  const getBaseStatusText = (): string => {
    const status = voiceSession.status;
    const message = voiceSession.message;
    const normalizedStatus =
      status === "recording"
        ? "recording"
        : status === "transcribing"
          ? "transcribing"
          : status === "error"
            ? "error"
            : message.toLowerCase().includes("no speech detected")
              ? "no-speech"
              : message.toLowerCase().includes("transcript ready")
                ? "ready"
                : "idle";
    const voiceStatus = formatTranscriptionStatus(normalizedStatus, message);
    const muteText = muteState.isMuted() ? "Muted" : "Unmuted";
    return speechStatus ? `${voiceStatus} | ${speechStatus} | ${muteText}` : `${voiceStatus} | ${muteText}`;
  };

  const getMenuStatusText = (): string => {
    const base = getBaseStatusText();
    return `${base} | ${shortcutConfig.sendTranscriptKey.toUpperCase()} sends directly | ${shortcutConfig.insertTranscriptKey.toUpperCase()} inserts into editor`;
  };

  const syncStatus = (ctx: ExtensionContext) => {
    const status = voiceSession.status;
    const full = getBaseStatusText().toLowerCase().replace(/\s+/g, "-");
    void playbackQueue.setRecordingBlocked(status !== "idle");
    if (playbackQueue.isMuted() !== muteState.isMuted()) {
      void playbackQueue.setMuted(muteState.isMuted());
    }
    ctx.ui.setStatus("talk-pi", full);
  };

  const setMuteState = async (muted: boolean, ctx: ExtensionContext): Promise<void> => {
    if (muted) {
      muteState.mute();
    } else {
      muteState.unmute();
    }
    await playbackQueue.setMuted(muted);
    syncStatus(ctx);
  };

  pi.on("session_start", async (_event, ctx) => {
    activeCtx = ctx;
    await playbackQueue.setMuted(muteState.isMuted());
    syncStatus(ctx);

    ctx.ui.setEditorComponent?.((tui, theme, keybindings) => {
      class PushToTalkEditor extends CustomEditor {
        private recording = false;
        private recordingShortcut: "send" | "insert" | undefined;

        constructor() {
          super(tui as never, theme as never, keybindings as never);
        }

        private toggleVoiceCapture(shortcut: "send" | "insert"): void {
          if (!this.recording) {
            this.recording = true;
            this.recordingShortcut = shortcut;
            void voiceSession
              .start()
              .then(() => syncStatus(activeCtx ?? ctx))
              .catch((error) => {
                this.recording = false;
                this.recordingShortcut = undefined;
                activeCtx?.ui.notify(error instanceof Error ? error.message : "Start failed", "error");
                syncStatus(activeCtx ?? ctx);
              });
            return;
          }

          this.recording = false;
          const currentShortcut = this.recordingShortcut;
          this.recordingShortcut = undefined;
          const stopPromise = voiceSession.stop();
          syncStatus(activeCtx ?? ctx);
          void stopPromise
            .then((text) => {
              const transcript = String(text ?? "").trim();
              if (transcript) {
                if (currentShortcut === "send") {
                  const deliverAs = activeCtx?.isIdle?.() === false ? { deliverAs: "followUp" as const } : undefined;
                  pi.sendUserMessage(transcript, deliverAs);
                  activeCtx?.ui.notify(`Transcript sent`, "info");
                } else if (!insertTranscriptIntoEditor(activeCtx ?? ctx, transcript)) {
                  activeCtx?.ui.pasteToEditor(transcript);
                  activeCtx?.ui.notify(`Transcript inserted`, "info");
                } else {
                  activeCtx?.ui.notify(`Transcript inserted`, "info");
                }
              }
              syncStatus(activeCtx ?? ctx);
            })
            .catch((error) => {
              activeCtx?.ui.notify(error instanceof Error ? error.message : "Stop failed", "error");
              syncStatus(activeCtx ?? ctx);
            });
        }

        handleInput(data: string): void {
          if (isKeyRelease(data) || data.includes(":2")) {
            return;
          }

          if (matchesKey(data, "escape") && playbackQueue.isPlaying()) {
            void playbackQueue.stop().then(() => syncStatus(activeCtx ?? ctx));
            return;
          }

          const isInsertTranscript = matchesKey(data, shortcutConfig.insertTranscriptKey) && insertTranscriptDebounce.allow();
          const isSendTranscript = matchesKey(data, shortcutConfig.sendTranscriptKey) && sendTranscriptDebounce.allow();
          if (isInsertTranscript) {
            void runVoiceShortcut("insert", {
              isPlaybackPlaying: () => playbackQueue.isPlaying(),
              stopPlayback: () => playbackQueue.stop().then(() => syncStatus(activeCtx ?? ctx)),
              toggleVoiceCapture: (shortcut) => this.toggleVoiceCapture(shortcut),
            });
            return;
          }
          if (isSendTranscript) {
            void runVoiceShortcut("send", {
              isPlaybackPlaying: () => playbackQueue.isPlaying(),
              stopPlayback: () => playbackQueue.stop().then(() => syncStatus(activeCtx ?? ctx)),
              toggleVoiceCapture: (shortcut) => this.toggleVoiceCapture(shortcut),
            });
            return;
          }

          super.handleInput(data);
        }
      }

      return new PushToTalkEditor();
    });
  });

  pi.on("message_end", async (event) => {
    const text = extractAssistantReplyText(event?.message);
    if (text) {
      void playbackQueue.enqueue(text);
    }
  });

  pi.registerCommand?.("talk-pi", {
    description: "Open the unified talk menu",
    handler: async (_args, ctx) => {
      activeCtx = ctx;
      syncStatus(ctx);
      await openUnifiedTalkMenu(ctx, {
        isMuted: () => muteState.isMuted(),
        setMuted: async (nextMuted) => {
          await setMuteState(nextMuted, ctx);
        },
        getStatusText: () => getMenuStatusText(),
      });
      syncStatus(ctx);
    },
  });
}
