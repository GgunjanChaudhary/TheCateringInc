"""Menu matching scorer."""
from typing import List, Dict


def score_menu(menu: Dict, req: Dict) -> int:
    score = 0
    if menu.get("dietary") == req.get("dietary"):
        score += 10
    if menu.get("meal_type") == req.get("meal_type"):
        score += 8
    occ = req.get("occasion")
    if occ and occ in (menu.get("occasion") or []):
        score += 6
    if menu.get("service_style") == req.get("service_style"):
        score += 5
    if menu.get("budget_tier") == req.get("budget_tier"):
        score += 4
    menu_cuisines = set(menu.get("cuisine") or [])
    req_cuisines = set(req.get("cuisine") or [])
    score += len(menu_cuisines & req_cuisines)
    return score


def top_matches(menus: List[Dict], req: Dict, n: int = 3):
    scored = [(score_menu(m, req), m) for m in menus if m.get("active", True)]
    scored.sort(key=lambda x: x[0], reverse=True)
    return scored[:n]
