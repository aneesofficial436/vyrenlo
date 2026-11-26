from fpdf import FPDF

pdf = FPDF()
pdf.set_margins(20, 20, 20)
pdf.set_auto_page_break(auto=True, margin=15)
pdf.add_page()
w = pdf.epw
pdf.set_font("Helvetica", "B", 16)
pdf.cell(text="Vyrenlo AI LeadFlow")
pdf.ln(10)
pdf.set_font("Helvetica", "", 11)
pdf.multi_cell(
    w,
    6,
    "Vyrenlo case study: multi-tenant AI lead management - capture, qualify, notify, follow up, and CRM in one deployable package.",
)
pdf.ln(4)
pdf.set_font("Helvetica", "B", 12)
pdf.cell(text="At a glance")
pdf.ln(8)
pdf.set_font("Helvetica", "", 10)
for line in [
    "FastAPI + PostgreSQL + Redis; Next.js CRM; n8n orchestration; OpenAI structured qualification.",
    "Ten importable n8n workflows: capture, qualify, notify, follow-ups, inbound, summaries, and channel ingest.",
    "Multi-tenant row isolation, JWT RBAC, API-key public ingest, HMAC webhooks.",
    "Vertical templates: real_estate, generic_b2b, automation_agency.",
    "Docker Compose dev/prod, pytest + Next.js build in CI, twelve-minute sales demo.",
]:
    pdf.multi_cell(w, 5, f"- {line}")
pdf.ln(3)
pdf.set_font("Helvetica", "B", 12)
pdf.cell(text="Architecture principle")
pdf.ln(8)
pdf.set_font("Helvetica", "", 10)
pdf.multi_cell(
    w,
    5,
    "Business rules and tenant safety live in typed Python. n8n handles schedules, "
    "channel glue, and SMTP triggers - operators can change workflows without redeploying the API.",
)
pdf.ln(3)
pdf.set_font("Helvetica", "B", 12)
pdf.cell(text="Outcome")
pdf.ln(8)
pdf.set_font("Helvetica", "", 10)
pdf.multi_cell(
    w,
    5,
    "Portfolio-ready MVP (phases 1-9): demonstrable hot-lead path from web form to staff "
    "alert to timed follow-up to engaged conversation - with optional approval on outbound email.",
)
out = r"c:\Users\Convo\vyrenlo-website\assets\case-studies\vyrenlo-ai-leadflow\vyrenlo-ai-leadflow-case-study.pdf"
pdf.output(out)
print("Wrote", out)