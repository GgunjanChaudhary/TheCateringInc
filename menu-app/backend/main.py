from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
from typing import Any, Dict, List, Literal, Optional
from pathlib import Path
import json
import os
import uuid
from copy import deepcopy
import sys

from auth import login_with_password, revoke_token, verify_token
from models import ClientEventIntake
from routers.generate import router as generate_router


class SubSection(BaseModel):
    categoryName: str
    allowedQuantity: int


class Section(BaseModel):
    sectionName: str
    subSections: List[SubSection]


class AddOn(BaseModel):
    name: str
    price: float
    unit: str
    enabled: bool
    counters: Optional[int] = None


class MenuPackage(BaseModel):
    id: str
    packageName: str
    packageTier: Literal["Corporate", "Silver", "Gold", "Platinum"]
    basePrice: float
    minGuests: int
    maxGuests: int
    packageDescription: str
    notes: str
    status: str
    sections: List[Section]
    addOns: List[AddOn]


class CreateMenuPackageRequest(BaseModel):
    packageName: str
    packageTier: Literal["Corporate", "Silver", "Gold", "Platinum"]
    basePrice: float
    minGuests: int
    maxGuests: int
    packageDescription: str
    notes: str
    status: str
    sections: List[Section]
    addOns: List[AddOn]


class UpdateMenuPackageRequest(BaseModel):
    packageName: str
    packageTier: Literal["Corporate", "Silver", "Gold", "Platinum"]
    basePrice: float
    minGuests: int
    maxGuests: int
    packageDescription: str
    notes: str
    status: str
    sections: List[Section]
    addOns: List[AddOn]


class MasterDataUpdateRequest(BaseModel):
    categoryName: str
    groupName: str
    itemName: str
    shortDescription: str
    premiumDescription: str


class LoginRequest(BaseModel):
    password: str


class SalesSubmitPackageRequest(BaseModel):
    submittedBy: str = Field(min_length=1, max_length=120)
    package: CreateMenuPackageRequest


class SuggestRequest(BaseModel):
    diet: Literal["veg", "nonveg", "jain"] = "veg"
    occasion: str = ""
    meal: Literal["breakfast", "lunch", "hi-tea", "dinner"] = "dinner"
    num_guests: int = Field(default=0, ge=0)
    top_n: int = Field(default=3, ge=1, le=10)


class EventMeta(BaseModel):
    client_name: str = ""
    event_title: str = ""
    occasion: str = ""
    event_date: Optional[str] = None
    venue: str = ""
    num_guests: int = Field(default=0, ge=0)
    diet: Literal["veg", "nonveg", "jain"] = "veg"
    meal: Literal["breakfast", "lunch", "hi-tea", "dinner"] = "dinner"
    is_series: bool = False
    series_notes: str = ""
    special_notes: str = ""


class DishSelection(BaseModel):
    section: str
    category: str
    dish_name: str
    description: str = ""


class SectionSelection(BaseModel):
    section: str
    category: str
    max_items: int = Field(default=1, ge=1, le=30)
    selected_dishes: List[DishSelection] = []


class GenerateMenuRequest(BaseModel):
    event: EventMeta
    mode: Literal["from_package", "custom"] = "from_package"
    package_id: Optional[str] = None
    selections: List[SectionSelection] = []
    addons: List[str] = []


class IntakeRequest(BaseModel):
    event: ClientEventIntake
    selected_package_id: Optional[str] = None
    create_own_menu: bool = False


class PreviewRequest(BaseModel):
    event: ClientEventIntake
    function_menus: List[Dict[str, Any]] = []
    template_name: str = "elegant_gold"
    prepared_by: str = "Sales Team"
    service_style: Optional[str] = None


app = FastAPI(title="TCI Menu Generator API", version="0.1.0")

BACKEND_DIR = Path(__file__).resolve().parent
PERSISTENT_DATA_DIR = Path(
    os.getenv("PERSISTENT_DATA_DIR", str(BACKEND_DIR.parent / "persistent_data"))
)
PACKAGES_PATH = PERSISTENT_DATA_DIR / "packages.json"
SECTIONS_MASTER_PATH = BACKEND_DIR / "sections_master.json"
MASTER_REGISTRY_PATH = PERSISTENT_DATA_DIR / "master_registry.json"
BUNDLED_SEED_PATH = BACKEND_DIR / "pick_choose_menu.json"
BUNDLED_PACKAGES_PATH = BACKEND_DIR / "packages.json"
FRONTEND_DIST = BACKEND_DIR.parent / "frontend" / "dist"
SAMPLE_MENUS_PATH = Path(
    os.getenv("SAMPLE_MENUS_PATH", str(BACKEND_DIR / "sample_menus.json"))
)
if str(BACKEND_DIR.parent) not in sys.path:
    sys.path.append(str(BACKEND_DIR.parent))
from utils.pdf_generator import generate as generate_html_pdf  # noqa: E402

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
        "http://localhost:5177",
        "http://localhost:5200",
        "https://www.demiurgic.co.in",
        "https://demiurgic.co.in",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return RedirectResponse(url="/menucraft/", status_code=307)


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


