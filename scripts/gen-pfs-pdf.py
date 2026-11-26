from fpdf import FPDF

pdf = FPDF()
pdf.set_margins(20, 20, 20)
pdf.set_auto_page_break(auto=True, margin=15)
pdf.add_page()
w = pdf.epw
pdf.set_font("Helvetica", "B", 16)
pdf.cell(text="Personal Fund Subsystem (PFS)")
pdf.ln(10)
pdf.set_font("Helvetica", "", 11)
pdf.multi_cell(w, 6, "Vyrenlo case study: healthcare operations software for institutional patient funds.")
pdf.ln(4)
pdf.set_font("Helvetica", "B", 12)
pdf.cell(text="At a glance")
pdf.ln(8)
pdf.set_font("Helvetica", "", 10)
for line in [
    "Multi-institution web app for patient personal-fund accounts.",
    "Lookup, cash posting, inquiry, allowances, bulk interest, and SSRS reports.",
    "Blazor Server, .NET 8 API, SQL Server stored procedures, Windows/AD sign-in.",
    "Screen-level permissions on the menu and API.",
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
    "Blazor Server in the browser calls an ASP.NET Core API. Auth and permissions gate each "
    "request. Services use Dapper against SQL Server stored procedures; SSRS renders reports.",
)
pdf.ln(3)
pdf.set_font("Helvetica", "B", 12)
pdf.cell(text="Outcome")
pdf.ln(8)
pdf.set_font("Helvetica", "", 10)
pdf.multi_cell(
    w,
    5,
    "Production system: patient lookup, grouped transactions, typed reversals, inquiry, "
    "twelve-report catalog, and NCFS reference data maintenance.",
)
out = r"c:\Users\Convo\vyrenlo-website\assets\case-studies\personal-fund-subsystem\pfs-case-study.pdf"
pdf.output(out)
print("Wrote", out)