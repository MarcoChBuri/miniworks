#!/bin/bash
# Script to build Flutter web app locally before Docker build

echo "Building Flutter web app..."

# Use Docker to build the app (since Flutter is not installed locally)
docker run --rm \
  -v $(pwd):/app \
  -w /app \
  ghcr.io/cirruslabs/flutter:3.19.0 \
  sh -c "flutter pub get && flutter build web --release"

# Fix permissions
docker run --rm \
  -v $(pwd):/app \
  -w /app \
  ghcr.io/cirruslabs/flutter:3.19.0 \
  chown -R $(id -u):$(id -g) /app

echo "Build complete! You can now run: docker compose up -d --build"
