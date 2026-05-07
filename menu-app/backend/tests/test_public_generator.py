import importlib
import json
import os
import tempfile
import unittest
from pathlib import Path

from fastapi.testclient import TestClient
from services.generate_service import GenerateService


class PublicGeneratorApiTests(unittest.TestCase):
    @classmethod
    def _seed_test_packages(cls):
        packages_path = Path(os.environ["PERSISTENT_DATA_DIR"]) / "packages.json"
        packages_path.write_text(
            json.dumps(
                {
                    "packages": [
                        {
                            "id": "pkg-1",
                            "packageName": "Corporate Veg",
                            "packageTier": "Corporate",
                            "basePrice": 1200,
                            "minGuests": 100,
                            "maxGuests": 500,
                            "packageDescription": "Seed package",
                            "notes": "Internal",
                            "status": "Active",
                            "sections": [
                                {
                                    "sectionName": "Pre-Dining",
                                    "subSections": [
                                        {"categoryName": "Veg", "allowedQuantity": 2}
                                    ],
                                }
                            ],
                            "addOns": [],
                        }
                    ]
                }
            ),
            encoding="utf-8",
        )

    @classmethod
    def setUpClass(cls):
        cls.temp_dir = tempfile.TemporaryDirectory()
        data_dir = Path(cls.temp_dir.name)
        os.environ["PERSISTENT_DATA_DIR"] = str(data_dir)
        os.environ["SAMPLE_MENUS_PATH"] = str(
            Path(__file__).resolve().parents[1] / "sample_menus.json"
        )

        packages_path = data_dir / "packages.json"
        registry_path = data_dir / "master_registry.json"
        cls._seed_test_packages()
        registry_path.write_text(
            json.dumps(
                {
                    "sections": {
                        "Veg": {
                            "Default": [
                                {
                                    "name": "Paneer Tikka",
                                    "short_description": "Smoky paneer starter",
                                    "premium_description": "Smoky paneer starter premium",
                                    "tags": ["veg"],
                                },
                                {
                                    "name": "Hara Bhara Kebab",
                                    "short_description": "Spinach potato patty",
                                    "premium_description": "Spinach potato patty premium",
                                    "tags": ["veg"],
                                }
                            ]
                        }
                    }
                }
            ),
            encoding="utf-8",
        )

        generate_router_module = importlib.import_module("routers.generate")
        importlib.reload(generate_router_module)
        cls.main_module = importlib.import_module("main")
        cls.main_module = importlib.reload(cls.main_module)
        cls.client = TestClient(cls.main_module.app)

    @classmethod
    def tearDownClass(cls):
        cls.temp_dir.cleanup()

    def setUp(self):
        self._seed_test_packages()

    def test_public_packages_endpoint_returns_active_packages(self):
        response = self.client.get("/api/public/generator/packages")
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(len(payload["packages"]), 1)
        self.assertEqual(payload["packages"][0]["id"], "pkg-1")

    def test_sales_submit_package_creates_auto_active_record(self):
        payload = {
            "submittedBy": "Gunjan",
            "package": {
                "packageName": "Sales Custom",
                "packageTier": "Silver",
                "basePrice": 1500,
                "minGuests": 100,
                "maxGuests": 250,
                "packageDescription": "Created by sales",
                "notes": "",
                "status": "Draft",
                "sections": [],
                "addOns": [],
            },
        }
        create_response = self.client.post("/api/public/generator/packages", json=payload)
        self.assertEqual(create_response.status_code, 200)
        created = create_response.json()
        self.assertEqual(created["status"], "Active")
        self.assertEqual(created["submittedBy"], "Gunjan")
        packages_path = Path(os.environ["PERSISTENT_DATA_DIR"]) / "packages.json"
        stored = json.loads(packages_path.read_text(encoding="utf-8"))
        self.assertTrue(any(pkg.get("id") == created["id"] for pkg in stored.get("packages", [])))

    def test_generate_rejects_exceeding_max_items(self):
        payload = {
            "event": {
                "client_name": "Client",
                "event_title": "Dinner",
                "occasion": "Wedding",
                "event_date": "2026-05-07",
                "venue": "Hall",
                "num_guests": 200,
                "diet": "veg",
                "meal": "dinner",
                "is_series": False,
                "series_notes": "",
                "special_notes": "",
            },
            "mode": "custom",
            "selections": [
                {
                    "section": "Pre-Dining",
                    "category": "Veg",
                    "max_items": 1,
                    "selected_dishes": [
                        {"section": "Pre-Dining", "category": "Veg", "dish_name": "Paneer", "description": ""},
                        {"section": "Pre-Dining", "category": "Veg", "dish_name": "Hara Bhara", "description": ""},
                    ],
                }
            ],
            "addons": [],
        }
        response = self.client.post("/api/public/generator/generate", json=payload)
        self.assertEqual(response.status_code, 400)

    def test_packages_bootstrap_from_seed_when_persistent_empty(self):
        packages_path = Path(os.environ["PERSISTENT_DATA_DIR"]) / "packages.json"
        packages_path.write_text(json.dumps({"packages": []}), encoding="utf-8")
        service = GenerateService(
            packages_path=packages_path,
            sections_master_path=Path(__file__).resolve().parents[1] / "sections_master.json",
            registry_path=Path(os.environ["PERSISTENT_DATA_DIR"]) / "master_registry.json",
            sample_menus_path=Path(__file__).resolve().parents[1] / "sample_menus.json",
            html_generator=lambda *_args, **_kwargs: ("", None),
            bundled_packages_path=Path(__file__).resolve().parents[1] / "packages.json",
        )
        service.read_packages_data()
        stored = json.loads(packages_path.read_text(encoding="utf-8"))
        self.assertGreater(len(stored.get("packages", [])), 0)

    def test_intake_prefills_sections_and_dishes_for_selected_package(self):
        payload = {
            "selected_package_id": "pkg-1",
            "create_own_menu": False,
            "event": {
                "client_name": "Client",
                "occasion": "Wedding",
                "venue": "Banquet Hall",
                "min_guests": 150,
                "max_guests": 200,
                "is_multi_day": False,
                "start_date": "2026-05-07",
                "end_date": "2026-05-07",
                "metadata": {"diet": "veg"},
                "metadata_fields": [],
                "time_slots": [
                    {
                        "slot_code": "slot_1_1",
                        "label": "slot_1_1",
                        "start_time": "10:00:00",
                        "end_time": "13:00:00",
                    }
                ],
                "day_plans": [
                    {
                        "day_number": 1,
                        "event_date": "2026-05-07",
                        "functions": [
                            {
                                "function_name": "Main Function",
                                "meal_type": "dinner",
                                "time_slot_code": "slot_1_1",
                            }
                        ],
                    }
                ],
            },
        }
        response = self.client.post("/api/public/generator/intake", json=payload)
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual(body["menuMode"], "plan_prefilled")
        self.assertTrue(body["functionMenus"])
        first_sections = body["functionMenus"][0]["sections"]
        self.assertTrue(first_sections)
        first_category = first_sections[0]["categories"][0]
        self.assertEqual(first_category["allowedQuantity"], 2)
        self.assertEqual(len(first_category["dishes"]), 2)


if __name__ == "__main__":
    unittest.main()
