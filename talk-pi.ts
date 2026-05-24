import { CustomEditor } from "@mariozechner/pi-coding-agent";
import { isKeyRelease, matchesKey } from "@mariozechner/pi-tui";
import { createVoiceCaptureSession, PUSH_TO_TALK_KEY } from "./src/voice/voice-capture";

type ExtensionContext = {
  ui: {
    setStatus(id: string, value: string): void;
    notify(message: string, level: "info" | "warning" | "error"): void;
    pasteToEditor(text: string): void;
    setEditorComponent?: (
      factory: (tui: unknown, theme: unknown, keybindings: unknown) => unknown,
    ) => void;
  };
};

type ExtensionAPI = {
  on(event: "session_start", handler: (event: unknown, ctx: ExtensionContext) => void | Promise<void>): void;
  registerCommand?(name: string, command: { description: string; handler: (args: string, ctx: ExtensionContext) => void | Promise<void> }): void;
};

export default function (pi: ExtensionAPI) {
  let activeCtx: ExtensionContext | undefined;

  const voiceSession = createVoiceCaptureSession((message, level) => {
    activeCtx?.ui.notify(message, level);
  });

  const syncStatus = (ctx: ExtensionContext) => {
    const status = voiceSession.status;
    const message = voiceSession.message;
    ctx.ui.setStatus("talk-pi", `push-to-talk:${status}${message ? `:${message.toLowerCase().replace(/\s+/g, "-")}` : ""}`);
  };

  pi.on("session_start", async (_event, ctx) => {
    activeCtx = ctx;
    syncStatus(ctx);

    ctx.ui.setEditorComponent?.((tui, theme, keybindings) => {
      class PushToTalkEditor extends CustomEditor {
        private recording = false;
        private lastToggleAt = 0;
        private readonly toggleCooldownMs = 2000;

        constructor() {
          super(tui as never, theme as never, keybindings as never);
        }

        handleInput(data: string): void {
          if (isKeyRelease(data) || data.includes(":2")) {
            return;
          }

          if (matchesKey(data, PUSH_TO_TALK_KEY)) {
            const now = Date.now();
            if (now - this.lastToggleAt < this.toggleCooldownMs) {
              return;
            }
            this.lastToggleAt = now;

            if (!this.recording) {
              this.recording = true;
              void voiceSession.start().then(() => syncStatus(activeCtx ?? ctx)).catch((error) => {
                this.recording = false;
                activeCtx?.ui.notify(error instanceof Error ? error.message : "Start failed", "error");
                syncStatus(activeCtx ?? ctx);
              });
            } else {
              this.recording = false;
              const stopPromise = voiceSession.stop();
              syncStatus(activeCtx ?? ctx);
              void stopPromise.then((text) => {
                const transcript = String(text ?? "").trim();
                if (transcript) {
                  activeCtx?.ui.pasteToEditor(transcript);
                  activeCtx?.ui.notify(`Transcript inserted`, "info");
                }
                syncStatus(activeCtx ?? ctx);
              }).catch((error) => {
                activeCtx?.ui.notify(error instanceof Error ? error.message : "Stop failed", "error");
                syncStatus(activeCtx ?? ctx);
              });
            }
            return;
          }

          super.handleInput(data);
        }
      }

      return new PushToTalkEditor();
    });
  });

  pi.registerCommand?.("talk-pi", {
    description: "Show push-to-talk status",
    handler: async (_args, ctx) => {
      activeCtx = ctx;
      syncStatus(ctx);
      ctx.ui.notify(`Push-to-talk ready: tap ${PUSH_TO_TALK_KEY} twice`, "info");
    },
  });
}
