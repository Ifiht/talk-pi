# talk-pi

Talk-pi is a Pi coding-agent extension for voice capture, Whisper transcription, and Piper TTS playback.

## Quick setup

1. Copy `.env.example` to `.env` and adjust the paths.
2. Install Piper: <https://github.com/rhasspy/piper/releases>.
3. Download a voice model: <https://huggingface.co/rhasspy/piper-voices>.
4. Set `TALK_PI_PIPER_BIN` and `TALK_PI_PIPER_MODEL_PATH`.
5. Set `TALK_PI_WHISPER_MODEL_PATH`, or let Whisper download a model on first run.

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

See `.env.example` for a sample.

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

## Setup by platform

### Windows

1. Download Piper: <https://github.com/rhasspy/piper/releases>.
2. Extract it to a folder like `C:\Users\<you>\AppData\Local\TalkPi\Piper`.
3. Download a voice model from <https://huggingface.co/rhasspy/piper-voices>.
4. Save the `.onnx` and `.onnx.json` files in a `voices\` folder, or anywhere you prefer.
5. Set `TALK_PI_PIPER_BIN` to `...\piper\piper.exe`.
6. Set `TALK_PI_PIPER_MODEL_PATH` to the `.onnx` file.
7. Set `TALK_PI_WHISPER_MODEL_PATH` to your local Whisper model.

Example:

```env
TALK_PI_PIPER_BIN=C:\Users\<you>\AppData\Local\TalkPi\Piper\piper\piper.exe
TALK_PI_PIPER_MODEL_PATH=C:\Users\<you>\AppData\Local\TalkPi\Piper\voices\pt_BR-faber-medium.onnx
TALK_PI_WHISPER_MODEL_PATH=C:\Users\<you>\.pi\models\ggml-base.bin
```

### Linux/macOS

1. Install or build Piper so `piper` is available on `PATH`.
2. Download a voice model from <https://huggingface.co/rhasspy/piper-voices>.
3. Save the `.onnx` and `.onnx.json` files anywhere you prefer, for example `~/.pi/tts/piper/`.
4. Set `TALK_PI_PIPER_BIN=piper`.
5. Set `TALK_PI_PIPER_MODEL_PATH` to the `.onnx` file.
6. Set `TALK_PI_WHISPER_MODEL_PATH` to your local Whisper model.
7. On first run, Whisper can download the model automatically if the file is missing.

## Notes

- Leave `TALK_PI_TTS_OUTPUT_DIR` empty to use the system temp directory.
- Keep `TALK_PI_PIPER_BIN=piper` if the binary is already on `PATH`.