def _ensure_persistent_data():
    PERSISTENT_DATA_DIR.mkdir(parents=True, exist_ok=True)
    if not PACKAGES_PATH.exists():
        with PACKAGES_PATH.open("w", encoding="utf-8") as packages_file:
            json.dump({"packages": []}, packages_file, indent=2)

    if not MASTER_REGISTRY_PATH.exists() and BUNDLED_SEED_PATH.exists():
        with BUNDLED_SEED_PATH.open("r", encoding="utf-8") as seed_file:
            seed_data = json.load(seed_file)
        with MASTER_REGISTRY_PATH.open("w", encoding="utf-8") as registry_file:
            json.dump(seed_data, registry_file, indent=2)


def _read_packages_data():
    _ensure_persistent_data()
    if not PACKAGES_PATH.exists():
        return {"packages": []}

    try:
        with PACKAGES_PATH.open("r", encoding="utf-8") as packages_file:
            packages_data = json.load(packages_file)
    except json.JSONDecodeError as exc:
        raise HTTPException(status_code=500, detail="Invalid packages JSON") from exc

    if not isinstance(packages_data.get("packages"), list):
        packages_data["packages"] = []

    # Auto-seed from bundled packages.json when persistent store is empty
    if len(packages_data["packages"]) == 0 and BUNDLED_PACKAGES_PATH.exists():
        try:
            with BUNDLED_PACKAGES_PATH.open("r", encoding="utf-8") as bundled_file:
                bundled = json.load(bundled_file)
            if isinstance(bundled.get("packages"), list) and bundled["packages"]:
                packages_data["packages"] = bundled["packages"]
                with PACKAGES_PATH.open("w", encoding="utf-8") as out_file:
                    json.dump(packages_data, out_file, indent=2)
        except (json.JSONDecodeError, OSError):
            pass

    return packages_data


def _write_packages_data(packages_data):
    _ensure_persistent_data()
    with PACKAGES_PATH.open("w", encoding="utf-8") as packages_file:
        json.dump(packages_data, packages_file, indent=2)


def _resolve_registry_path():
    _ensure_persistent_data()
    return MASTER_REGISTRY_PATH


def _read_registry_data():
    registry_path = _resolve_registry_path()
    if not registry_path.exists():
        raise HTTPException(status_code=404, detail="Registry file not found")

    try:
        with registry_path.open("r", encoding="utf-8") as registry_file:
            return registry_path, json.load(registry_file)
    except json.JSONDecodeError as exc:
        raise HTTPException(status_code=500, detail="Invalid registry JSON") from exc


def _flatten_registry_items(registry_data: Dict[str, Any]):
    sections = registry_data.get("sections", {})
    if not isinstance(sections, dict):
        raise HTTPException(status_code=500, detail="Invalid registry sections structure")

    items = []
    for category_name, group_map in sections.items():
        if not isinstance(group_map, dict):
            continue
        for group_name, item_list in group_map.items():
            if not isinstance(item_list, list):
                continue
            for item in item_list:
                if not isinstance(item, dict):
                    continue
                items.append(
                    {
                        "categoryName": category_name,
                        "groupName": group_name,
                        "itemName": item.get("name", ""),
                        "shortDescription": item.get("short_description", ""),
                        "premiumDescription": item.get("premium_description", ""),
                    }
                )
    return items


def _public_package_view(package: Dict[str, Any]):
    return {
        "id": package.get("id", ""),
        "packageName": package.get("packageName", ""),
        "packageTier": package.get("packageTier", ""),
        "basePrice": package.get("basePrice", 0),
        "minGuests": package.get("minGuests", 0),
        "maxGuests": package.get("maxGuests", 0),
        "packageDescription": package.get("packageDescription", ""),
        "status": package.get("status", ""),
        "sections": package.get("sections", []),
        "addOns": package.get("addOns", []),
        "submittedBy": package.get("submittedBy"),
        "source": package.get("source"),
    }


def _load_sample_menus():
    if not SAMPLE_MENUS_PATH.exists():
        raise HTTPException(
            status_code=404,
            detail=(
                "Sample menus file not found. Set SAMPLE_MENUS_PATH or add sample_menus.json "
                "to backend."
            ),
        )

    try:
        with SAMPLE_MENUS_PATH.open("r", encoding="utf-8") as sample_file:
            sample_data = json.load(sample_file)
    except json.JSONDecodeError as exc:
        raise HTTPException(status_code=500, detail="Invalid sample menus JSON") from exc

    menus = sample_data.get("menus", [])
    if not isinstance(menus, list):
        return []
    return menus


