#!/usr/bin/env bash
# Build script for Render Native Node Environment

set -e

echo "Installing npm dependencies..."
npm install --include=dev

echo "Building TypeScript code..."
npm run build

echo "Build complete."
