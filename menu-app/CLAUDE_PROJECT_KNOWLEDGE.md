# CLAUDE Project Knowledge Handoff

## 1) Project Map (Current Structure)

### Repository Focus
- Primary project root: `menu-app/`
- Stack:
  - Backend: FastAPI + Pydantic
  - Frontend: React (Vite) + Zustand + Tailwind-style utility classes
  - Data storage: JSON files (no DB yet)

### Backend Layout
- `backend/main.py`
  - Core FastAPI app bootstrap, CORS, auth-protected admin endpoints, persistent data utilities, static mount.
  - Includes modular public generator router via `app.include_router(generate_router)`.
- `backend/routers/generate.py`
  - Public (unauthenticated) sales generator APIs under `/api/public/generator/*`.
  - Delegates business logic to `GenerateService`.
- `backend/services/generate_service.py`
  - Core generator logic:
    - package read/write + bootstrap seeding
    - active package listing
    - intake response generation
    - package prefill from registry
    - deterministic candidate ranking + diet filtering
    - preview HTML payload shaping for template renderer
- `backend/models.py`
  - Rich intake models for multi-day events:
    - `ClientEventIntake`
    - `EventDayPlan`, `EventFunctionPlan`, `EventTimeSlot`
    - metadata extension objects
- `backend/schemas/generate.py`
  - Request/response contracts for public generator endpoints.
- `backend/tests/test_public_generator.py`
  - Regression coverage for public generator behavior:
    - active packages
    - sales package submit
    - generate validation
    - package bootstrap
    - intake prefill completeness
- Data and config files:
  - `backend/packages.json` (bundled seed package source)
  - `backend/sections_master.json` (segment/category schema)
  - `backend/sample_menus.json` (sample suggestion content)
  - `persistent_data/packages.json` (runtime package store)
  - `persistent_data/master_registry.json` (runtime menu registry)

### Frontend Layout
- `frontend/src/App.jsx`
  - Routes:
    - `/login` (admin login)
    - `/admin` (protected)
    - `/master-data` (protected)
    - `/sales-generator` (public, no login)
- `frontend/src/pages/SalesMenuGenerator.jsx`
  - Main sales wizard (4 steps):
    1. Event Details
    2. Build Menu
    3. Choose Template
    4. Generate PDF (currently HTML preview/download)
  - Pulls packages and master data from public endpoints.
  - Handles package-driven intake and custom menu flow.
- `frontend/src/pages/AdminDashboard.jsx`
  - Admin Plan Creator and package management.
- `frontend/src/store/usePackageStore.js`
  - Admin-side package + sections master + add-ons state via Zustand.

### Supporting Assets
- `pdf_templates/` (HTML template sources for final output look)
- `utils/pdf_generator.py` (HTML/PDF render pipeline)
- `assets/` (branding assets, including logo)
- `Refrence/` (visual styling references)

---

## 2) Core Logic (Streamlit-Derived Behavior in Plain English)

> Note: A `Streamlit-Folder` source file is not present in the current workspace snapshot. The logic below is extracted from the already-ported FastAPI + React implementation plus spec alignment.

### A. Menu Generation Flow
1. User enters event basics (client, date, guests, occasion, diet, etc.).
2. User chooses either:
   - a predefined package (plan), or
   - custom build mode.
3. Backend intake (`POST /api/public/generator/intake`) returns:
   - available plans
   - selected plan metadata
   - `functionMenus` (prefilled if plan selected, blank structure if custom)
   - `customBuilderSections` for guided manual building
4. User adjusts quantities/dishes in Build step.
5. Frontend sends event + menu selections to preview endpoint.
6. Backend shapes template payload and returns rich HTML preview.

### B. Multi-Day Event Logic
1. Intake model captures:
   - overall date range (`start_date`, `end_date`)
   - each day (`day_plans`)
   - each function within a day (`functions`)
   - optional `time_slots`
2. Validation rules enforce:
   - end date cannot be before start date
   - guest count bounds are valid
   - single-day events must have exactly one day plan
   - each day date must fall within event range
   - function slot references are valid when slot catalog provided
3. During intake response generation:
   - backend iterates each day and function
   - creates one menu draft per function (`functionMenus`)
   - applies selected package prefill to each function draft