def _score_sample_menu(menu: Dict[str, Any], requirements: Dict[str, Any]):
    tags = menu.get("tags", {})
    score = 0.0
    reasons = []

    req_diet = requirements.get("diet")
    menu_diet = tags.get("diet")
    jain_ok = tags.get("jain_friendly", False)
    if req_diet == "jain":
        if jain_ok:
            score += 50
            reasons.append("Jain-friendly")
        elif menu_diet == "veg":
            score += 10
            reasons.append("Vegetarian (Jain adaptable)")
        else:
            score -= 100
            reasons.append("Not Jain-compatible")
    elif req_diet == "veg":
        if menu_diet == "veg":
            score += 40
            reasons.append("Vegetarian")
        else:
            score -= 80
            reasons.append("Contains non-veg")
    elif req_diet == "nonveg":
        if menu_diet == "nonveg":
            score += 40
            reasons.append("Non-vegetarian")
        else:
            score += 5
            reasons.append("Vegetarian (could add non-veg)")

    req_occ = (requirements.get("occasion") or "").strip().lower()
    if req_occ:
        menu_occs = [str(o).lower() for o in tags.get("occasion", [])]
        if any(req_occ == occ for occ in menu_occs):
            score += 30
            reasons.append(f"Matches '{req_occ}'")
        elif any(req_occ in occ or occ in req_occ for occ in menu_occs):
            score += 18
            reasons.append(f"Similar to '{req_occ}'")

    req_meal = (requirements.get("meal") or "").lower()
    menu_meals = [str(m).lower() for m in tags.get("meal", [])]
    if req_meal and req_meal in menu_meals:
        score += 15
        reasons.append(f"Suited to {req_meal}")

    req_guests = requirements.get("num_guests")
    if isinstance(req_guests, int) and req_guests > 0:
        gmin = int(tags.get("guest_min", 0))
        gmax = int(tags.get("guest_max", 10**6))
        if gmin <= req_guests <= gmax:
            score += 20
            reasons.append(f"Sized for {req_guests} guests")

    return score, reasons


def _suggest_menus(requirements: Dict[str, Any], top_n: int):
    menus = _load_sample_menus()
    scored = []
    for menu in menus:
        if isinstance(menu, dict):
            score, reasons = _score_sample_menu(menu, requirements)
            scored.append((menu, score, reasons))
    scored.sort(key=lambda item: item[1], reverse=True)
    return [
        {"menu": menu, "score": score, "reasons": reasons}
        for menu, score, reasons in scored[:top_n]
    ]


def _normalize_token(value: str):
    return "".join(ch.lower() for ch in value if ch.isalnum())


def _flatten_registry_candidates(registry_data: Dict[str, Any], category_name: str):
    sections = registry_data.get("sections", {})
    if not isinstance(sections, dict):
        return []

    want = _normalize_token(category_name)
    matched_keys = []
    for key in sections.keys():
        key_token = _normalize_token(str(key))
        if key_token == want or want in key_token or key_token in want:
            matched_keys.append(key)

    if not matched_keys:
        return []

    seen = set()
    candidates = []
    for key in matched_keys:
        groups = sections.get(key, {})
        if not isinstance(groups, dict):
            continue
        for _, item_list in groups.items():
            if not isinstance(item_list, list):
                continue
            for item in item_list:
                if not isinstance(item, dict):
                    continue
                name = str(item.get("name", "")).strip()
                if not name:
                    continue
                item_key = name.lower()
                if item_key in seen:
                    continue
                seen.add(item_key)
                candidates.append(item)
    return candidates


def _filter_candidates_for_diet(candidates: List[Dict[str, Any]], diet: str):
    if diet not in {"veg", "jain"}:
        return candidates

    blocked_tokens = {"non veg", "non-veg", "chicken", "mutton", "fish", "seafood", "meat"}
    filtered = []
    for item in candidates:
        text = f"{item.get('name','')} {' '.join(item.get('tags', []))}".lower()
        if any(token in text for token in blocked_tokens):
            continue
        filtered.append(item)
    return filtered


def _build_prefill_from_package(
    package: Dict[str, Any], registry_data: Dict[str, Any], diet: str
):
    prefilled_sections = []
    for section in package.get("sections", []):
        section_name = section.get("sectionName", "")
        categories = []
        for sub_section in section.get("subSections", []):
            category = sub_section.get("categoryName", "")
            qty = int(sub_section.get("allowedQuantity", 0) or 0)
            if qty <= 0:
                continue
            candidates = _flatten_registry_candidates(registry_data, category)
            candidates = _filter_candidates_for_diet(candidates, diet)
            picked = []
            for item in candidates[:qty]:
                picked.append(
                    {
                        "dishName": item.get("name", ""),
                        "shortDescription": item.get("short_description", ""),
                        "premiumDescription": item.get("premium_description", ""),
                    }
                )
            categories.append(
                {
                    "categoryName": category,
                    "allowedQuantity": qty,
                    "dishes": picked,
                }
            )
        if categories:
            prefilled_sections.append({"sectionName": section_name, "categories": categories})
    return prefilled_sections


def _build_custom_builder_sections(master_data: Dict[str, Any]):
    section_defs = master_data.get("sections", [])
    return [
        {"sectionName": sec.get("sectionName", ""), "subSections": sec.get("subSections", [])}
        for sec in section_defs
        if isinstance(sec, dict)
    ]


@app.post("/api/login")
def login(payload: LoginRequest):
    token = login_with_password(payload.password)
    if token is None:
        raise HTTPException(status_code=401, detail="Invalid password")
    return {"token": token}


@app.post("/api/logout")
def logout(token: str = Depends(verify_token)):
    revoke_token(token)
    return {"status": "ok"}


