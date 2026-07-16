"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";

type ProjectTag =
  | "AI"
  | "FinTech"
  | "Blockchain"
  | "Web3"
  | "Enterprise"
  | "RWA"
  | "NFT"
  | "DeFi";

type Status = "idle" | "loading" | "success";

const navItems = [
  ["Home", "#home"],
  ["Solutions", "#solutions"],
  ["How It Works", "#how-it-works"],
  ["Commercial Terms", "#commercial-terms"],
  ["Portfolio", "#portfolio"],
  ["Technology", "#technology"],
  ["Contact", "#contact"],
];

const heroHighlights = [
  "Pay Solution",
  "Shopping Mall Solution",
  "Custom Development",
];

const metrics = [
  ["128+", "Investment-grade builds reviewed"],
  ["43", "Active portfolio-grade systems"],
  ["28", "Exits and launches supported"],
  ["12+ yrs", "Operator development experience"],
];

const payFeatures = [
  "Merchant payment processing",
  "Customer payment interface",
  "Transaction monitoring",
  "Settlement and payment records",
  "Admin dashboard",
  "API integration",
  "USDT payment support",
  "User and merchant account management",
  "Custom reporting",
  "Role-based access control",
];

const mallFeatures = [
  "Product and category management",
  "Shopping cart and checkout",
  "Customer account system",
  "Order management",
  "Merchant or vendor management",
  "Payment integration",
  "Promotion and coupon management",
  "Sales analytics",
  "Mobile-responsive storefront",
  "Custom modules and workflows",
];

const processSteps = [
  {
    title: "Requirement Confirmation",
    body: "Confirm business requirements, workflows, API needs, and system scope.",
  },
  {
    title: "Custom Development Deposit",
    body: "The client deposits the agreed custom development amount in USDT to the designated wallet.",
  },
  {
    title: "Development Starts",
    body: "Development begins after payment confirmation and proceeds alongside the Pay Solution and Shopping Mall Solution setup.",
  },
  {
    title: "Delivery and Testing",
    body: "The custom function is developed, integrated, tested, and prepared for delivery within approximately two weeks.",
  },
];

const commercialTerms = [
  {
    label: "Custom Function Development Deposit",
    amount: "KRW 5,000,000",
    usd: "Approximately USD 3,340",
    payment: "USDT to [Designated USDT Wallet]",
    details:
      "The final USDT amount must be calculated using the agreed KRW/USD or KRW/USDT exchange rate at the time the payment invoice is issued.",
    timing:
      "The Pay Solution, Shopping Mall Solution, and approved custom development work may proceed concurrently after payment and project confirmation.",
  },
  {
    label: "Monthly Deposit or Service Retainer",
    amount: "KRW 1,200,000 per month",
    usd: "Approximately USD 802 per month",
    payment: "USDT to [Designated USDT Wallet]",
    details:
      "Monthly payments begin from the officially agreed service commencement or company establishment date.",
    timing: "Service Commencement Date: [Insert Date]",
  },
  {
    label: "Transaction Fee",
    amount: "3%",
    usd: "Final amount confirmed at payment",
    payment: "Applied to eligible transactions",
    details:
      "A 3% service fee is applied to transactions processed through the solution, subject to the final agreement, transaction type, settlement method, and applicable taxes.",
    timing: "Final calculation basis will be defined in the agreement.",
  },
];

const timeline = [
  ["Day 1-2", "Project kickoff and requirement confirmation"],
  ["Day 2-4", "System configuration and technical planning"],
  ["Day 3-12", "Custom function development and platform integration"],
  ["Day 10-13", "Testing, revisions, and client review"],
  ["Day 14", "Target delivery of the approved custom function"],
];

const filters = [
  "All",
  "AI",
  "FinTech",
  "Blockchain",
  "Web3",
  "Enterprise",
  "RWA",
  "NFT",
  "DeFi",
] as const;

