$ErrorActionPreference = 'Stop'
$install = Join-Path $env:LOCALAPPDATA 'TalkPi\Piper'
$voiceDir = Join-Path $install 'voices'
New-Item -ItemType Directory -Force -Path $voiceDir | Out-Null

$voice = 'pt_BR-faber-medium'
$onnx = Join-Path $voiceDir "$voice.onnx"
$json = Join-Path $voiceDir "$voice.onnx.json"

curl.exe -L 'https://huggingface.co/rhasspy/piper-voices/resolve/main/pt/pt_BR/faber/medium/pt_BR-faber-medium.onnx' -o $onnx
curl.exe -L 'https://huggingface.co/rhasspy/piper-voices/resolve/main/pt/pt_BR/faber/medium/pt_BR-faber-medium.onnx.json' -o $json

$piper = Join-Path $install 'piper\piper.exe'
setx TALK_PI_PIPER_BIN "$piper" | Out-Null
setx TALK_PI_PIPER_MODEL_PATH "$onnx" | Out-Null
$out = Join-Path $env:TEMP 'talk-pi-piper-ptbr-test.wav'
'Olá, isso é um teste em português.' | & $piper --model $onnx --output_file $out
Write-Host "Piper bin: $piper"
Write-Host "PT-BR voice: $onnx"
Write-Host "Output wav: $out"
