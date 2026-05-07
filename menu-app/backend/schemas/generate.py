from __future__ import annotations

from datetime import date
from typing import Any, Dict, List, Literal, Optional

from pydantic import BaseModel, Field

from models import ClientEventIntake


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
    selected_dishes: List[DishSelection] = Field(default_factory=list)


class GenerateMenuRequest(BaseModel):
    event: EventMeta
    mode: Literal["from_package", "custom"] = "from_package"
    package_id: Optional[str] = None
    selections: List[SectionSelection] = Field(default_factory=list)
    addons: List[str] = Field(default_factory=list)


class IntakeRequest(BaseModel):
    event: ClientEventIntake
    selected_package_id: Optional[str] = None
    create_own_menu: bool = False


class PreviewRequest(BaseModel):
    event: ClientEventIntake
    function_menus: List[Dict[str, Any]] = Field(default_factory=list)
    template_name: str = "elegant_gold"
    prepared_by: str = "Sales Team"
    service_style: Optional[str] = None


class SubmitPackageRequest(BaseModel):
    submittedBy: str = Field(min_length=1, max_length=120)
    package: Dict[str, Any]


class SubmitPackageResponse(BaseModel):
    id: str
    status: str
    submittedBy: str


class GenerateMenuResponse(BaseModel):
    menu_id: str
    event_summary: Dict[str, Any]
    selected_menu: Dict[str, Any]
    pdf_ready: bool
    pdf_download_url: Optional[str] = None