@app.get("/api/master-registry/categories")
def get_master_registry_categories(_token: str = Depends(verify_token)):
    _, registry_data = _read_registry_data()
    sections = registry_data.get("sections", {})
    if not isinstance(sections, dict):
        raise HTTPException(status_code=500, detail="Invalid registry sections structure")

    return {"categories": list(sections.keys())}


@app.get("/api/public/generator/categories")
def get_public_generator_categories():
    _, registry_data = _read_registry_data()
    sections = registry_data.get("sections", {})
    if not isinstance(sections, dict):
        raise HTTPException(status_code=500, detail="Invalid registry sections structure")
    return {"categories": list(sections.keys())}


def _read_sections_master_data():
    if not SECTIONS_MASTER_PATH.exists():
        raise HTTPException(status_code=404, detail="Sections master file not found")

    try:
        with SECTIONS_MASTER_PATH.open("r", encoding="utf-8") as master_file:
            master_data = json.load(master_file)
    except json.JSONDecodeError as exc:
        raise HTTPException(status_code=500, detail="Invalid sections master JSON") from exc

    if not isinstance(master_data, dict):
        raise HTTPException(status_code=500, detail="Invalid sections master structure")

    return master_data


def _create_menu_package_from_payload(
    payload: CreateMenuPackageRequest | UpdateMenuPackageRequest, package_id: str
):
    if payload.minGuests > payload.maxGuests:
        raise HTTPException(
            status_code=400, detail="Minimum guests cannot be greater than maximum guests"
        )

    return MenuPackage(
        id=package_id,
        packageName=payload.packageName,
        packageTier=payload.packageTier,
        basePrice=payload.basePrice,
        minGuests=payload.minGuests,
        maxGuests=payload.maxGuests,
        packageDescription=payload.packageDescription,
        notes=payload.notes,
        status=payload.status,
        sections=payload.sections,
        addOns=payload.addOns,
    )


def _allowed_quantity_from_grid(
    section_name: str, sub_section_name: str, grid_values: Dict[str, int]
):
    key = f"{section_name}:{sub_section_name}"
    return grid_values.get(key, 0)


def _build_predefined_sections(
    sections_master: List[Dict[str, Any]], grid_values: Dict[str, int]
):
    sections = []
    for section in sections_master:
        section_name = section.get("sectionName", "")
        sub_sections = []
        for sub_section_name in section.get("subSections", []):
            sub_sections.append(
                {
                    "categoryName": sub_section_name,
                    "allowedQuantity": _allowed_quantity_from_grid(
                        section_name, sub_section_name, grid_values
                    ),
                }
            )
        sections.append({"sectionName": section_name, "subSections": sub_sections})
    return sections


def _build_predefined_add_ons(tier: str, is_non_veg: bool, chaats_qty: int):
    mutton_enabled = tier in ["Corporate", "Silver"] and is_non_veg
    return [
        {
            "name": "Mutton",
            "price": 100,
            "unit": "per plate",
            "enabled": mutton_enabled,
            "counters": None,
        },
        {
            "name": "Chaats Counter",
            "price": 6000,
            "unit": "per item per 100 pax",
            "enabled": chaats_qty > 0,
            "counters": 4 if chaats_qty > 0 else None,
        },
    ]


