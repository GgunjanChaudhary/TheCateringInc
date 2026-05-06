#!/usr/bin/env python3
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

HEALTH_URL = "http://127.0.0.1:8001/api/health"
PORT = 8001
SCRIPT_DIR = Path(__file__).resolve().parent
LOG_FILE = SCRIPT_DIR / "server.log"
PID_FILE = SCRIPT_DIR / "server.pid"


def is_server_healthy() -> bool:
    try:
        with urllib.request.urlopen(HEALTH_URL, timeout=5) as response:
            return response.status == 200
    except (urllib.error.URLError, TimeoutError, OSError):
        return False


def start_server() -> None:
    cmd = (
        f'cd "{SCRIPT_DIR}" && '
        f'nohup python3 -m uvicorn backend.main:app --host 0.0.0.0 --port {PORT} '
        f'>> "{LOG_FILE}" 2>&1 & echo $! > "{PID_FILE}"'
    )
    subprocess.Popen(["bash", "-lc", cmd], start_new_session=True)


if __name__ == "__main__":
    if is_server_healthy():
        sys.exit(0)
    start_server()
    sys.exit(0)
