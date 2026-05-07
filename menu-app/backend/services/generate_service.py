from __future__ import annotations

import json
import uuid
from copy import deepcopy
from pathlib import Path
from typing import Any, Dict, List, Optional

from fastapi import HTTPException


class GenerateService:
    def __init__(
        self,
        packages_path: Path,
        sections_master_path: Path,
        registry_path: Path,
        sample_menus_path: Path,
        html_generator,
        bundled_packages_path: Optional[Path] = None,
    ):
        self.packages_path = packages_path
        self.sections_master_path = sections_master_path
        self.registry_path = registry_path
        self.sample_menus_path = sample_menus_path
        self.html_generator = html_generator
        self.bundled_packages_path = bundled_packages_path

    def _seed_packages_if_needed(self) -> None:
        self.packages_path.parent.mkdir(parents=True, exist_ok=True)
        should_seed = not self.packages_path.exists()
        if not should_seed:
            try:
                with self.packages_path.open("r", encoding="utf-8") as f:
                    current = json.load(f)
            except json.JSONDecodeError:
                current = {"packages": []}
            should_seed = not isinstance(current.get("packages"), list) or len(current.get("packages", [])) == 0

        if should_seed and self.bundled_packages_path and self.bundled_packages_path.exists():
            try:
                with self.bundled_packages_path.open("r", encoding="utf-8") as seed_file:
                    bundled_data = json.load(seed_file)
            except json.JSONDecodeError:
                bundled_data = {"packages": []}
            if not isinstance(bundled_data.get("packages"), list):
                bundled_data["packages"] = []
            with self.packages_path.open("w", encoding="utf-8") as out_file:
                json.dump(bundled_data, out_file, indent=2)

    def read_packages_data(self) -> Dict[str, Any]:
        self._seed_packages_if_needed()
        if not self.packages_path.exists():
            return {"packages": []}
        try:
            with self.packages_path.open("r", encoding="utf-8") as f:
                data = json.load(f)
        except json.JSONDecodeError as exc:
            raise HTTPException(status_code=500, detail="Invalid packages JSON") from exc
        if not isinstance(data.get("packages"), list):
            data["packages"] = []
        return data

    def write_packages_data(self, data: Dict[str, Any]) -> None:
        self.packages_path.parent.mkdir(parents=True, exist_ok=True)
        with self.packages_path.open("w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

    def read_registry_data(self) -> Dict[str, Any]:
        if not self.registry_path.exists():
            raise HTTPException(status_code=404, detail="Registry file not found")
        try:
            with self.registry_path.open("r", encoding="utf-8") as f:
                return json.load(f)
        except json.JSONDecodeError as exc:
            raise HTTPException(status_code=500, detail="Invalid registry JSON") from exc

    def read_sections_master_data(self) -> Dict[str, Any]:
        if not self.sections_master_path.exists():
            raise HTTPException(status_code=404, detail="Sections master file not found")
        try:
            with self.sections_master_path.open("r", encoding="utf-8") as f:
                data = json.load(f)
        except json.JSONDecodeError as exc:
            raise HTTPException(status_code=500, detail="Invalid sections master JSON") from exc
        if not isinstance(data, dict):
            raise HTTPException(status_code=500, detail="Invalid sections master structure")
        return data

    def flatten_registry_items(self, registry_data: Dict[str, Any]) -> List[Dict[str, Any]]:
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

    def public_package_view(self, package: Dict[str, Any]) -> Dict[str, Any]:
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

    def list_active_packages(self) -> List[Dict[str, Any]]:
        data = self.read_packages_data()
        return [
            self.public_package_view(pkg)
            for pkg in data.get("packages", [])
            if isinstance(pkg, dict) and pkg.get("status") == "Active"
        ]

    def get_package(self, package_id: str) -> Dict[str, Any]:
        data = self.read_packages_data()
        package = next(
            (
                pkg
                for pkg in data.get("packages", [])
                if isinstance(pkg, dict) and pkg.get("id") == package_id
            ),
            None,
        )
        if package is None:
            raise HTTPException(status_code=404, detail="Package not found")
        return package

    def submit_sales_package(self, submitted_by: str, package_payload: Dict[str, Any]) -> Dict[str, Any]:
        if not submitted_by.strip():
            raise HTTPException(status_code=400, detail="submittedBy is required")
        payload = dict(package_payload)
        payload["id"] = str(uuid.uuid4())
        payload["status"] = "Active"
        payload["submittedBy"] = submitted_by.strip()
        payload["source"] = "sales"
        data = self.read_packages_data()
        data["packages"].append(payload)
        self.write_packages_data(data)
        return {"id": payload["id"], "status": payload["status"], "submittedBy": payload["submittedBy"]}

    def _load_sample_menus(self) -> List[Dict[str, Any]]:
        if not self.sample_menus_path.exists():
            raise HTTPException(status_code=404, detail="Sample menus file not found")
        try:
            with self.sample_menus_path.open("r", encoding="utf-8") as f:
                data = json.load(f)
        except json.JSONDecodeError as exc:
            raise HTTPException(status_code=500, detail="Invalid sample menus JSON") from exc
        menus = data.get("menus", [])
        return menus if isinstance(menus, list) else []

    def suggest_menus(self, requirements: Dict[str, Any], top_n: int) -> List[Dict[str, Any]]:
        def score_menu(menu: Dict[str, Any]) -> tuple[float, List[str]]:
            tags = menu.get("tags", {})
            score = 0.0
            reasons: List[str] = []
            req_diet = requirements.get("diet")
            if req_diet == tags.get("diet"):
                score += 40
                reasons.append("Diet match")
            req_occ = (requirements.get("occasion") or "").lower().strip()
            occs = [str(v).lower() for v in tags.get("occasion", [])]
            if req_occ and req_occ in occs:
                score += 30
                reasons.append("Occasion match")
            req_meal = (requirements.get("meal") or "").lower()
            meals = [str(v).lower() for v in tags.get("meal", [])]
            if req_meal and req_meal in meals:
                score += 15
                reasons.append("Meal match")
            guests = requirements.get("num_guests")
            if isinstance(guests, int):
                if int(tags.get("guest_min", 0)) <= guests <= int(tags.get("guest_max", 10**6)):
                    score += 20
                    reasons.append("Guest range match")
            return score, reasons

        scored = []
        for menu in self._load_sample_menus():
            if isinstance(menu, dict):
                score, reasons = score_menu(menu)
                scored.append((menu, score, reasons))
        scored.sort(key=lambda x: x[1], reverse=True)
        return [{"menu": m, "score": s, "reasons": r} for m, s, r in scored[:top_n]]

    @staticmethod
    def _normalize_token(value: str) -> str:
        return "".join(ch.lower() for ch in value if ch.isalnum())

    def _registry_candidates(self, registry_data: Dict[str, Any], category_name: str) -> List[Dict[str, Any]]:
        sections = registry_data.get("sections", {})
        if not isinstance(sections, dict):
            return []
        want = self._normalize_token(category_name)
        keys = []
        for key in sections.keys():
            token = self._normalize_token(str(key))
            if token == want or want in token or token in want:
                keys.append(key)
        seen = set()
        candidates = []
        for key in keys:
            groups = sections.get(key, {})
            if not isinstance(groups, dict):
                continue
            for item_list in groups.values():
                if not isinstance(item_list, list):
                    continue
                for item in item_list:
                    if not isinstance(item, dict):
                        continue
                    name = str(item.get("name", "")).strip()
                    if not name or name.lower() in seen:
                        continue
                    seen.add(name.lower())
                    candidates.append(item)
        return candidates

    def _rank_candidates(
        self, candidates: List[Dict[str, Any]], category_name: str, event: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        occasion = str(event.get("occasion", "")).lower()
        category_token = self._normalize_token(category_name)

        def score(item: Dict[str, Any]) -> tuple[int, str]:
            tags = [str(tag).lower() for tag in item.get("tags", [])]
            name = str(item.get("name", ""))
            name_lower = name.lower()
            score_value = 0
            if any(category_token and category_token in self._normalize_token(tag) for tag in tags):
                score_value += 4
            if occasion and any(occasion in tag for tag in tags):
                score_value += 2
            if category_token and category_token in self._normalize_token(name_lower):
                score_value += 1
            return (score_value, name_lower)

        return sorted(candidates, key=score, reverse=True)

    def _diet_filter(self, candidates: List[Dict[str, Any]], diet: str) -> List[Dict[str, Any]]:
        if diet not in {"veg", "jain"}:
            return candidates
        blocked = {"non veg", "non-veg", "chicken", "mutton", "fish", "seafood", "meat"}
        out = []
        for item in candidates:
            text = f"{item.get('name','')} {' '.join(item.get('tags', []))}".lower()
            if any(b in text for b in blocked):
                continue
            out.append(item)
        return out

    def build_prefill_from_package(
        self, package: Dict[str, Any], registry_data: Dict[str, Any], diet: str, event: Optional[Dict[str, Any]] = None
    ) -> List[Dict[str, Any]]:
        sections = []
        event = event or {}
        for section in package.get("sections", []):
            sec_name = section.get("sectionName", "")
            categories = []
            for sub in section.get("subSections", []):
                cat_name = sub.get("categoryName", "")
                qty = int(sub.get("allowedQuantity", 0) or 0)
                if qty <= 0:
                    continue
                candidates = self._diet_filter(self._registry_candidates(registry_data, cat_name), diet)
                ranked = self._rank_candidates(candidates, cat_name, event)
                dishes = [
                    {
                        "dishName": item.get("name", ""),
                        "shortDescription": item.get("short_description", ""),
                        "premiumDescription": item.get("premium_description", ""),
                    }
                    for item in ranked[:qty]
                ]
                categories.append({"categoryName": cat_name, "allowedQuantity": qty, "dishes": dishes})
            if categories:
                sections.append({"sectionName": sec_name, "categories": categories})
        return sections

    def build_intake_response(self, intake_payload: Dict[str, Any]) -> Dict[str, Any]:
        event = intake_payload["event"]
        selected_package_id = intake_payload.get("selected_package_id")
        active_packages = self.list_active_packages()
        selected_package = None
        if selected_package_id:
            selected_package = next((p for p in active_packages if p["id"] == selected_package_id), None)
            if selected_package is None:
                raise HTTPException(status_code=404, detail="Selected package not found")
        registry_data = self.read_registry_data()
        sections_master = self.read_sections_master_data()
        function_menus = []
        for day in event["day_plans"]:
            for fn in day["functions"]:
                sections_payload = []
                if selected_package:
                    sections_payload = self.build_prefill_from_package(
                        selected_package,
                        registry_data,
                        event.get("metadata", {}).get("diet", "veg"),
                        event,
                    )
                function_menus.append(
                    {
                        "dayNumber": day["day_number"],
                        "eventDate": str(day["event_date"]),
                        "functionName": fn["function_name"],
                        "timeSlotCode": fn["time_slot_code"],
                        "sections": deepcopy(sections_payload),
                    }
                )
        custom_sections = [
            {"sectionName": sec.get("sectionName", ""), "subSections": sec.get("subSections", [])}
            for sec in sections_master.get("sections", [])
            if isinstance(sec, dict)
        ]
        return {
            "event": event,
            "availablePlans": active_packages,
            "selectedPlan": selected_package,
            "menuMode": "plan_prefilled" if selected_package else "custom_builder",
            "functionMenus": function_menus,
            "customBuilderSections": custom_sections,
        }

    def generate_menu(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        package = None
        if payload["mode"] == "from_package":
            package = self.get_package(payload["package_id"])
        validated = []
        for section in payload.get("selections", []):
            if len(section.get("selected_dishes", [])) > int(section.get("max_items", 0)):
                raise HTTPException(status_code=400, detail="Selected dishes exceed max_items")
            validated.append(section)
        addons = [item.strip() for item in payload.get("addons", []) if item and item.strip()]
        return {
            "menu_id": str(uuid.uuid4()),
            "event_summary": payload["event"],
            "selected_menu": {
                "mode": payload["mode"],
                "sourcePackage": self.public_package_view(package) if package else None,
                "sections": validated,
                "addons": addons,
                "descriptionScope": "this_menu_only",
            },
            "pdf_ready": False,
            "pdf_download_url": None,
        }

    def preview_html(self, payload: Dict[str, Any]) -> Dict[str, str]:
        event = payload["event"]
        function_menus = payload.get("function_menus", [])

        def to_course_map(function_menu: Dict[str, Any]):
            course_map: Dict[str, List[Dict[str, Any]]] = {}
            for section in function_menu.get("sections", []):
                section_name = section.get("sectionName", "Section")
                for category in section.get("categories", []):
                    category_name = category.get("categoryName", "Category")
                    key = f"{section_name} - {category_name}"
                    dishes = []
                    for dish in category.get("dishes", []):
                        dishes.append(
                            {
                                "name": dish.get("dishName", ""),
                                "description": dish.get("shortDescription", ""),
                                "dietary": event.get("metadata", {}).get("diet", "Veg").title(),
                            }
                        )
                    course_map[key] = dishes
            return course_map

        series = [
            {
                "label": f"Day {menu.get('dayNumber', 1)}",
                "occasion": event["occasion"],
                "meal_type": menu.get("functionName", ""),
                "courses": to_course_map(menu),
            }
            for menu in function_menus
        ]
        first_courses = to_course_map(function_menus[0]) if function_menus else {}
        event_title = event.get("event_name") or event.get("occasion", "")
        service_style = (
            payload.get("service_style")
            or event.get("metadata", {}).get("service_style")
            or "Buffet"
        )
        html, _ = self.html_generator(
            payload.get("template_name", "elegant_gold"),
            {
                "client_name": event["client_name"],
                "event_title": event_title,
                "occasion": event["occasion"],
                "event_date": f"{event['start_date']} to {event['end_date']}",
                "venue": event.get("venue", ""),
                "guests": str(event.get("min_guests", "")),
                "meal_type": function_menus[0].get("functionName", "") if function_menus else "",
                "service_style": service_style,
                "dietary": event.get("metadata", {}).get("diet", "Veg").title(),
                "prepared_by": payload.get("prepared_by", "Sales Team"),
                "is_multi_day": event.get("is_multi_day", False),
                "series": series,
                "courses": first_courses,
            },
        )
        return {"html": html}
