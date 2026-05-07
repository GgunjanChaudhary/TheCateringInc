"""JSON load/save helpers with file-locking.

CSV bulk import stub:
    Columns: id,name,course,dietary,cuisine,service_style,allergens,description,season,active
    `cuisine`, `service_style`, `allergens` are pipe-separated.

Example scripts/import_dishes.py:
    import csv, sys
    from utils.data_loader import load_dishes, save_dishes
    rows = list(csv.DictReader(open(sys.argv[1])))
    dishes = load_dishes()
    for r in rows:
        dishes.append({
            "id": r["id"], "name": r["name"], "course": r["course"],
            "dietary": r["dietary"],
            "cuisine": r["cuisine"].split("|") if r["cuisine"] else [],
            "service_style": r["service_style"].split("|") if r["service_style"] else [],
            "allergens": r["allergens"].split("|") if r["allergens"] else [],
            "description": r["description"], "season": r.get("season","all"),
            "active": r.get("active","true").lower() == "true",
        })
    save_dishes(dishes)
"""
import json
import os
from filelock import FileLock

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")

DISHES_FILE = os.path.join(DATA_DIR, "dishes.json")
MENUS_FILE = os.path.join(DATA_DIR, "menus.json")
HISTORY_FILE = os.path.join(DATA_DIR, "history.json")


def _read(path, default):
    if not os.path.exists(path):
        return default
    with FileLock(path + ".lock"):
        with open(path, "r", encoding="utf-8") as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return default


def _write(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with FileLock(path + ".lock"):
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, default=str)


def load_dishes():        return _read(DISHES_FILE, [])
def save_dishes(d):       _write(DISHES_FILE, d)
def load_menus():         return _read(MENUS_FILE, [])
def save_menus(m):        _write(MENUS_FILE, m)
def load_history():       return _read(HISTORY_FILE, [])
def save_history(h):      _write(HISTORY_FILE, h)


def append_history(record):
    history = load_history()
    history.append(record)
    save_history(history)


def get_dish_by_id(dish_id, dishes=None):
    dishes = dishes if dishes is not None else load_dishes()
    for d in dishes:
        if d["id"] == dish_id:
            return d
    return None


def next_history_id():
    history = load_history()
    return f"GEN{len(history)+1:04d}"
