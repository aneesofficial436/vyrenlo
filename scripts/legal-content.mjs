/** Marketing-site legal copy — aligned with Cyberify structure; have a lawyer review for your jurisdiction. */

import { emailPlainOr } from "./site-emails.mjs";

const EMAILS = emailPlainOr();

export const legalPages = {
  "privacy": {
    "slug": "privacy",
    "title": "Privacy Policy",
    "metaTitle": "Privacy Policy | Vyrenlo",
    "metaDescription": "Read the Privacy Policy for using Vyrenlo's services and website.",
    "leadLine": "Effective Date: January 1, 2026 | Last Updated: January 1, 2026",
    "intro": [
      "At Vyrenlo, we care about your privacy and work diligently to protect your personal information. This policy covers how we gather, handle, store, and share your information. It also outlines your choices and the ways we safeguard your data. By using our website, contact tools, or services we provide under contract, you agree to the rules set in this policy.",
      "This policy does not cover actions taken by companies, people, or platforms that Vyrenlo neither owns nor controls. Websites, services, or vendors linked to our platform might follow their own privacy rules separate from ours. We encourage users to check and understand those policies on their own."
    ],
    "sections": [
      {
        "heading": "1. Introduction",
        "paragraphs": [
          "Vyrenlo operates vyrenlo.com and delivers custom AI and software engineering for businesses. We handle personal data from clients, prospective clients, partners, and website visitors. This Privacy Policy describes how we collect, use, store, and protect that data, including where laws such as the GDPR, CCPA, or other applicable regulations apply.",
          "We aim for a clear experience on our website and in client engagements while protecting privacy. Project-specific handling may also be described in a statement of work or separate agreement."
        ]
      },
      {
        "heading": "2. Collecting and Using Information",
        "paragraphs": [
          "Your personal data defines part of your online identity, and Vyrenlo values that. We collect what's necessary to run our business and improve your experience with us. This might include things like your name and email, along with general information like your browsing habits.",
          "We use your information to offer services, tailor them to your needs, send important updates, and fulfill legal or agreed-upon requirements. The details you share through our website, contact form, scheduling tools, email, or other methods are used, stored, and managed as described here and in any contract with you."
        ]
      },
      {
        "heading": "3. Types of Details We Collect",
        "paragraphs": [
          "The kind of details we gather depends on how you interact with us.",
          "We gather the data required to deliver the services we provide."
        ],
        "labeledList": [
          {
            "label": "Personal Information:",
            "body": "This includes details that help identify you, such as your name, email, phone, company, role, and billing information when relevant. We collect this when you submit our contact form, book a call, request a quote or demo, or engage us under a client agreement."
          },
          {
            "label": "Technical Information:",
            "body": "This refers to data gathered when you use our website (and client-hosted deliverables we operate for you under contract), such as IP address, browser type, device info, operating system, and access times. This helps us improve security and functionality."
          },
          {
            "label": "Usage Data:",
            "body": "We collect information about your browsing habits, such as the pages you view, the links you press, the time you stay on a page, and your overall session time. This data helps us enhance your experience on our site and understand which content you enjoy the most."
          },
          {
            "label": "Marketing Preferences:",
            "body": "We monitor what marketing content you prefer and how you interact with our communications, like opening emails or clicking their links."
          }
        ]
      },
      {
        "heading": "4. Legal Reasons to Use Data",
        "paragraphs": [
          "The purpose of collecting and using personal information changes based on our interaction with you. We deal with your data using one or more of these legal grounds.",
          "We won't use your data for automated decisions or profiling unless we inform you or ask for your consent first."
        ],
        "labeledList": [
          {
            "label": "Consent:",
            "body": "You allow us to use your data to achieve specific goals, like sending you marketing updates or adding you to our newsletter."
          },
          {
            "label": "Contractual Necessity:",
            "body": "We handle your data to fulfill promises we made in agreements, including delivering contracted services and support."
          },
          {
            "label": "Legitimate Interest:",
            "body": "Our company needs to carry out certain operations essential for running as long as they do not clash with your privacy. This includes improving services, enhancing security, or analyzing how people use our platform."
          },
          {
            "label": "Legal Obligation:",
            "body": "Sometimes, laws like tax regulations or fraud-prevention rules require us to work with your data to follow the rules."
          }
        ]
      },
      {
        "heading": "5. How We Use Your Data",
        "paragraphs": [
          "We gather your data to operate and to give you a secure and smooth experience. Here is how we make use of this information:"
        ],
        "listItems": [
          "We provide access to our platforms, software, and support services.",
          "We process transactions, complete your orders, and respond to any inquiries.",
          "We share news, offers, feature updates, and other important information with you.",
          "We personalize your experience and content based on your behavior and choices.",
          "We perform system checks, review data, and make improvements to our services.",
          "We comply with all legal rules, contracts, and regulations.",
          "We keep to the uses shared when we collected your data, unless you permit otherwise or it becomes necessary."
        ]
      },
      {
        "heading": "6. Cookies and Technologies We Use",
        "paragraphs": [
          "We use cookies, web beacons, and similar tools to make your experience on our site better, track activity, and gather helpful insights. Cookies are tiny text files saved on your device. They help us recognize returning users and understand how visitors interact with our website.",
          "These cookies either disappear once you close your browser or stay on your device until you delete them or they expire. They allow us to do things like:",
          "You can adjust your cookie preferences in your browser settings. Keep in mind though, disabling cookies might cause some parts of our site to not function as intended."
        ],
        "listItems": [
          "Keep your session running",
          "Personalize your experience on the site",
          "Analyze behavior and site traffic",
          "Remember your preferences and settings"
        ]
      },
      {
        "heading": "7. Data Sharing and Disclosure",
        "paragraphs": [
          "Vyrenlo does not sell your private information to other companies. However, in certain situations, we may share some of your data:",
          "Any organization or business that gets access to your information must protect it with strict security measures."
        ],
        "listItems": [
          "When we partner with services that help us operate the site or deliver work—such as hosting (for example Cloudflare), form delivery (for example Formspree), scheduling (for example Calendly), data storage, payment processing, or analytics.",
          "If the law requires it, like through subpoenas, law enforcement requests, or court orders.",
          "During deals like mergers, acquisitions, or sales when user data gets transferred as part of the transaction.",
          "If you give permission, we may use your data for an explained purpose."
        ]
      },
      {
        "heading": "8. How We Share Data",
        "paragraphs": [
          "As a business operating, we transfer your data between countries to ensure smooth operations. These transfers might happen via our own global offices, our data centers, or trustworthy third-party providers located outside your region.",
          "We focus on securing your data by using steps like:",
          "We make sure to comply with laws related to transferring data across borders."
        ],
        "listItems": [
          "Standard Contractual Clauses approved by regulators",
          "Agreements with our vendors through Data Protection Addendums",
          "Storing data in regions with strong privacy protections"
        ]
      },
      {
        "heading": "9. How We Protect Your Data",
        "paragraphs": [
          "Our approach to data security uses multiple layers. This includes administrative, technical, and physical safeguards. Some of these measures include:",
          "These steps help, but no system can eliminate all risks. If a breach happens, we will notify affected users and report it to the proper legal authorities as the law requires."
        ],
        "listItems": [
          "Encrypting transmitted data with SSL/TLS",
          "Using firewalls and tools to detect intrusions",
          "Granting access according to user roles",
          "Securing data centers and keeping logs of who accesses them",
          "Running audits and security tests to find weak points"
        ]
      },
      {
        "heading": "10. Data Retention",
        "paragraphs": [
          "We hold on to personal data as long as it's needed to fulfill the purposes outlined in this policy. The length of time we store data depends on its type and the reason it was gathered. For example:",
          "When we no longer need your data, we delete it or anonymize it."
        ],
        "listItems": [
          "We keep contact details to promote services until you ask us to stop.",
          "We store transaction records to follow legal and accounting regulations.",
          "We hold job application information for up to a year, unless laws require us to keep it longer."
        ]
      },
      {
        "heading": "11. Your Rights and Choices",
        "paragraphs": [
          "Privacy laws allow you to have specific rights regarding your personal information.",
          `If you want to use any of these rights, email us at ${EMAILS}. We aim to respond within 30 days.`
        ],
        "labeledList": [
          {
            "label": "Right to Access:",
            "body": "You can ask us to give you a copy of the personal information we keep about you."
          },
          {
            "label": "Right to Rectification:",
            "body": "You can tell us to correct any mistakes or include missing details in your records."
          },
          {
            "label": "Right to Erasure:",
            "body": "You can ask us to delete your data under certain conditions."
          },
          {
            "label": "Right to Restrict Processing:",
            "body": "You may request us to limit how we handle your personal information."
          },
          {
            "label": "Right to Data Portability:",
            "body": "You can request your information in a file format that computers can read."
          },
          {
            "label": "Right to Object:",
            "body": "You may choose to oppose the way we handle your data such as using it for direct advertising or legitimate interests."
          }
        ]
      },
      {
        "heading": "12. Children's Privacy",
        "paragraphs": [
          "Vyrenlo designs its services for people aged 18 and older. It does not collect personal information from children. If it becomes aware that it collected data from a child without verified permission from a parent, the company takes steps to delete the data."
        ]
      },
      {
        "heading": "13. External Links and Third-Party Websites",
        "paragraphs": [
          "The website provides links to other platforms or services not operated by Vyrenlo. The company cannot ensure how these external sites protect user privacy or handle their content. Vyrenlo recommends reviewing the privacy policies on these sites before giving out personal information."
        ]
      },
      {
        "heading": "14. Updates to This Privacy Policy",
        "paragraphs": [
          "We may update this Privacy Policy from time to time. When we do, we will revise the “Last Updated” date at the top of this page.",
          "We recommend checking this Privacy Policy to stay informed about how we protect your data."
        ]
      },
      {
        "heading": "15. How to Contact Us",
        "paragraphs": [
          "If you have any questions, concerns, or requests about this Privacy Policy or our data practices, you can reach out to our privacy contact:",
          "We handle privacy messages with care and will respond as soon as we reasonably can.",
          `Email: ${EMAILS}`
        ]
      }
    ],
    "relatedLabel": "Terms and Conditions"
  },
  "terms": {
    "slug": "terms",
    "title": "Terms and Conditions",
    "metaTitle": "Terms and Conditions | Vyrenlo",
    "metaDescription": "Read the terms and conditions for using Vyrenlo's services and website.",
    "leadLine": "Effective Date: July 31, 2025 | Last Updated: July 31, 2025",
    "intro": [],
    "sections": [
      {
        "heading": "1. Welcome to Vyrenlo",
        "paragraphs": [
          "Vyrenlo delivers AI and software engineering for businesses. Based in Pakistan, we help teams improve security, scalability, and efficiency through smart automation and tailored solutions.",
          "By using this website, you confirm that you accept the rules listed below. If you disagree, stop browsing or interacting with the platform."
        ]
      },
      {
        "heading": "2. Agreeing to These Terms by Using the Site",
        "paragraphs": [
          "When you access or use any section of this site, you agree to these Terms. If you're acting on behalf of a company or organization, you guarantee that you have the authority to agree to these Terms on its behalf.",
          "This agreement holds the same legal weight as a written contract. It covers everyone, whether you're checking out details about our services or reaching out to request a demo."
        ]
      },
      {
        "heading": "3. Changes to These Terms",
        "paragraphs": [
          "Vyrenlo may adjust these Terms whenever necessary to follow laws, adapt to technical updates, or introduce new features. As things evolve, we will show the most recent updates by changing the \"Last Updated\" date at the top.",
          "You need to check the website. We might not always tell users about changes. If you keep using the site after we update the Terms, it means you accept the new version.",
          "If you don't agree with the updates, you should stop using the site right away."
        ]
      },
      {
        "heading": "4. Your Privacy Matters",
        "paragraphs": [
          "We understand trust is essential with your personal information.",
          "Our [[PRIVACY_POLICY_LINK]] details the data we gather, why we collect it, how we use it, and how we protect it. This includes your IP address, browser information, form submissions, and anything you send through our contact or inquiry tools.",
          "We might also rely on cookies or other tech tools to enhance how users interact with our site, check how the site's doing, and make it run better.",
          `Vyrenlo does not sell or abuse your personal information. We stick to global rules on data protection, focusing on being transparent, giving users control, and ensuring consent. If you'd like your data checked or removed, reach out anytime at ${EMAILS}.`
        ]
      },
      {
        "heading": "5. What You Can Do Here",
        "paragraphs": [
          "Anyone can visit Vyrenlo's site to explore the products we offer, AI tools we feature, case studies, and our expertise. Here's what you are free to do:",
          "The content on this site is made available to provide information and not as official guidance or guaranteed service. Those commitments happen later through a formal agreement or contract."
        ],
        "listItems": [
          "Explore service types and AI applications",
          "Discover the sectors we cater to",
          "Review case studies and our work",
          "Reach out to get a quote, start a pilot, or inquire about our products",
          "Share your interest to collaborate or form partnerships"
        ]
      },
      {
        "heading": "6. Things You Are Not Allowed to Do",
        "paragraphs": [
          "To protect our systems and ensure fairness among all users, we forbid certain actions.",
          "Using our systems could lead to losing access, facing legal action, or even being reported to law enforcement."
        ],
        "labeledList": [
          {
            "label": "Breaking into or bypassing security:",
            "body": "Avoid gaining access to or tampering with our platform without permission."
          },
          {
            "label": "Replicating or reusing content:",
            "body": "Don't take, copy, or share our designs, text, product layouts, or source code without consent."
          },
          {
            "label": "Spreading malicious software:",
            "body": "Stay clear of sending viruses, bots, malware, or anything else that can cause harm."
          },
          {
            "label": "False identity or claims:",
            "body": "Do not pretend to represent Vyrenlo unless you do."
          },
          {
            "label": "Using our services to break the law:",
            "body": "Activities like fraud, spamming, harassment, or illegal handling of data are off-limits."
          }
        ]
      },
      {
        "heading": "7. We Own What We Create",
        "paragraphs": [
          "Everything on our site, like content, code, AI models, training data, dashboards, graphics, logos, and product designs, belongs to Vyrenlo or our approved partners. It is their intellectual property.",
          "You are not allowed to:",
          "The law protects these rights through copyright, trademarks, and trade secret regulations in Pakistan and abroad. Using them without permission can lead to both civil and criminal legal consequences."
        ],
        "listItems": [
          "Use our branding or logos without written permission",
          "Share or download our software or AI tools unless you have a license",
          "Take credit for content you didn't make"
        ]
      },
      {
        "heading": "8. External Links and Integrations",
        "paragraphs": [
          "The site might include connections to outside platforms, like scheduling tools, CRMs, payment gateways, or partner services. Clicking a link means you'll leave the Vyrenlo platform.",
          "Vyrenlo has no control over those third-party websites. This means it can't promise their security, reliability, or content. If you interact with or share personal data on those platforms, you take on the risk yourself, agreeing to their rules instead of ours."
        ]
      },
      {
        "heading": "9. Be Honest and Respectful",
        "paragraphs": [
          "If you're provided login credentials or demo access:",
          "We take misuse seriously. We expect everyone to show respect toward our team, tools, and other users. Vyrenlo is meant to be a platform to collaborate and innovate. It's not a place for spamming, trolling, or harassment."
        ],
        "listItems": [
          "Use your actual name and personal details.",
          "Always keep your password private.",
          "Do not share your login; only Vyrenlo-approved individuals may be granted shared access."
        ]
      },
      {
        "heading": "10. No Guarantees",
        "paragraphs": [
          "Vyrenlo runs its services on an \"as is\" and \"as available\" basis. We don't give assurances or guarantees about:",
          "Technology isn't flawless. We aim to meet high performance standards, but we can't guarantee things like uninterrupted service or perfect functionality."
        ],
        "listItems": [
          "The site staying online all the time",
          "Information being accurate or complete",
          "Zero bugs, delays, or tech issues"
        ]
      },
      {
        "heading": "11. Limited Liability",
        "paragraphs": [
          "Vyrenlo will not take responsibility, as allowed by law, for these situations:",
          "If someone finds us liable, the most we will owe is either the total you paid us in the last 12 months or PKR 150,000, whichever is smaller."
        ],
        "listItems": [
          "Loss of income or profits",
          "Data being lost or damaged",
          "Downtime or interruptions in services",
          "Errors in content or technical mistakes",
          "Actions or integrations by third parties"
        ]
      },
      {
        "heading": "12. You Agree to Look Out for Us Too",
        "paragraphs": [
          "When you use this site, you agree to protect Vyrenlo, along with its team, partners, and affiliates, from any claims, lawsuits, damages, or losses that occur because of:",
          "If your behavior causes a legal issue involving Vyrenlo, you might need to cover the costs, including paying attorney fees."
        ],
        "listItems": [
          "Your improper use of the platform",
          "Your violation of these Terms",
          "Any damage caused to others because of your actions"
        ]
      },
      {
        "heading": "13. We May Stop Access If Needed",
        "paragraphs": [
          "Vyrenlo reserves the right to block, limit, or end your access to the site or platform at any moment when you:",
          "This allows us to safeguard other users, our systems, and our reputation."
        ],
        "listItems": [
          "Break these Terms.",
          "Go against the law",
          "Interrupt or damage our services"
        ]
      },
      {
        "heading": "14. Laws That Apply",
        "paragraphs": [
          "The laws of Pakistan govern these Terms. If a legal issue comes up, the courts in Lahore, Pakistan, will handle it.",
          "This applies no matter where you are. If you visit Vyrenlo's website from outside Pakistan, you must follow your country's rules too, including laws about data, AI use, and online behavior."
        ]
      },
      {
        "heading": "15. Need Help?",
        "paragraphs": [
          "If you have questions about these Terms or need guidance on compliance reach out to our legal and compliance team:",
          `Email: ${EMAILS}`
        ]
      },
      {
        "heading": "16. Last Updated",
        "paragraphs": [
          "31 July 2025"
        ]
      }
    ],
    "relatedLabel": "Privacy Policy"
  }
};