def _build_predefined_packages():
    master = _read_sections_master_data()
    sections_master = master.get("sections", [])
    # Derived from the banquet grid screenshot.
    presets = [
        {
            "packageName": "Corporate Veg",
            "packageTier": "Corporate",
            "basePrice": 1200,
            "minGuests": 100,
            "maxGuests": 500,
            "isNonVeg": False,
            "grid": {
                "Pre-Dining:Veg": 4,
                "Pre-Dining:Salads": 2,
                "Indian Cuisine:Paneer": 1,
                "Indian Cuisine:Veg": 2,
                "Indian Cuisine:Dal": 1,
                "Indian Cuisine:Starch": 1,
                "Indian Cuisine:Achaar/ Papad/ Chutney": 1,
                "Indian Cuisine:Yoghurt/ Curd rice": 1,
                "Indian Cuisine:Indian Breads": 2,
                "Desserts:Desserts": 2,
            },
        },
        {
            "packageName": "Corporate Non-Veg",
            "packageTier": "Corporate",
            "basePrice": 1300,
            "minGuests": 100,
            "maxGuests": 500,
            "isNonVeg": True,
            "grid": {
                "Pre-Dining:Veg": 2,
                "Pre-Dining:Salads": 2,
                "Indian Cuisine:Non Veg": 1,
                "Indian Cuisine:Paneer": 1,
                "Indian Cuisine:Veg": 2,
                "Indian Cuisine:Dal": 1,
                "Indian Cuisine:Starch": 1,
                "Indian Cuisine:Achaar/ Papad/ Chutney": 1,
                "Indian Cuisine:Yoghurt/ Curd rice": 1,
                "Indian Cuisine:Indian Breads": 2,
                "Desserts:Desserts": 2,
            },
        },
        {
            "packageName": "Silver Veg",
            "packageTier": "Silver",
            "basePrice": 1600,
            "minGuests": 100,
            "maxGuests": 500,
            "isNonVeg": False,
            "grid": {
                "Pre-Dining:Veg": 6,
                "Pre-Dining:Salads": 3,
                "Pre-Dining:Soups": 1,
                "Pre-Dining:Western Bread": 1,
                "Pre-Dining:Dim Sum Station - Live": 1,
                "Indian Cuisine:Main Course Live Stations": 1,
                "Indian Cuisine:Paneer": 1,
                "Indian Cuisine:Veg": 4,
                "Indian Cuisine:Dal": 1,
                "Indian Cuisine:Starch": 1,
                "Indian Cuisine:Achaar/ Papad/ Chutney": 1,
                "Indian Cuisine:Yoghurt/ Curd rice": 1,
                "Indian Cuisine:Indian Breads": 4,
                "Oriental:Veg": 2,
                "Oriental:Starch": 1,
                "Desserts:Desserts": 3,
            },
        },
        {
            "packageName": "Silver Non-Veg",
            "packageTier": "Silver",
            "basePrice": 1750,
            "minGuests": 100,
            "maxGuests": 500,
            "isNonVeg": True,
            "grid": {
                "Pre-Dining:Veg": 3,
                "Pre-Dining:Salads": 3,
                "Pre-Dining:Soups": 1,
                "Pre-Dining:Western Bread": 1,
                "Pre-Dining:Dim Sum Station - Live": 1,
                "Indian Cuisine:Non Veg": 2,
                "Indian Cuisine:Main Course Live Stations": 1,
                "Indian Cuisine:Paneer": 1,
                "Indian Cuisine:Veg": 3,
                "Indian Cuisine:Dal": 1,
                "Indian Cuisine:Starch": 1,
                "Indian Cuisine:Achaar/ Papad/ Chutney": 1,
                "Indian Cuisine:Yoghurt/ Curd rice": 1,
                "Indian Cuisine:Indian Breads": 4,
                "Oriental:Non Veg": 1,
                "Oriental:Veg": 1,
                "Oriental:Starch": 1,
                "Desserts:Desserts": 3,
            },
        },
        {
            "packageName": "Gold Veg",
            "packageTier": "Gold",
            "basePrice": 2200,
            "minGuests": 100,
            "maxGuests": 500,
            "isNonVeg": False,
            "grid": {
                "Pre-Dining:Veg": 8,
                "Pre-Dining:Salads": 5,
                "Pre-Dining:Soups": 2,
                "Pre-Dining:Western Bread": 2,
                "Pre-Dining:Chaats (Live Stations)": 4,
                "Pre-Dining:Sushi Station - Live": 1,
                "Pre-Dining:Dim Sum Station - Live": 1,
                "Indian Cuisine:Main Course Live Stations": 2,
                "Indian Cuisine:Paneer": 1,
                "Indian Cuisine:Veg": 4,
                "Indian Cuisine:Dal": 1,
                "Indian Cuisine:Starch": 2,
                "Indian Cuisine:Achaar/ Papad/ Chutney": 1,
                "Indian Cuisine:Yoghurt/ Curd rice": 1,
                "Indian Cuisine:Indian Breads": 4,
                "Oriental:Veg": 3,
                "Oriental:Starch": 2,
                "Oriental:Live Station": 1,
                "Continental:Veg": 2,
                "Continental:Starch": 1,
                "Desserts:Desserts": 6,
                "Desserts:Desserts Live": 1,
            },
        },
        {
            "packageName": "Gold Non-Veg",
            "packageTier": "Gold",
            "basePrice": 2400,
            "minGuests": 100,
            "maxGuests": 500,
            "isNonVeg": True,
            "grid": {
                "Pre-Dining:Veg": 5,
                "Pre-Dining:Salads": 5,
                "Pre-Dining:Soups": 2,
                "Pre-Dining:Western Bread": 2,
                "Pre-Dining:Chaats (Live Stations)": 4,
                "Pre-Dining:Sushi Station - Live": 1,
                "Pre-Dining:Dim Sum Station - Live": 1,
                "Indian Cuisine:Non Veg": 2,
                "Indian Cuisine:Main Course Live Stations": 2,
                "Indian Cuisine:Paneer": 1,
                "Indian Cuisine:Veg": 3,
                "Indian Cuisine:Dal": 1,
                "Indian Cuisine:Starch": 2,
                "Indian Cuisine:Achaar/ Papad/ Chutney": 1,
                "Indian Cuisine:Yoghurt/ Curd rice": 1,
                "Indian Cuisine:Indian Breads": 4,
                "Oriental:Non Veg": 2,
                "Oriental:Veg": 2,
                "Oriental:Starch": 2,
                "Oriental:Live Station": 1,
                "Continental:Non Veg": 1,
                "Continental:Veg": 1,
                "Continental:Starch": 1,
                "Desserts:Desserts": 6,
                "Desserts:Desserts Live": 1,
            },
        },
        {
            "packageName": "Platinum Veg",
            "packageTier": "Platinum",
            "basePrice": 3000,
            "minGuests": 100,
            "maxGuests": 500,
            "isNonVeg": False,
            "grid": {
                "Pre-Dining:Veg": 12,
                "Pre-Dining:Salads": 7,
                "Pre-Dining:Soups": 2,
                "Pre-Dining:Western Bread": 3,
                "Pre-Dining:Chaats (Live Stations)": 6,
                "Pre-Dining:Sushi Station - Live": 1,
                "Pre-Dining:Dim Sum Station - Live": 1,
                "Pre-Dining:Mexican Station - Live": 1,
                "Pre-Dining:Galouti Station - Live": 1,
                "Pre-Dining:Mashtini/Nimbu Quessadillas Station Live": 1,
                "Indian Cuisine:Main Course Live Stations": 3,
                "Indian Cuisine:Paneer": 2,
                "Indian Cuisine:Veg": 7,
                "Indian Cuisine:Dal": 1,
                "Indian Cuisine:Starch": 3,
                "Indian Cuisine:Achaar/ Papad/ Chutney": 1,
                "Indian Cuisine:Yoghurt/ Curd rice": 2,
                "Indian Cuisine:Indian Breads": 8,
                "Oriental:Veg": 3,
                "Oriental:Starch": 2,
                "Oriental:Live Station": 1,
                "Continental:Veg": 2,
                "Continental:Starch": 1,
                "Continental:Live Station": 1,
                "Desserts:Desserts": 10,
                "Desserts:Desserts Live": 2,
            },
        },
        {
            "packageName": "Platinum Non-Veg",
            "packageTier": "Platinum",
            "basePrice": 3300,
            "minGuests": 100,
            "maxGuests": 500,
            "isNonVeg": True,
            "grid": {
                "Pre-Dining:Veg": 7,
                "Pre-Dining:Salads": 7,
                "Pre-Dining:Soups": 2,
                "Pre-Dining:Western Bread": 3,
                "Pre-Dining:Chaats (Live Stations)": 6,
                "Pre-Dining:Sushi Station - Live": 1,
                "Pre-Dining:Dim Sum Station - Live": 1,
                "Pre-Dining:Mexican Station - Live": 1,
                "Pre-Dining:Galouti Station - Live": 1,
                "Pre-Dining:Mashtini/Nimbu Quessadillas Station Live": 1,
                "Indian Cuisine:Non Veg": 3,
                "Indian Cuisine:Main Course Live Stations": 3,
                "Indian Cuisine:Paneer": 2,
                "Indian Cuisine:Veg": 5,
                "Indian Cuisine:Dal": 1,
                "Indian Cuisine:Starch": 3,
                "Indian Cuisine:Achaar/ Papad/ Chutney": 1,
                "Indian Cuisine:Yoghurt/ Curd rice": 2,
                "Indian Cuisine:Indian Breads": 6,
                "Oriental:Non Veg": 2,
                "Oriental:Veg": 2,
                "Oriental:Starch": 2,
                "Oriental:Live Station": 1,
                "Continental:Non Veg": 1,
                "Continental:Veg": 1,
                "Continental:Starch": 1,
                "Continental:Live Station": 1,
                "Desserts:Desserts": 10,
                "Desserts:Desserts Live": 2,
            },
        },
    ]

    predefined_packages = []
    for preset in presets:
        sections = _build_predefined_sections(sections_master, preset["grid"])
        chaats_qty = preset["grid"].get("Pre-Dining:Chaats (Live Stations)", 0)
        add_ons = _build_predefined_add_ons(
            preset["packageTier"], preset["isNonVeg"], chaats_qty
        )
        predefined_packages.append(
            {
                "id": str(uuid.uuid4()),
                "packageName": preset["packageName"],
                "packageTier": preset["packageTier"],
                "basePrice": preset["basePrice"],
                "minGuests": preset["minGuests"],
                "maxGuests": preset["maxGuests"],
                "packageDescription": f"Predefined package from banquet grid ({preset['packageName']}).",
                "notes": "Preloaded from banquet grid screenshot. You can edit quantities and add-ons.",
                "status": "Active",
                "sections": sections,
                "addOns": add_ons,
            }
        )

    return predefined_packages


