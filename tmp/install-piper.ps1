$ErrorActionPreference = 'Stop'
$install = Join-Path $env:LOCALAPPDATA 'TalkPi\Piper'
$voiceDir = Join-Path $install 'voices'
New-Item -ItemType Directory -Force -Path $install | Out-Null
New-Item -ItemType Directory -Force -Path $voiceDir | Out-Null

$zip = Join-Path $env:TEMP 'piper_windows_amd64.zip'
curl.exe -L 'https://github.com/rhasspy/piper/releases/download/2023.11.14-2/piper_windows_amd64.zip' -o $zip
Expand-Archive -Path $zip -DestinationPath $install -Force

$voice = 'en_US-lessac-medium'
$onnx = Join-Path $voiceDir "$voice.onnx"
$json = Join-Path $voiceDir "$voice.onnx.json"
curl.exe -L 'https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/lessac/medium/en_US-lessac-medium.onnx' -o $onnx
curl.exe -L 'https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/lessac/medium/en_US-lessac-medium.onnx.json' -o $json

$piper = Join-Path $install 'piper\piper.exe'
$out = Join-Path $env:TEMP 'talk-pi-piper-test.wav'
'Hello from Piper' | & $piper --model $onnx --output_file $out
Write-Host "Piper installed: $piper"
Write-Host "Voice model: $onnx"
Write-Host "Output wav: $out"
