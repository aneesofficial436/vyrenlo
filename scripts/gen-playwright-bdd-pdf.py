from fpdf import FPDF

pdf = FPDF()
pdf.set_margins(20, 20, 20)
pdf.set_auto_page_break(auto=True, margin=15)
pdf.add_page()
w = pdf.epw
pdf.set_font("Helvetica", "B", 16)
pdf.cell(text="Enterprise Playwright-BDD Regression")
pdf.ln(10)
pdf.set_font("Helvetica", "", 11)
pdf.multi_cell(
    w,
    6,
    "Vyrenlo case study: large-scale end-to-end test automation patterns "
    "(no customer names, URLs, or credentials).",
)
pdf.ln(4)
pdf.set_font("Helvetica", "B", 12)
pdf.cell(text="At a glance")
pdf.ln(8)
pdf.set_font("Helvetica", "", 10)
for line in [
    "Hundreds of Gherkin scenarios mapped to managed test cases.",
    "Split repos: scenarios/data in parent; steps and page objects in framework submodule.",
    "playwright-bdd generation, Playwright execution, Azure DevOps result publishing.",
    "PR pipelines distinguish new failures from baseline noise on the target branch.",
    "Agent skills, indexes, and AI-README navigation for triage and onboarding.",
]:
    pdf.multi_cell(w, 5, f"- {line}")
pdf.ln(3)
pdf.set_font("Helvetica", "B", 12)
pdf.cell(text="Architecture")
pdf.ln(8)
pdf.set_font("Helvetica", "", 10)
pdf.multi_cell(
    w,
    5,
    "Features flow through generateBdd to generated specs, then fixtures, hooks, steps, "
    "and ElementResolver-backed page objects. TESTCONFIG selects environment JSON; "
    "BROWSER selects the Playwright project only.",
)
pdf.ln(3)
pdf.set_font("Helvetica", "B", 12)
pdf.cell(text="Design lessons")
pdf.ln(8)
pdf.set_font("Helvetica", "", 10)
for line in [
    "Separate what to test from how to drive the UI.",
    "Never edit generated .features-gen output by hand.",
    "Pin framework versions to application release lines in CI.",
    "Classify failures: locator, step, config, or product defect.",
    "Treat scenario tags as execution and reporting contracts.",
]:
    pdf.multi_cell(w, 5, f"- {line}")
out = (
    r"c:\Users\Convo\vyrenlo-website\assets\case-studies\enterprise-playwright-bdd"
    r"\enterprise-playwright-bdd-case-study.pdf"
)
pdf.output(out)
print("Wrote", out)