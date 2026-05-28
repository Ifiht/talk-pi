# talk-pi

Talk-Pi is Pi extension for local voice capture, Whisper transcription, and Piper TTS playback.

## What it does

- `/talk-pi` opens unified voice menu
- push-to-talk records audio and sends it to Whisper
- replies are spoken with Piper
- voice model and output language can be selected between English and Portuguese
- downloads show `Talk-pi: Downloading 📥`

## Install

```bash
pi install npm:talk-pi
```

`pi install` brings Talk-Pi package plus bundled tools in `./tools`, so no PATH setup needed.

## Requirements

- Node.js 24+
- `./tools/piper/piper` or `./tools/piper/piper.exe`
- voice capture uses bundled microphone support
- Piper voice model under `./tools/piper/models/`
- Whisper model under `./tools/whisper/models/`

Talk-Pi bundles tools in `./tools` and reads them first. No PATH setup needed.

## Setup & Configuration

1. Copy `.env.example` to `.env`.
2. Run `pi install npm:talk-pi` to bring bundled tools automatically.
3. If you run from repo, keep binaries/models under `./tools/piper` and `./tools/whisper`.
4. Adjust `TALK_PI_TOOLS_DIR` only if `tools/` lives somewhere else.

| Variable | Default / Note |
| --- | --- |
| `TALK_PI_SEND_TRANSCRIPT_KEY` | `F9` |
| `TALK_PI_INSERT_TRANSCRIPT_KEY` | `F10` |
| `TALK_PI_TOOLS_DIR` | `./tools` |
| `TALK_PI_PIPER_BIN` | `./tools/piper/piper` |
| `TALK_PI_PIPER_MODEL_PATH` | `./tools/piper/models/pt_BR-faber-medium.onnx` |
| `TALK_PI_TTS_OUTPUT_DIR` | system temp directory |
| `TALK_PI_WHISPER_MODEL_PATH` | `./tools/whisper/models/ggml-base.bin` |
| `TALK_PI_WHISPER_MODEL_URL` | `https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.bin` |
| `TALK_PI_TRANSCRIBE_TIMEOUT_MS` | `60000` |
| `TALK_PI_TRANSCRIBE_FIRST_TIMEOUT_MS` | `600000` |

## Usage

1. Open `/talk-pi`.
2. Choose push-to-talk.
3. Record speech.
4. Wait for Whisper transcription.
5. Listen to Piper reply, or send/insert transcript as needed.

## Platform notes

- Windows, Linux, and macOS use same setup.
- Unzip Piper into `./tools/piper`.
- No separate recorder install needed.
- Put voice and Whisper models under `./tools/piper/models` and `./tools/whisper/models`.
- `TALK_PI_TOOLS_DIR` only needed if folder lives elsewhere.

## Publish

```bash
npm publish --access public
```

