#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "Installing npm dependencies..."
npm install --include=dev

echo "Building TypeScript backend..."
npm run build

echo "Creating bin directory..."
mkdir -p ./bin

echo "Downloading latest yt-dlp binary..."
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o ./bin/yt-dlp
chmod a+rx ./bin/yt-dlp

echo "Downloading static FFmpeg build..."
curl -L https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz | tar xJ -C ./bin --strip-components 1
chmod a+rx ./bin/ffmpeg || true
chmod a+rx ./bin/ffprobe || true

echo "Build script completed successfully!"
