#!/usr/bin/env bash
# Build script for Render Native Node Environment

set -e

echo "Installing npm dependencies..."
npm install --include=dev

echo "Building TypeScript code..."
npm run build

echo "Setting up binaries directory..."
mkdir -p ./bin

echo "Downloading yt-dlp..."
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_linux -o ./bin/yt-dlp
chmod a+rx ./bin/yt-dlp

echo "Downloading static FFmpeg build..."
curl -L https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz | tar xJ -C ./bin --strip-components 1
chmod a+rx ./bin/ffmpeg || true

echo "Build complete."
