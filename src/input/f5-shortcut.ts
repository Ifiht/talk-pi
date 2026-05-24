export type ShortcutDebounce = {
  allow(): boolean;
  reset(): void;
};

export function createShortcutDebounce(windowMs = 2000, now: () => number = () => Date.now()): ShortcutDebounce {
  let lastTriggerAt = Number.NEGATIVE_INFINITY;

  return {
    allow(): boolean {
      const current = now();
      if (current - lastTriggerAt < windowMs) {
        return false;
      }
      lastTriggerAt = current;
      return true;
    },
    reset(): void {
      lastTriggerAt = Number.NEGATIVE_INFINITY;
    },
  };
}
