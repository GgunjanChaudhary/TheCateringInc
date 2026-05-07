from __future__ import annotations

import os
import sys
from pathlib import Path

from fastapi import APIRouter

from schemas.generate import (
    GenerateMenuRequest,
    IntakeRequest,
    PreviewRequest,
    SubmitPackageRequest,
    SuggestRequest,
)
from services.generate_service import GenerateService

BACKEND_DIR = Path(__file__).resolve().parents[1]
PERSISTENT_DATA_DIR = Path(
    os.getenv("PERSISTENT_DATA_DIR", str(BACKEND_DIR.parent / "persistent_data"))
)
PACKAGES_PATH = PERSISTENT_DATA_DIR / "packages.json"
SECTIONS_MASTER_PATH = BACKEND_DIR / "sections_master.json"
MASTER_REGISTRY_PATH = PERSISTENT_DATA_DIR / "master_registry.json"
SAMPLE_MENUS_PATH = Path(
    os.getenv("SAMPLE_MENUS_PATH", str(BACKEND_DIR / "sample_menus.json"))
)
BUNDLED_PACKAGES_PATH = BACKEND_DIR / "packages.json"
if str(BACKEND_DIR.parent) not in sys.path:
    sys.path.append(str(BACKEND_DIR.parent))
from utils.pdf_generator import generate as generate_html_pdf  # noqa: E402

router = APIRouter(prefix="/api/public/generator", tags=["public-generator"])
service = GenerateService(
    packages_path=PACKAGES_PATH,
    sections_master_path=SECTIONS_MASTER_PATH,
    registry_path=MASTER_REGISTRY_PATH,
    sample_menus_path=SAMPLE_MENUS_PATH,
    html_generator=generate_html_pdf,
    bundled_packages_path=BUNDLED_PACKAGES_PATH,
)


@router.get("/packages")
def get_packages():
    return {"packages": service.list_active_packages()}


@router.get("/packages/{package_id}")
def get_package(package_id: str):
    return service.public_package_view(service.get_package(package_id))


@router.get("/master-data")
def get_master_data():
    return {"items": service.flatten_registry_items(service.read_registry_data())}


@router.get("/sections-master")
def get_sections_master():
    master = service.read_sections_master_data()
    return {
        "sections": master.get("sections", []),
        "addOnsMaster": master.get("addOnsMaster", []),
        "tierRules": master.get("tierRules", {}),
    }


@router.get("/categories")
def get_categories():
    sections = service.read_registry_data().get("sections", {})
    return {"categories": list(sections.keys()) if isinstance(sections, dict) else []}


@router.post("/packages")
def post_packages(payload: SubmitPackageRequest):
    return service.submit_sales_package(payload.submittedBy, payload.package)


@router.post("/suggestions")
def post_suggestions(payload: SuggestRequest):
    return {
        "suggestions": service.suggest_menus(
            {
                "diet": payload.diet,
                "occasion": payload.occasion,
                "meal": payload.meal,
                "num_guests": payload.num_guests,
            },
            payload.top_n,
        )
    }


@router.post("/generate")
def post_generate(payload: GenerateMenuRequest):
    return service.generate_menu(payload.model_dump())


@router.post("/intake")
def post_intake(payload: IntakeRequest):
    return service.build_intake_response(payload.model_dump(mode="json"))


@router.post("/preview-html")
def post_preview_html(payload: PreviewRequest):
    return service.preview_html(payload.model_dump(mode="json"))
