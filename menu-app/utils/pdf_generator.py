"""PDF generation: Jinja2 → HTML → WeasyPrint PDF (with HTML fallback)."""
import os
import base64
from datetime import datetime
from jinja2 import Environment, FileSystemLoader, select_autoescape

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATE_DIR = os.path.join(BASE_DIR, "pdf_templates")
ASSETS_DIR = os.path.join(BASE_DIR, "assets")

COMPANY = {
    "company_name": "The Catering Inc.",
    "company_tagline": "Crafting Experiences, One Bite at a Time",
    "company_phone": "+91 98765 43210",
    "company_email": "events@thecateringinc.com",
    "company_website": "www.thecateringinc.com",
}

_env = Environment(
    loader=FileSystemLoader(TEMPLATE_DIR),
    autoescape=select_autoescape(["html", "xml"]),
)


def _logo_b64():
    path = os.path.join(ASSETS_DIR, "logo.png")
    if not os.path.exists(path):
        return ""
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode()


def render_html(template_name: str, ctx: dict) -> str:
    template = _env.get_template(f"{template_name}.html")
    full_ctx = {
        **COMPANY,
        "logo_base64": _logo_b64(),
        "generated_date": datetime.now().strftime("%d %B %Y"),
        **ctx,
    }
    return template.render(**full_ctx)


def html_to_pdf_bytes(html: str):
    """Return PDF bytes via WeasyPrint, or None if unavailable."""
    try:
        from weasyprint import HTML
        return HTML(string=html, base_url=BASE_DIR).write_pdf()
    except Exception as e:
        print(f"[pdf_generator] WeasyPrint failed: {e}")
        return None


def generate(template_name: str, ctx: dict):
    """Returns (html_str, pdf_bytes_or_None)."""
    html = render_html(template_name, ctx)
    pdf = html_to_pdf_bytes(html)
    return html, pdf