### C. Registry Matching and Prefill Logic
1. Package defines sections and categories with `allowedQuantity`.
2. For each category with quantity > 0:
   - backend finds registry candidates using normalized token matching
   - applies diet filter (veg/jain safety)
   - ranks candidates deterministically
   - picks top `allowedQuantity` dishes
3. Result: each function gets a complete section/category/dish structure when candidates exist.
4. Custom mode uses `sections_master.json` as canonical guided segment source.

---

## 3) The "Table-less" Architecture (Metadata-Driven Philosophy)

### What it means here
- We intentionally avoid hard-coded table/column assumptions in UI and domain logic.
- Core objects carry structured dictionaries/lists (`metadata`, `metadata_fields`, extensible section maps) so new business fields can be added without schema rewrites across every layer.

### Key principles for Claude to preserve
1. **Schema as contract, not rigid DB table shape**
   - Keep Pydantic models strongly validated, but use extension points (`metadata`, `metadata_fields`) for optional evolution.
2. **Master-driven composition**
   - `sections_master.json` defines builder structure.
   - `master_registry.json` defines dish inventory.
   - Packages reference sections/categories rather than duplicating hard-coded UI assumptions.
3. **Behavior over hard-coded UI branching**
   - UI should render from data contracts:
     - available plans from API
     - custom segments from `customBuilderSections`
     - function drafts from intake payload
4. **Forward-compatible payloads**
   - Keep API responses descriptive and additive.
   - New metadata should be pass-through compatible in frontend and backend.

### Practical implementation rules
- Prefer generic mappers over one-off category if/else trees.
- Never couple frontend fields to hidden static arrays when backend already sends the source-of-truth list.
- Preserve package schema compatibility between admin and sales creation flows.

---

## 4) Known Gaps (Current Pain Points)

The following are the exact steps still reported as problematic in practice:

### Step 1: Client Details
- Field visibility/clarity and step guidance still need final UX hardening.
- Multi-day date/function authoring can still be confusing and needs stronger validation UX (not just backend validation errors).

### Step 2: Plan Selection
- Must always clearly show package loading states and failures (no silent fallback).
- Package selection should always lead to visibly pre-generated menus before manual edits.
- Need stronger trust signals when selected package has sparse categories due to registry gaps.

### Step 3: Manual Registry Builder
- "Plan Creator parity" in custom mode is close but still needs polish:
  - clearer "add segment -> set quantity -> pick dishes" progression
  - fewer duplicate segment-add paths
  - stronger per-category quantity fulfillment feedback
- Dish picker quality depends on registry category matching quality; some categories can appear weakly mapped.

---

## 5) Critical API Contracts to Preserve

- `GET /api/public/generator/packages`
  - returns `{ packages: [...] }` active plans only
- `POST /api/public/generator/intake`
  - accepts event + selected package id
  - returns `functionMenus` + `customBuilderSections` + mode context
- `GET /api/public/generator/master-data`
  - flattened registry items for dish selection UI
- `POST /api/public/generator/preview-html`
  - returns HTML for template preview
- `POST /api/public/generator/packages`
  - saves sales-created package as active with `submittedBy`

---

## 6) Security and Access Reality (Important)

- Admin endpoints are token-protected.
- Sales generator endpoints are intentionally public right now.
- This means menu registry (`/api/public/generator/master-data`) is accessible without login in current design.
- If business rules change, introduce a minimal passcode/token gate for selected public endpoints.

---

## 7) Recommended Next Implementation Priorities for Claude

1. End-to-end manual smoke test and UX bug sweep for `/sales-generator`.
2. Tighten Step-1 validation UX and per-field helper text.
3. Unify custom segment flow into one clear path (remove redundant add/skip confusion).
4. Add category-level diagnostics in intake response for missing candidate reasons.
5. Add frontend assertions that block next-step progression when quantity fulfillment is incomplete (where candidates exist).

---

## 8) Quick Mental Model for New Contributors

- Think of the app as **three editable layers**:
  1. **Plan Structure Layer** (`sections_master.json`, package sections/subsections)
  2. **Dish Inventory Layer** (`master_registry.json`)
  3. **Event Instance Layer** (`ClientEventIntake` + per-function menu drafts)
- Sales Generator combines all three into a temporary, editable event menu and then renders HTML/PDF output.
- Admin creates and curates reusable package definitions; sales consumes or extends them.