const projects: Array<{
  name: string;
  website: string;
  screenshot: string;
  screenshotAlt: string;
  period: string;
  category: string;
  type: string;
  tags: ProjectTag[];
}> = [
  {
    name: "VAISEN Mainnet",
    website: "https://vaisen.io",
    screenshot: "/portfolio-screenshots/vaisen-mainnet.png",
    screenshotAlt: "Screenshot of the VAISEN Mainnet website",
    period: "Approximately 12 months",
    category: "EVM Blockchain Mainnet",
    type: "Blockchain Infrastructure",
    tags: ["Blockchain"],
  },
  {
    name: "ILOVEKOREA.AI",
    website: "https://ilovekorea.ai",
    screenshot: "/portfolio-screenshots/ilovekorea-ai.png",
    screenshotAlt: "Screenshot of the ILOVEKOREA.AI website",
    period: "Approximately 4 months",
    category: "AI Community Platform",
    type: "AI + Web Platform",
    tags: ["AI"],
  },
  {
    name: "Lost Tesla Art NFT",
    website: "https://nft.lar.llol",
    screenshot: "/portfolio-screenshots/lost-tesla-art-nft.svg",
    screenshotAlt: "Preview card for Lost Tesla Art NFT",
    period: "Approximately 2 months",
    category: "NFT Marketplace",
    type: "Web3",
    tags: ["NFT", "Web3"],
  },
  {
    name: "BUYZONE Protocol",
    website: "https://buyzone.io",
    screenshot: "/portfolio-screenshots/buyzone-protocol.png",
    screenshotAlt: "Screenshot of the BUYZONE Protocol website",
    period: "Approximately 5 months",
    category: "Decentralized Swap Protocol / DEX",
    type: "Web3",
    tags: ["DeFi", "Web3"],
  },
  {
    name: "AutoBlog",
    website: "https://autoblog.agency",
    screenshot: "/portfolio-screenshots/autoblog.png",
    screenshotAlt: "Screenshot of the AutoBlog website",
    period: "Approximately 2 months",
    category: "AI Auto-Blogging SaaS",
    type: "Web2 + AI",
    tags: ["AI"],
  },
  {
    name: "SimplePayX ERP",
    website: "https://simplepayx.com",
    screenshot: "/portfolio-screenshots/simplepayx-erp.svg",
    screenshotAlt: "Preview card for SimplePayX ERP",
    period: "Approximately 4 months",
    category: "ERP / Intranet",
    type: "Enterprise Solution",
    tags: ["Enterprise"],
  },
  {
    name: "Oracle Predict",
    website: "https://oraclepredic.info",
    screenshot: "/portfolio-screenshots/oracle-predict.png",
    screenshotAlt: "Screenshot of the Oracle Predict website",
    period: "Approximately 3 months",
    category: "Prediction Market",
    type: "Web3",
    tags: ["Web3", "DeFi"],
  },
  {
    name: "RealSun Platform",
    website: "https://realsun.info",
    screenshot: "/portfolio-screenshots/realsun-platform.png",
    screenshotAlt: "Screenshot of the RealSun Platform website",
    period: "Approximately 6 months",
    category: "RWA Platform",
    type: "Web3",
    tags: ["RWA", "Web3"],
  },
  {
    name: "RealSun Wallet",
    website: "https://wallet.realsun.info",
    screenshot: "/portfolio-screenshots/realsun-wallet.png",
    screenshotAlt: "Screenshot of the RealSun Wallet website",
    period: "Approximately 2 months",
    category: "Blockchain Wallet",
    type: "Web3",
    tags: ["Blockchain", "Web3"],
  },
  {
    name: "SMFI",
    website: "https://smfi.io",
    screenshot: "/portfolio-screenshots/smfi.png",
    screenshotAlt: "Screenshot of the SMFI website",
    period: "Approximately 6 months",
    category: "Music RWA / SocialFi",
    type: "Web3",
    tags: ["RWA", "Web3"],
  },
  {
    name: "Mission Hunter",
    website: "https://missionhunter.pro",
    screenshot: "/portfolio-screenshots/mission-hunter.svg",
    screenshotAlt: "Preview card for Mission Hunter",
    period: "Approximately 3 months",
    category: "Location-Based NFT Marketing",
    type: "Web3",
    tags: ["NFT", "Web3"],
  },
  {
    name: "HUB Membership",
    website: "https://hubmembership.info",
    screenshot: "/portfolio-screenshots/hub-membership.svg",
    screenshotAlt: "Preview card for HUB Membership",
    period: "Approximately 3 months",
    category: "Crypto Payment Platform",
    type: "FinTech",
    tags: ["FinTech"],
  },
];

