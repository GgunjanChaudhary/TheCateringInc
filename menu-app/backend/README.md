# TCI Menu Generator - Backend

FastAPI backend for the TCI Menu Generator.

## Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate    # Windows
# source venv/bin/activate    # macOS/Linux
pip install -r requirements.txt
```

## Run

```bash
uvicorn main:app --reload --port 8001
```

The API will be available at `http://localhost:8001`.
Interactive docs: `http://localhost:8001/docs`.

## Data

Menu packages are persisted to `packages.json` in this folder.
