/** Full-page case studies (slug → detail). Copy must match approved handoff sources. */

export const extendedCaseStudies = {
  "personal-fund-subsystem": {
    metaTitle: "Personal Fund Subsystem: a web system for institutional patient funds",
    metaDescription:
      "A .NET 8 and Blazor Server application for searching patient accounts, posting personal-fund transactions, running operational reports, and administering institutions, users, and accounting reference data.",
    heroHeadline: "Personal funds, posted and reviewed in one permissioned web system",
    heroSubhead:
      "PFS gives institutional staff a browser workspace for patient account lookup, cash posting, allowances, bulk interest, inquiry, and the reports used to balance those funds.",
    heroFacts: [
      ".NET 8, Blazor Server, ASP.NET Core API",
      "SQL Server with the existing stored-procedure data model",
      "Windows sign-in, with a traditional login path where it is enabled",
      "Screen-level permissions enforced in the menu and on the API",
    ],
    tags: ["Blazor", ".NET 8", "SQL Server", "SSRS", "Healthcare finance"],
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Personal Fund Subsystem (PFS) is an internal operations application for institutions that hold money on behalf of patients. It replaces a desktop-era workflow — the database still carries the stored procedures and report names of that earlier system — with a browser application staff can use under Windows sign-in.",
          "The product covers the daily path from finding a patient, through posting and reversing transactions, to printing or saving the statements and control reports that finance and unit staff already rely on. Maintenance screens sit beside that path so reference data, security, and the accounting codes used for the North Carolina Financial System (NCFS) can be managed in the same application.",
        ],
      },
      {
        heading: "The problem",
        paragraphs: [
          "Personal-fund work is high-stakes clerical work. A deposit, a withdrawal, a hold, or an allowance has to land on the right medical record, inside the right institution, with a balance that still makes sense afterward. Staff also need history: who posted a group of transactions, which accounts still hold money after discharge, which balances crossed a threshold, and which Social Security receipts have not been followed by a withdrawal.",
          "The previous system lived in that database. Transaction posting still calls the existing stored procedures, including the rule that the transaction timestamp is assigned by the database rather than typed by the user. Reports that used to be Crystal Reports are now SQL Server Reporting Services (SSRS) reports with the same business names. What was missing was a current web workspace: one sign-in, menus that match a person’s job, and screens that refuse an action the user is not allowed to take.",
        ],
      },
      {
        heading: "What was built",
        paragraphs: [
          "PFS is a three-project .NET 8 solution:",
        ],
        list: [
          "PFS.Client is a Blazor Server application. It renders the screens with Radzen components and calls the API with the signed-in user’s credentials.",
          "PFS.Server is an ASP.NET Core API. Controllers stay thin. Services apply permission and business checks, then repositories talk to SQL Server through Dapper.",
          "PFS.Shared holds the DTOs and entity shapes both sides use, so a transaction or account payload has one definition.",
        ],
        paragraphsAfter: [
          "A small report library, DDSPFS.ReportLibrary, asks SSRS for a page of HTML, a PDF, or an Excel file. The client opens those results in a tabbed report workspace, and users can return to reports they have saved.",
          "The API is documented with Swagger, logs through Serilog, and exposes health checks for the process and for SQL Server. A Playwright workflow in GitHub Actions runs the UI test suite on pull requests.",
        ],
      },
      {
        heading: "Patient accounts",
        paragraphs: [
          "Work is organized by institution. If no institution is selected, the operational screens say so before they offer patient or account actions.",
          "Staff with permission to view patient account information search by institution and medical record number, open an account, and add a patient when that is their job. Account screens show personal-fund balances and the amount held. Notes on an account are a separate permission from viewing the account itself. Search fields that can carry a Social Security number are masked in the client.",
        ],
      },
      {
        heading: "Transactions",
        paragraphs: [
          "A cashier posts deposits, withdrawals, and adjustments, or posts funds placed on hold. Those are two different permissions, so a user can be allowed to do one and not the other. Posting runs as a transaction group: the screen shows the current group number, can stop and start a group, and can open the group for review. Reversals are typed to the original transaction — a reversed deposit is not a reversed withdrawal — and the service rejects a transaction that was already reversed or that would break balance rules such as a negative available balance. Amount and check fields are validated before the database call. An optional auto-refill preference lets a user keep repetitive entry fields filled.",
        ],
      },
      {
        heading: "Account inquiry",
        paragraphs: [
          "Inquiry is its own screen and its own permission. For a selected account and date range, and optionally a set of transaction codes, staff see the ledger activity, personal funds, funds held, and available balance. Memos in that range require the memo permission. The same inquiry can be printed as the Personal Funds Account Inquiry Report, which is the statement used for audit and benefit verification.",
        ],
      },
      {
        heading: "Allowances and bulk interest",
        paragraphs: [
          "Allowance maintenance is a dedicated screen. Bulk interest is an institution-level account: staff review the interest position, add memos, post interest transactions, and search prior interest activity when a reversal is needed.",
        ],
      },
      {
        heading: "Reports",
        paragraphs: [
          "The report page opens on two standing tabs, Report Selection and Saved Reports. Choosing a report collects its parameters, then previews it in another tab. Preview can be HTML, PDF, or Excel. Each report is also permission-checked on the server, so the menu is not the only gate.",
          "The report catalog includes:",
        ],
        list: [
          "Personal Funds Account Inquiry Report",
          "Allowance Report",
          "On-line Cash Posting Report, grouped by institution, operator, and transaction group",
          "Discharged clients who still have a personal-funds balance",
          "Accounts eligible to be inactivated, and accounts eligible to be purged",
          "Patient balances at or above a configured threshold",
          "Daily patient balance by location, and by patient name",
          "Monthly accounts-receivable transaction statistics, for balancing against NCFS and bank totals",
          "Security listing of who can access an institution and which permissions they hold",
          "Social Security receipts without a later withdrawal",
        ],
      },
      {
        heading: "Administration",
        paragraphs: [
          "A second menu group covers reference data: institutions (including the NCFS company number and accounting data tied to each institution), purchase types, transaction categories, transaction codes, and threshold amounts. User and role management assigns those permissions. NCFS accounting data is maintained in its own screen, and database scripts in the project cover the chart-of-accounts mapping and the general-ledger journal-voucher interface used to send activity onward.",
        ],
      },
      {
        heading: "Access control",
        paragraphs: [
          "Sign-in follows the environment. On IIS, the host uses Windows authentication. Negotiate is used when the app is not running under IIS. A traditional username-and-password page is available only when that mode is turned on. Development can run a test identity so the product can be exercised without a domain.",
          "After sign-in, the server resolves the Windows identity to a PFS user, checks Active Directory group membership where that is required, and loads the permission set. The home page greets the user by name. If they have no feature permissions yet, it says so and points them to an administrator instead of showing an empty menu.",
          "Permissions are numbered business rules, not a single admin flag. Examples from the product:",
        ],
        list: [
          "View and search patient account information",
          "View account memos",
          "View the bulk interest account",
          "View account inquiry",
          "Post deposits, withdrawals, and adjustments",
          "Post funds on hold",
          "Modify allowances",
          "Run reports",
          "Maintain institutions, transaction codes, categories, purchase types, thresholds, NCFS data, and users",
        ],
        paragraphsAfter: [
          "The Blazor menu hides items the user cannot open. Each page checks again and shows a plain access-denied message naming the permission that is missing. The API repeats the check and returns 403 when the caller does not have it. Role policies separate a normal user, an administrator, and a developer claim. Session idle timeout is configurable, the client keeps the session alive while someone is working, and a signed-out page explains why access stopped. User deactivation is a first-class message: the person is told to contact the Personal Funds security officer.",
          "Outside development, the API refuses to start unless SQL Server is using integrated security. Database passwords are not accepted from configuration in those environments.",
        ],
      },
      {
        heading: "Architecture",
        pre: `Browser
  └─ Blazor Server (Radzen UI, permission-aware menu)
       └─ HTTPS API
            ├─ Authentication (Negotiate / IIS Windows auth, or traditional login)
            ├─ Permission and role checks
            ├─ Services (transactions, inquiry, patients, reports, users)
            ├─ Dapper repositories
            └─ SQL Server stored procedures
                 └─ SSRS for HTML, PDF, and Excel`,
        paragraphsAfter: [
          "Shared projects keep the client and server from inventing parallel models. Audit logging records sensitive actions. A model-generator utility in the solution can regenerate entity classes from the database when the legacy schema is the source of a change. Health checks and structured logs are there for the people who run the site under IIS.",
        ],
      },
      {
        heading: "Why this shape",
        paragraphs: [
          "The accounting rules were already encoded in stored procedures and report definitions. Rewriting them inside the web app would have created a second ledger. PFS keeps posting, reversal, and balance rules in the database, and puts the new work where a browser application can do it well: identity, permissions, validation messages, institution context, multi-step transaction groups, and a tabbed report viewer.",
          "That split is what makes the system adoptable. Staff still produce the cash-posting report, the allowance listing, and the discharged-balance report they use to balance the day. They do it from a menu that only shows their job, against an API that will refuse the same action if the menu is bypassed.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "PFS is a working operations system, not a prototype screen. It covers patient lookup and account maintenance, grouped cash posting and typed reversals, account inquiry, allowances, bulk interest, a twelve-report SSRS catalog with saved reports, and the maintenance screens for institutions, codes, thresholds, users, and NCFS accounting data. Access is enforced per screen on both the client and the server, and non-development deployments are tied to Windows authentication and integrated database security.",
        ],
      },
    ],
    techTable: [
      ["Runtime", ".NET 8"],
      ["UI", "Blazor Server, Radzen Blazor"],
      ["API", "ASP.NET Core controllers, Swagger"],
      ["Data", "SQL Server, Dapper, existing stored procedures"],
      ["Reports", "SSRS, rendered as HTML, PDF, and Excel"],
      ["Sign-in", "IIS Windows authentication, Negotiate, optional traditional login"],
      ["Directory", "Active Directory group checks"],
      ["Logging", "Serilog (console and file)"],
      ["Operations", "Health checks, IIS hosting, integrated security outside development"],
      ["Tests", "Playwright, run in GitHub Actions"],
    ],
  },
};