@app.get("/api/sections-master")
def get_sections_master(_token: str = Depends(verify_token)):
    master_data = _read_sections_master_data()
    return {
        "sections": master_data.get("sections", []),
        "addOnsMaster": master_data.get("addOnsMaster", []),
        "tierRules": master_data.get("tierRules", {}),
    }


@app.get("/api/public/generator/sections-master")
def get_public_generator_sections_master():
    master_data = _read_sections_master_data()
    return {
        "sections": master_data.get("sections", []),
        "addOnsMaster": master_data.get("addOnsMaster", []),
        "tierRules": master_data.get("tierRules", {}),
    }


@app.get("/api/packages", response_model=List[MenuPackage])
def get_menu_packages(_token: str = Depends(verify_token)):
    packages_data = _read_packages_data()
    return packages_data.get("packages", [])


@app.get("/api/public/generator/packages")
def get_public_generator_packages():
    packages_data = _read_packages_data()
    packages = packages_data.get("packages", [])
    active_packages = [
        _public_package_view(package)
        for package in packages
        if isinstance(package, dict) and package.get("status") == "Active"
    ]
    return {"packages": active_packages}


@app.get("/api/public/generator/packages/{package_id}")
def get_public_generator_package(package_id: str):
    packages_data = _read_packages_data()
    package = next(
        (
            pkg
            for pkg in packages_data.get("packages", [])
            if isinstance(pkg, dict) and pkg.get("id") == package_id
        ),
        None,
    )
    if package is None:
        raise HTTPException(status_code=404, detail="Package not found")
    return _public_package_view(package)


