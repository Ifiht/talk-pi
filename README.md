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
- push-to-talk records audio and transcribes it with Whisper, no separate recorder setup needed
- downloads show `Talk-pi: Downloading 📥`
- replies are spoken with Piper
- voice model and English output can be selected from the menu

## Requirements

- Node.js 24+
- `./tools/piper/piper` or `./tools/piper/piper.exe`
- voice capture uses bundled microphone support; no SoX install needed
- Piper voice model under `./tools/piper/models/`
- Whisper model under `./tools/whisper/models/`

Talk-Pi bundles tools in `./tools` and reads them first. No PATH setup needed.

## Setup

1. Copy `.env.example` to `.env`.
2. `pi install npm:talk-pi` brings bundled tools automatically.
3. If you run from repo, keep binaries/models under `./tools/piper` and `./tools/whisper`.
4. Adjust `TALK_PI_TOOLS_DIR` only if `tools/` lives somewhere else.

## Configuration

Environment variables:

- `TALK_PI_TOOLS_DIR`
- `TALK_PI_SEND_TRANSCRIPT_KEY`
- `TALK_PI_INSERT_TRANSCRIPT_KEY`
- `TALK_PI_PUSH_TO_TALK_KEY`
- `TALK_PI_PIPER_BIN`
- `TALK_PI_PIPER_MODEL_PATH`
- `TALK_PI_TTS_OUTPUT_DIR`
- `TALK_PI_WHISPER_MODEL_PATH`
- `TALK_PI_WHISPER_MODEL_URL`
- `TALK_PI_TRANSCRIBE_TIMEOUT_MS`
- `TALK_PI_TRANSCRIBE_FIRST_TIMEOUT_MS`

## Defaults

| Variable | Default |
| --- | --- |
| `TALK_PI_SEND_TRANSCRIPT_KEY` | `F9` |
| `TALK_PI_INSERT_TRANSCRIPT_KEY` | `F10` |
| `TALK_PI_PUSH_TO_TALK_KEY` | `F10` |
| `TALK_PI_TOOLS_DIR` | `./tools` |
| `TALK_PI_PIPER_BIN` | `./tools/piper/piper` |
| `TALK_PI_PIPER_MODEL_PATH` | `./tools/piper/models/pt_BR-faber-medium.onnx` |
| `TALK_PI_TTS_OUTPUT_DIR` | system temp directory |
| `TALK_PI_WHISPER_MODEL_PATH` | `./tools/whisper/models/ggml-base.bin` |
| `TALK_PI_WHISPER_MODEL_URL` | `https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.bin` |
| `TALK_PI_TRANSCRIBE_TIMEOUT_MS` | `60000` |
| `TALK_PI_TRANSCRIBE_FIRST_TIMEOUT_MS` | `600000` |

## Platform notes

### Windows

- Unzip Piper into `./tools/piper`.
- No separate recorder install needed.
- Put voice and Whisper models under `./tools/piper/models` and `./tools/whisper/models`.
- `TALK_PI_TOOLS_DIR` only needed if folder lives elsewhere.

### Linux/macOS

- Unzip Piper into `./tools/piper`.
- No separate recorder install needed.
- Put voice and Whisper models under `./tools/piper/models` and `./tools/whisper/models`.
- `TALK_PI_TOOLS_DIR` only needed if folder lives elsewhere.

## Notes

- Leave `TALK_PI_TTS_OUTPUT_DIR` empty to use the system temp directory.
- `TALK_PI_TOOLS_DIR` overrides auto-detected tools root.