const capabilities = [
  ["Blockchain Infrastructure", "VAISEN Mainnet"],
  ["AI Platforms", "ILOVEKOREA.AI and AutoBlog"],
  ["DeFi and DEX", "BUYZONE Protocol"],
  ["RWA Platforms", "RealSun and SMFI"],
  ["NFT Platforms", "Lost Tesla Art NFT and Mission Hunter"],
  ["Prediction Markets", "Oracle Predict"],
  ["Enterprise Solutions", "SimplePayX ERP"],
  ["FinTech and Payments", "HUB Membership and NanoCapital Pay Solution"],
];

const keywords = [
  "Payment APIs",
  "Merchant dashboards",
  "E-commerce systems",
  "Blockchain wallets",
  "Smart contracts",
  "EVM infrastructure",
  "AI integration",
  "ERP systems",
  "Admin dashboards",
  "API development",
  "Database architecture",
  "Cloud deployment",
  "Security testing",
  "Responsive web applications",
];

const trustCards = [
  [
    "Proven Portfolio",
    "Experience delivering projects across AI, FinTech, blockchain, enterprise systems, RWA, NFT, and decentralized platforms.",
  ],
  [
    "Faster Market Entry",
    "Use an existing Pay Solution and Shopping Mall Solution instead of building every component from the beginning.",
  ],
  [
    "Flexible Customization",
    "Add custom functions based on business requirements, internal processes, payment flows, and customer journeys.",
  ],
  [
    "Transparent Project Structure",
    "Clear development scope, payment milestones, delivery timeline, monthly service terms, and transaction fees.",
  ],
];

const securityItems = [
  "Secure wallet address verification",
  "Payment confirmation records",
  "Role-based administrator access",
  "Transaction history",
  "API authentication",
  "Data protection",
  "System activity logging",
  "Testing before production deployment",
  "Client approval before launch",
  "Compliance review based on the operating jurisdiction",
];

const faqs = [
  [
    "What is included in the Pay Solution?",
    "The Pay Solution includes the core payment interface, transaction management, administration tools, reporting, and agreed integration functions. The final scope will be listed in the project agreement.",
  ],
  [
    "What is included in the Shopping Mall Solution?",
    "The solution can include product management, customer accounts, cart, checkout, orders, promotions, merchant functions, payment integration, and an administration dashboard.",
  ],
  [
    "How long does custom development take?",
    "A custom function within the agreed scope is targeted for completion in approximately two weeks after requirements and payment confirmation.",
  ],
  [
    "How is the KRW 5,000,000 amount converted to USDT?",
    "The final USDT amount is calculated using the exchange-rate source and reference time stated in the invoice or project agreement.",
  ],
  [
    "What is the monthly payment?",
    "The commercial structure includes a monthly payment equivalent to KRW 1,200,000, paid in USDT to the designated wallet, beginning from the agreed service commencement date.",
  ],
  [
    "How is the 3% fee calculated?",
    "The 3% fee is applied to eligible transactions processed through the solution. The exact calculation basis, settlement cycle, refund treatment, taxes, and excluded transactions will be defined in the final agreement.",
  ],
  [
    "Can additional features be requested?",
    "Yes. New features can be quoted separately based on complexity, required integrations, testing requirements, and delivery schedule.",
  ],
];