@app.post("/api/packages", response_model=MenuPackage)
def create_menu_package(
    payload: CreateMenuPackageRequest, _token: str = Depends(verify_token)
):
    new_package = _create_menu_package_from_payload(payload, str(uuid.uuid4()))

    existing_data = _read_packages_data()
    existing_data["packages"].append(new_package.model_dump())
    _write_packages_data(existing_data)

    return new_package


@app.post("/api/public/generator/packages")
def submit_sales_package(payload: SalesSubmitPackageRequest):
    submitted_name = payload.submittedBy.strip()
    if not submitted_name:
        raise HTTPException(status_code=400, detail="submittedBy is required")

    new_package = _create_menu_package_from_payload(payload.package, str(uuid.uuid4()))
    package_payload = new_package.model_dump()
    package_payload["status"] = "Active"
    package_payload["submittedBy"] = submitted_name
    package_payload["source"] = "sales"

    existing_data = _read_packages_data()
    existing_data["packages"].append(package_payload)
    _write_packages_data(existing_data)

    return {
        "id": package_payload["id"],
        "status": package_payload["status"],
        "submittedBy": package_payload["submittedBy"],
    }


@app.put("/api/packages/{package_id}", response_model=MenuPackage)
def update_menu_package(
    package_id: str, payload: UpdateMenuPackageRequest, _token: str = Depends(verify_token)
):
    existing_data = _read_packages_data()
    packages = existing_data.get("packages", [])

    package_index = next(
        (index for index, package in enumerate(packages) if package.get("id") == package_id),
        -1,
    )
    if package_index == -1:
        raise HTTPException(status_code=404, detail="Package not found")

    updated_package = _create_menu_package_from_payload(payload, package_id)
    packages[package_index] = updated_package.model_dump()
    existing_data["packages"] = packages
    _write_packages_data(existing_data)
    return updated_package


@app.post("/api/packages/predefined")
def seed_predefined_packages(_token: str = Depends(verify_token)):
    existing_data = _read_packages_data()
    existing_names = {package.get("packageName") for package in existing_data.get("packages", [])}
    predefined_packages = _build_predefined_packages()
    packages_to_add = [
        package for package in predefined_packages if package.get("packageName") not in existing_names
    ]

    existing_data["packages"].extend(packages_to_add)
    _write_packages_data(existing_data)
    return {"added": len(packages_to_add), "total": len(existing_data["packages"])}


@app.delete("/api/packages/{package_id}")
def delete_menu_package(package_id: str, _token: str = Depends(verify_token)):
    existing_data = _read_packages_data()
    packages = existing_data.get("packages", [])

    filtered_packages = [pkg for pkg in packages if pkg.get("id") != package_id]
    if len(filtered_packages) == len(packages):
        raise HTTPException(status_code=404, detail="Package not found")

    existing_data["packages"] = filtered_packages
    _write_packages_data(existing_data)
    return {"status": "deleted", "id": package_id}


@app.get("/api/master-data")
def get_master_data(_token: str = Depends(verify_token)):
    _, registry_data = _read_registry_data()
    return {"items": _flatten_registry_items(registry_data)}


@app.get("/api/public/generator/master-data")
def get_public_generator_master_data():
    _, registry_data = _read_registry_data()
    return {"items": _flatten_registry_items(registry_data)}


@app.post("/api/public/generator/suggestions")
def suggest_generator_menus(payload: SuggestRequest):
    requirements = {
        "diet": payload.diet,
        "occasion": payload.occasion,
        "meal": payload.meal,
        "num_guests": payload.num_guests,
    }
    return {"suggestions": _suggest_menus(requirements, payload.top_n)}


@app.post("/api/public/generator/generate")
def generate_public_menu(payload: GenerateMenuRequest):
    packages_data = _read_packages_data()
    package = None
    if payload.mode == "from_package":
        if not payload.package_id:
            raise HTTPException(
                status_code=400, detail="package_id is required for from_package mode"
            )
        package = next(
            (
                pkg
                for pkg in packages_data.get("packages", [])
                if isinstance(pkg, dict) and pkg.get("id") == payload.package_id
            ),
            None,
        )
        if package is None:
            raise HTTPException(status_code=404, detail="Package not found")

    validated_sections = []
    for section in payload.selections:
        if len(section.selected_dishes) > section.max_items:
            raise HTTPException(
                status_code=400,
                detail=(
                    f"Too many dishes for {section.section}/{section.category}: "
                    f"max {section.max_items}"
                ),
            )
        validated_sections.append(section.model_dump())

    cleaned_addons = [item.strip() for item in payload.addons if item and item.strip()]
    return {
        "event": payload.event.model_dump(),
        "mode": payload.mode,
        "sourcePackage": _public_package_view(package) if package else None,
        "sections": validated_sections,
        "addons": cleaned_addons,
        "descriptionScope": "this_menu_only",
    }


