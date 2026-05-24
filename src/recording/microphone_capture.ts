export type VoiceBridge = {
  isAvailable(): boolean;
  start(): Promise<void> | void;
  stop(): Promise<void> | void;
};

export class VoiceCommandBridge implements VoiceBridge {
  constructor(
    private readonly sendUserMessage: (message: string) => Promise<void>,
    private readonly hasVoiceCommand: () => boolean,
  ) {}

  isAvailable(): boolean {
    return this.hasVoiceCommand();
  }

  async start(): Promise<void> {
    await this.sendUserMessage("/voice");
  }

  async stop(): Promise<void> {
    await this.sendUserMessage("/voice stop");
  }
}