const requiredSolutions = [
  "Pay Solution",
  "Shopping Mall Solution",
  "Both Solutions",
  "Custom Development",
];

const diligenceRows = [
  ["Payment rails", "Ready", "API + merchant workflow", "Verified"],
  ["Commerce engine", "Ready", "Catalog, cart, order stack", "Verified"],
  ["Custom functions", "Scoped", "Two-week target window", "In review"],
  ["USDT settlement", "Available", "Project payment only", "Controlled"],
  ["Compliance posture", "Jurisdictional", "Reviewed before launch", "Required"],
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NanoCapital",
  url: "https://nanocapital-payment-commerce.anantasuk.chatgpt.site",
  description:
    "NanoCapital provides payment, commerce, blockchain, AI, Web2, Web3, FinTech, ERP, NFT, RWA, DEX, and enterprise software development solutions.",
  sameAs: projects.map((project) => project.website),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Business development",
    availableLanguage: ["English", "Korean"],
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "NanoCapital Pay Solution",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    priceCurrency: "KRW",
    price: "5000000",
    description:
      "Custom function development deposit. Final amount confirmed at payment.",
  },
  featureList: [...payFeatures, ...mallFeatures, ...keywords],
};

function SectionHeading({
  kicker,
  title,
  body,
  align = "center",
}: {
  kicker: string;
  title: string;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-heading ${align === "left" ? "align-left" : ""}`}>
      <span>{kicker}</span>
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  );
}

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="feature-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter((project) => project.tags.includes(activeFilter));
  }, [activeFilter]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextErrors: Record<string, string> = {};
    const requiredFields = [
      "name",
      "company",
      "email",
      "country",
      "requiredSolution",
      "requirements",
    ];

    requiredFields.forEach((field) => {
      if (!String(formData.get(field) ?? "").trim()) {
        nextErrors[field] = `Please enter ${field === "requiredSolution" ? "a required solution" : field}.`;
      }
    });

    const email = String(formData.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Email needs a valid format, for example name@company.com.";
    }

    if (formData.get("amountAcknowledgement") !== "on") {
      nextErrors.amountAcknowledgement =
        "Please confirm that final amounts are set by the official agreement or invoice.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("loading");
    window.setTimeout(() => {
      setStatus("success");
      form.reset();
    }, 850);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, softwareSchema]),
        }}
      />
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="site-shell">
        <header className="nav-wrap">
          <a className="brand" href="#home" aria-label="NanoCapital home">
            <span className="brand-mark">N</span>
            <span>NanoCapital</span>
          </a>
          <nav aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <a key={label} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <div className="language-switch" aria-label="Language selector">
              <button type="button" aria-pressed="true">
                EN
              </button>
              <span aria-hidden="true">/</span>
              <button type="button" aria-pressed="false">
                KR
              </button>
            </div>
            <a className="btn secondary" href="#contact">
              Request a Demo
            </a>
            <a className="btn primary" href="#contact">
              Start a Project
            </a>
          </div>
        </header>

        <main id="main-content">
          <section className="hero" id="home">
            <div className="hero-copy">
              <p className="kicker">Operating system for payment and commerce diligence</p>
              <h1>
                Payment and Commerce Solutions
                <span>Built for Operators</span>
              </h1>
              <p className="lead">
                Launch payment, commerce, and custom platform infrastructure
                with NanoCapital&apos;s proven development team.
              </p>
              <div className="hero-actions">
                <a className="btn primary large" href="#contact">
                  Request Demo
                </a>
                <a className="btn secondary large" href="#portfolio">
                  View Portfolio
                </a>
              </div>
              <div className="hero-highlights" aria-label="Solution highlights">
                {heroHighlights.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className="terminal-panel" aria-label="NanoCapital diligence terminal">
              <div className="terminal-topline">
                <span>Diligence Terminal</span>
                <strong>All systems operational</strong>
              </div>
              <div className="terminal-metrics">
                <div>
                  <span>Pipeline value</span>
                  <strong>KRW 284.7M</strong>
                </div>
                <div>
                  <span>Verification rate</span>
                  <strong>99.2%</strong>
                </div>
              </div>
              <div className="terminal-grid" role="table" aria-label="Solution readiness">
                <div role="row" className="terminal-row terminal-head">
                  <span role="columnheader">Workstream</span>
                  <span role="columnheader">Status</span>
                  <span role="columnheader">Evidence</span>
                  <span role="columnheader">Signal</span>
                </div>
                {diligenceRows.map(([workstream, rowStatus, evidence, signal]) => (
                  <div role="row" className="terminal-row" key={workstream}>
                    <span role="cell">{workstream}</span>
                    <span role="cell">{rowStatus}</span>
                    <span role="cell">{evidence}</span>
                    <strong role="cell">{signal}</strong>
                  </div>
                ))}
              </div>
              <div className="terminal-footer">
                <span>API integration flow</span>
                <div className="flow-bars" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <strong>Final amount confirmed at payment</strong>
              </div>
            </div>

            <div className="metric-strip" aria-label="NanoCapital operating metrics">
              {metrics.map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="section paper-section" id="solutions">
            <SectionHeading
              kicker="Solution overview"
              title="Two Core Solutions. One Flexible Ecosystem."
              body="NanoCapital packages payment and commerce infrastructure as reusable operating capability, then adapts it around each client's workflow, settlement method, and market launch plan."
            />
            <div className="solution-grid">
              <article className="solution-card">
                <span className="card-index">01</span>
                <h3>NanoCapital Pay Solution</h3>
                <p>
                  A customizable payment infrastructure designed for merchants,
                  platforms, and digital businesses.
                </p>
                <FeatureList items={payFeatures} />
              </article>
              <article className="solution-card dark-card">
                <span className="card-index">02</span>
                <h3>Shopping Mall Solution</h3>
                <p>
                  A ready-to-customize e-commerce and shopping mall platform for
                  businesses that want to launch quickly while maintaining
                  control over their brand and operations.
                </p>
                <FeatureList items={mallFeatures} />
              </article>
            </div>
          </section>

          <section className="section split-section" id="how-it-works">
            <SectionHeading
              align="left"
              kicker="Custom development"
              title="Custom Functions Built Around Your Business"
              body="Additional functionality can be developed around operational, payment, commerce, or platform requirements."
            />
            <div className="process-grid">
              {processSteps.map((step, index) => (
                <article className="process-card" key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
            <div className="time-callout">
              <span>Estimated Custom Function Development Period</span>
              <strong>Approximately 2 Weeks</strong>
              <p>
                The delivery schedule begins after the requirements, scope, and
                payment have been confirmed. Major changes or additional
                functions may require a revised timeline.
              </p>
            </div>
          </section>

          <section className="section paper-section" id="commercial-terms">
            <SectionHeading
              kicker="Commercial terms"
              title="Transparent Commercial Structure"
              body="All USD and USDT amounts displayed on the website are estimates. The final payment amount will be confirmed using the agreed exchange rate when the invoice or payment request is issued."
            />
            <div className="exchange-reference">
              <span>Admin-editable exchange-rate reference</span>
              <strong>[Insert agreed exchange-rate source and timestamp]</strong>
            </div>
            <div className="terms-grid">
              {commercialTerms.map((term) => (
                <article className="term-card" key={term.label}>
                  <p>{term.label}</p>
                  <h3>{term.amount}</h3>
                  <strong>{term.usd}</strong>
                  <dl>
                    <div>
                      <dt>Payment method</dt>
                      <dd>{term.payment}</dd>
                    </div>
                    <div>
                      <dt>Description</dt>
                      <dd>{term.details}</dd>
                    </div>
                    <div>
                      <dt>Development timing</dt>
                      <dd>{term.timing}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
            <p className="compliance-note">
              USDT transfer is presented only as a project payment, development
              deposit, service retainer, or transaction settlement method. It is
              not described as an investment, and this website does not promise
              returns, interest, profit, or appreciation from USDT.
            </p>
          </section>

          <section className="section dark-section">
            <SectionHeading kicker="Project timeline" title="From Agreement to Launch" />
            <div className="timeline">
              {timeline.map(([day, item]) => (
                <article className="timeline-item" key={day}>
                  <span>{day}</span>
                  <p>{item}</p>
                </article>
              ))}
            </div>
            <p className="timeline-disclaimer">
              The two-week timeline applies to the agreed custom function scope.
              Additional integrations, external approvals, compliance reviews,
              or scope changes may affect delivery time.
            </p>
          </section>

          <section className="section paper-section" id="portfolio">
            <div className="portfolio-head">
              <SectionHeading
                align="left"
                kicker="Development portfolio"
                title="Proven Experience Across AI, FinTech, Enterprise, and Web3"
                body="Our development experience covers blockchain infrastructure, artificial intelligence, decentralized finance, payment platforms, enterprise systems, NFT platforms, RWA, SocialFi, and prediction markets."
              />
              <div className="filter-row" aria-label="Portfolio filters">
                {filters.map((filter) => (
                  <button
                    className={filter === activeFilter ? "active" : ""}
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    type="button"
                    aria-pressed={filter === activeFilter}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <div className="portfolio-grid">
              {filteredProjects.map((project) => (
                <article className="portfolio-card" key={project.name}>
                  <div className="portfolio-shot">
                    <Image
                      alt={project.screenshotAlt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 760px) 100vw, (max-width: 1180px) 50vw, 33vw"
                      src={project.screenshot}
                      unoptimized
                    />
                  </div>
                  <span>{project.type}</span>
                  <h3>{project.name}</h3>
                  <dl>
                    <div>
                      <dt>Development period</dt>
                      <dd>{project.period}</dd>
                    </div>
                    <div>
                      <dt>Category</dt>
                      <dd>{project.category}</dd>
                    </div>
                    <div>
                      <dt>Website</dt>
                      <dd>{project.website.replace("https://", "")}</dd>
                    </div>
                  </dl>
                  <a href={project.website} rel="noreferrer" target="_blank">
                    View Project
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section className="section split-section" id="technology">
            <SectionHeading
              align="left"
              kicker="Technology expertise"
              title="Technology Capabilities"
            />
            <div className="capability-grid">
              {capabilities.map(([title, body]) => (
                <article className="capability-card" key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            <div className="keyword-cloud" aria-label="Technical keywords">
              {keywords.map((keyword) => (
                <span key={keyword}>{keyword}</span>
              ))}
            </div>
          </section>

          <section className="section paper-section">
            <SectionHeading kicker="Why NanoCapital" title="Why Work With NanoCapital" />
            <div className="trust-grid">
              {trustCards.map(([title, body]) => (
                <article className="trust-card" key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section dark-section">
            <SectionHeading
              kicker="Security and compliance"
              title="Built for Responsible Business Operations"
            />
            <div className="security-grid">
              {securityItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <p className="timeline-disclaimer">
              NanoCapital provides technology and software solutions.
              Availability of payment, wallet, blockchain, token, or settlement
              functions may depend on the laws, licensing requirements, and
              regulatory rules of the client&apos;s operating jurisdiction.
            </p>
          </section>

          <section className="section paper-section">
            <SectionHeading kicker="FAQ" title="Common Questions" />
            <div className="faq-list">
              {faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}</summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="section contact-section" id="contact">
            <div className="contact-copy">
              <span className="kicker">Final CTA</span>
              <h2>Ready to Launch Your Payment and Commerce Platform?</h2>
              <p>
                Tell us about your business model, required payment flow,
                shopping mall functions, and integration needs. Our team will
                prepare a suitable implementation plan.
              </p>
              <div className="hero-actions">
                <a className="btn primary large" href="#contact-form">
                  Request a Proposal
                </a>
                <a className="btn secondary large" href="#contact-form">
                  Schedule a Consultation
                </a>
              </div>
            </div>
            <form
              className="contact-form"
              id="contact-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="form-grid">
                <label>
                  Name
                  <input
                    name="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name ? <small id="name-error">{errors.name}</small> : null}
                </label>
                <label>
                  Company
                  <input
                    name="company"
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={errors.company ? "company-error" : undefined}
                  />
                  {errors.company ? (
                    <small id="company-error">{errors.company}</small>
                  ) : null}
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email ? <small id="email-error">{errors.email}</small> : null}
                </label>
                <label>
                  Phone or Messenger
                  <input name="phone" />
                </label>
                <label>
                  Country
                  <input
                    name="country"
                    aria-invalid={Boolean(errors.country)}
                    aria-describedby={errors.country ? "country-error" : undefined}
                  />
                  {errors.country ? (
                    <small id="country-error">{errors.country}</small>
                  ) : null}
                </label>
                <label>
                  Expected launch date
                  <input name="launchDate" type="date" />
                </label>
              </div>
              <label>
                Required solution
                <select
                  name="requiredSolution"
                  aria-invalid={Boolean(errors.requiredSolution)}
                  aria-describedby={
                    errors.requiredSolution ? "required-solution-error" : undefined
                  }
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a solution
                  </option>
                  {requiredSolutions.map((solution) => (
                    <option value={solution} key={solution}>
                      {solution}
                    </option>
                  ))}
                </select>
                {errors.requiredSolution ? (
                  <small id="required-solution-error">
                    {errors.requiredSolution}
                  </small>
                ) : null}
              </label>
              <label>
                Project requirements
                <textarea
                  name="requirements"
                  rows={5}
                  aria-invalid={Boolean(errors.requirements)}
                  aria-describedby={
                    errors.requirements ? "requirements-error" : undefined
                  }
                />
                {errors.requirements ? (
                  <small id="requirements-error">{errors.requirements}</small>
                ) : null}
              </label>
              <label className="checkbox-label">
                <input name="amountAcknowledgement" type="checkbox" />
                <span>
                  I understand that displayed USD and USDT amounts are estimates
                  and that the final amount will be confirmed in the official
                  agreement or invoice.
                </span>
              </label>
              {errors.amountAcknowledgement ? (
                <small className="form-error">{errors.amountAcknowledgement}</small>
              ) : null}
              <button className="btn primary large" disabled={status === "loading"} type="submit">
                {status === "loading" ? "Preparing request..." : "Send Project Request"}
              </button>
              {status === "success" ? (
                <p className="success-message" role="status">
                  Request prepared. NanoCapital&apos;s team can now review the
                  project scope and commercial context.
                </p>
              ) : null}
            </form>
          </section>
        </main>

        <footer className="footer">
          <div>
            <a className="brand" href="#home" aria-label="NanoCapital home">
              <span className="brand-mark">N</span>
              <span>NanoCapital</span>
            </a>
            <p>
              Pay Solution, Shopping Mall Solution, Custom Development, and
              enterprise technology delivery.
            </p>
          </div>
          <div className="footer-links">
            <a href="#solutions">Pay Solution</a>
            <a href="#solutions">Shopping Mall Solution</a>
            <a href="#how-it-works">Custom Development</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Privacy Policy</a>
            <a href="#contact">Terms of Service</a>
            <a href="#contact">Risk and Compliance Notice</a>
            <a href="#contact">Contact Information</a>
          </div>
        </footer>
      </div>
    </>
  );
}
