# talk-pi

Pi extension for local voice capture, Whisper transcription, and Piper TTS playback.

## Install

```bash
pi install npm:talk-pi
```

Or install from npm:

```bash
npm install talk-pi
```

## Publish

```bash
npm publish --access public
```

## What it does

- `/talk-pi` opens the unified voice menu
- push-to-talk records audio and transcribes it with Whisper
- replies are spoken with Piper
- voice model and English output can be selected from the menu

## Requirements

- Node.js 24+
- Piper binary on `PATH` or configured via `TALK_PI_PIPER_BIN`
- A Piper voice model configured via `TALK_PI_PIPER_MODEL_PATH`
- A Whisper model configured via `TALK_PI_WHISPER_MODEL_PATH` or downloaded on first run
- A system recorder: `sox` on Windows; `sox`, `rec`, or `arecord` on Linux/macOS

Talk-Pi records audio directly with the system recorder. It does not depend on `node-record-lpcm16-ts`.

## Setup

1. Copy `.env.example` to `.env`.
2. Set `TALK_PI_PIPER_BIN` and `TALK_PI_PIPER_MODEL_PATH`.
3. Set `TALK_PI_WHISPER_MODEL_PATH`, or let Whisper download a model on first run.
4. Install a supported recorder and ensure it is on `PATH`.

## Configuration

Environment variables:

- `TALK_PI_SEND_TRANSCRIPT_KEY`
- `TALK_PI_INSERT_TRANSCRIPT_KEY`
- `TALK_PI_PUSH_TO_TALK_KEY`
- `TALK_PI_PIPER_BIN`
- `TALK_PI_PIPER_MODEL_PATH`
- `TALK_PI_TTS_OUTPUT_DIR`
- `TALK_PI_WHISPER_MODEL_PATH`
- `TALK_PI_WHISPER_MODEL_URL`

## Defaults

| Variable | Default |
| --- | --- |
| `TALK_PI_SEND_TRANSCRIPT_KEY` | `F9` |
| `TALK_PI_INSERT_TRANSCRIPT_KEY` | `F10` |
| `TALK_PI_PUSH_TO_TALK_KEY` | `F10` |
| `TALK_PI_PIPER_BIN` | `piper` |
| `TALK_PI_PIPER_MODEL_PATH` | `~/.pi/tts/piper/pt_BR-faber-medium.onnx` |
| `TALK_PI_TTS_OUTPUT_DIR` | system temp directory |
| `TALK_PI_WHISPER_MODEL_PATH` | `~/.pi/models/ggml-base.bin` |
| `TALK_PI_WHISPER_MODEL_URL` | `https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.bin` |

## Platform notes

### Windows

- Install Piper and a SoX build with `sox.exe` on `PATH`.
- Set `TALK_PI_PIPER_BIN` and `TALK_PI_PIPER_MODEL_PATH`.
- Set `TALK_PI_WHISPER_MODEL_PATH`.

### Linux/macOS

- Install Piper so `piper` is available on `PATH`.
- Install `sox`, `rec`, or `arecord`.
- Set `TALK_PI_PIPER_BIN`, `TALK_PI_PIPER_MODEL_PATH`, and `TALK_PI_WHISPER_MODEL_PATH`.

## Notes

- Leave `TALK_PI_TTS_OUTPUT_DIR` empty to use the system temp directory.
- Keep `TALK_PI_PIPER_BIN=piper` if the binary is already on `PATH`.