@app.post("/api/public/generator/intake")
def intake_generator_event(payload: IntakeRequest):
    packages_data = _read_packages_data()
    active_packages = [
        package
        for package in packages_data.get("packages", [])
        if isinstance(package, dict) and package.get("status") == "Active"
    ]
    selected_package = None
    if payload.selected_package_id:
        selected_package = next(
            (pkg for pkg in active_packages if pkg.get("id") == payload.selected_package_id), None
        )
        if selected_package is None:
            raise HTTPException(status_code=404, detail="Selected package not found")

    _, registry_data = _read_registry_data()
    sections_master = _read_sections_master_data()
    function_menus = []
    for day in payload.event.day_plans:
        for function in day.functions:
            if selected_package:
                sections_payload = _build_prefill_from_package(
                    selected_package, registry_data, payload.event.metadata.get("diet", "veg")
                )
            else:
                sections_payload = []
            function_menus.append(
                {
                    "dayNumber": day.day_number,
                    "eventDate": str(day.event_date),
                    "functionName": function.function_name,
                    "timeSlotCode": function.time_slot_code,
                    "sections": deepcopy(sections_payload),
                }
            )

    return {
        "event": payload.event.model_dump(mode="json"),
        "availablePlans": [_public_package_view(pkg) for pkg in active_packages],
        "selectedPlan": _public_package_view(selected_package) if selected_package else None,
        "menuMode": "plan_prefilled" if selected_package else "custom_builder",
        "functionMenus": function_menus,
        "customBuilderSections": _build_custom_builder_sections(sections_master),
    }


@app.post("/api/public/generator/preview-html")
def preview_generator_html(payload: PreviewRequest):
    def to_course_map(function_menu: Dict[str, Any]):
        course_map: Dict[str, List[Dict[str, Any]]] = {}
        for section in function_menu.get("sections", []):
            section_name = section.get("sectionName", "Section")
            for category in section.get("categories", []):
                category_name = category.get("categoryName", "Category")
                course_key = f"{section_name} - {category_name}"
                dishes = []
                for dish in category.get("dishes", []):
                    dishes.append(
                        {
                            "name": dish.get("dishName", ""),
                            "description": dish.get("shortDescription", ""),
                            "dietary": payload.event.metadata.get("diet", "Veg").title(),
                        }
                    )
                course_map[course_key] = dishes
        return course_map

    series = []
    for menu in payload.function_menus:
        series.append(
            {
                "label": f"Day {menu.get('dayNumber', 1)}",
                "occasion": payload.event.occasion,
                "meal_type": menu.get("functionName", ""),
                "courses": to_course_map(menu),
            }
        )

    first_courses = to_course_map(payload.function_menus[0]) if payload.function_menus else {}
    event_title = (
        getattr(payload.event, "event_name", None)
        or payload.event.occasion
    )
    service_style = (
        payload.service_style
        or payload.event.metadata.get("service_style")
        or "Buffet"
    )
    html, _ = generate_html_pdf(
        payload.template_name,
        {
            "client_name": payload.event.client_name,
            "event_title": event_title,
            "occasion": payload.event.occasion,
            "event_date": f"{payload.event.start_date} to {payload.event.end_date}",
            "venue": payload.event.venue or "",
            "guests": str(payload.event.min_guests),
            "meal_type": payload.function_menus[0].get("functionName", "") if payload.function_menus else "",
            "service_style": service_style,
            "dietary": payload.event.metadata.get("diet", "Veg").title(),
            "prepared_by": payload.prepared_by,
            "is_multi_day": payload.event.is_multi_day,
            "series": series,
            "courses": first_courses,
        },
    )
    return {"html": html}


@app.patch("/api/master-data")
def patch_master_data(
    payload: MasterDataUpdateRequest, _token: str = Depends(verify_token)
):
    registry_path, registry_data = _read_registry_data()
    sections = registry_data.get("sections", {})
    if not isinstance(sections, dict):
        raise HTTPException(status_code=500, detail="Invalid registry sections structure")

    category = sections.get(payload.categoryName)
    if not isinstance(category, dict):
        raise HTTPException(status_code=404, detail="Category not found")

    group = category.get(payload.groupName)
    if not isinstance(group, list):
        raise HTTPException(status_code=404, detail="Group not found")

    updated_item = None
    for item in group:
        if isinstance(item, dict) and item.get("name") == payload.itemName:
            item["short_description"] = payload.shortDescription
            item["premium_description"] = payload.premiumDescription
            updated_item = item
            break

    if updated_item is None:
        raise HTTPException(status_code=404, detail="Item not found")

    _ensure_persistent_data()
    with registry_path.open("w", encoding="utf-8") as registry_file:
        json.dump(registry_data, registry_file, indent=2)

    return {
        "status": "updated",
        "item": {
            "categoryName": payload.categoryName,
            "groupName": payload.groupName,
            "itemName": payload.itemName,
            "shortDescription": updated_item.get("short_description", ""),
            "premiumDescription": updated_item.get("premium_description", ""),
        },
    }


_ensure_persistent_data()
app.include_router(generate_router)
if FRONTEND_DIST.exists():
    app.mount(
        "/menucraft",
        StaticFiles(directory=str(FRONTEND_DIST), html=True),
        name="menucraft",
    )
