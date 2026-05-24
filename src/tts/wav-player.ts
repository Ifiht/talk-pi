import { createRequire } from "node:module";

const defaultCreatePlayer = createRequire(import.meta.url)("play-sound") as (opts?: Record<string, unknown>) => {
  play(filePath: string, options?: Record<string, unknown>, callback?: (error?: Error | null) => void): unknown;
};

export type WavPlayer = {
  play(filePath: string): Promise<void>;
};

export function createWavPlayer(createPlayer = defaultCreatePlayer): WavPlayer {
  const player = createPlayer({});

  return {
    play(filePath: string): Promise<void> {
      return new Promise((resolve, reject) => {
        player.play(filePath, (error?: Error | null) => {
          if (error) {
            reject(error);
            return;
          }
          resolve();
        });
      });
    },
  };
}
