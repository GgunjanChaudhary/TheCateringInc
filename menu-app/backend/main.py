from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Any, Dict, List, Literal, Optional
from pathlib import Path
import json
import os
import uuid

from .auth import login_with_password, revoke_token, verify_token


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


app = FastAPI(title="TCI Menu Generator API", version="0.1.0")

BACKEND_DIR = Path(__file__).resolve().parent
PERSISTENT_DATA_DIR = Path(
    os.getenv("PERSISTENT_DATA_DIR", str(BACKEND_DIR.parent / "persistent_data"))
)
PACKAGES_PATH = PERSISTENT_DATA_DIR / "packages.json"
SECTIONS_MASTER_PATH = BACKEND_DIR / "sections_master.json"
MASTER_REGISTRY_PATH = PERSISTENT_DATA_DIR / "master_registry.json"
BUNDLED_SEED_PATH = BACKEND_DIR / "pick_choose_menu.json"
FRONTEND_DIST = BACKEND_DIR.parent / "frontend" / "dist"

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


@app.get("/api/packages", response_model=List[MenuPackage])
def get_menu_packages(_token: str = Depends(verify_token)):
    packages_data = _read_packages_data()
    return packages_data.get("packages", [])


@app.post("/api/packages", response_model=MenuPackage)
def create_menu_package(
    payload: CreateMenuPackageRequest, _token: str = Depends(verify_token)
):
    new_package = _create_menu_package_from_payload(payload, str(uuid.uuid4()))

    existing_data = _read_packages_data()
    existing_data["packages"].append(new_package.model_dump())
    _write_packages_data(existing_data)

    return new_package


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

    return {"items": items}


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
if FRONTEND_DIST.exists():
    app.mount(
        "/menucraft",
        StaticFiles(directory=str(FRONTEND_DIST), html=True),
        name="menucraft",
    )
