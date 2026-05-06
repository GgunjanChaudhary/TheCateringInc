#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "[1/3] Building frontend..."
pushd frontend > /dev/null
npm install
npm run build
popd > /dev/null

echo "[2/3] Installing backend deps..."
pushd backend > /dev/null
python -m pip install -r requirements.txt
popd > /dev/null

echo "[3/3] Ensuring persistent_data/ exists..."
mkdir -p persistent_data

echo "Build complete. Start the server with:"
echo "  cd menu-app && uvicorn backend.main:app --host 0.0.0.0 --port 8001"
