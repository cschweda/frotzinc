#!/bin/sh
# Renders tools/og-image.html to public/og-image.png with headless Chrome (macOS path).
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --virtual-time-budget=2000 \
  --screenshot="$PWD/public/og-image.png" "file://$PWD/tools/og-image.html"
command -v pngquant >/dev/null && pngquant --force --skip-if-larger --output public/og-image.png public/og-image.png || true
echo "wrote public/og-image.png"
