type EditorInsertContext = {
  ui: {
    getEditorText?: () => string;
    setEditorText?: (text: string) => void;
    pasteToEditor?: (text: string) => void;
  };
};

export function insertTranscriptIntoEditor(ctx: EditorInsertContext, text: string): boolean {
  const transcript = String(text ?? "").trim();
  if (!transcript) {
    return false;
  }

  const current = ctx.ui.getEditorText?.() ?? "";
  const next = current ? `${current}${current.endsWith(" ") ? "" : " "}${transcript}` : transcript;

  if (ctx.ui.setEditorText) {
    ctx.ui.setEditorText(next);
    return true;
  }

  ctx.ui.pasteToEditor?.(transcript);
  return true;
}
