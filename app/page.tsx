"use client";

import { FormEvent, useMemo, useState } from "react";

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
  "Two-Week Custom Function Delivery",
  "Enterprise and Blockchain Integration",
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
];

const projects = [
  {
    name: "VAISEN Mainnet",
    website: "https://vaisen.io",
    period: "Approximately 12 months",
    category: "EVM Blockchain Mainnet",
    type: "Blockchain Infrastructure",
    tags: ["Blockchain"],
  },
  {
    name: "ILOVEKOREA.AI",
    website: "https://ilovekorea.ai",
    period: "Approximately 4 months",
    category: "AI Community Platform",
    type: "AI + Web Platform",
    tags: ["AI"],
  },
  {
    name: "Lost Tesla Art NFT",
    website: "https://nft.lar.llol",
    period: "Approximately 2 months",
    category: "NFT Marketplace",
    type: "Web3",
    tags: ["NFT", "Web3"],
  },
  {
    name: "BUYZONE Protocol",
    website: "https://buyzone.io",
    period: "Approximately 5 months",
    category: "Decentralized Swap Protocol / DEX",
    type: "Web3",
    tags: ["DeFi", "Web3"],
  },
  {
    name: "AutoBlog",
    website: "https://autoblog.agency",
    period: "Approximately 2 months",
    category: "AI Auto-Blogging SaaS",
    type: "Web2 + AI",
    tags: ["AI"],
  },
  {
    name: "SimplePayX ERP",
    website: "https://simplepayx.com",
    period: "Approximately 4 months",
    category: "ERP / Intranet",
    type: "Enterprise Solution",
    tags: ["Enterprise"],
  },
  {
    name: "Oracle Predict",
    website: "https://oraclepredic.info",
    period: "Approximately 3 months",
    category: "Prediction Market",
    type: "Web3",
    tags: ["Web3", "DeFi"],
  },
  {
    name: "RealSun Platform",
    website: "https://realsun.info",
    period: "Approximately 6 months",
    category: "RWA Platform",
    type: "Web3",
    tags: ["RWA", "Web3"],
  },
  {
    name: "RealSun Wallet",
    website: "https://wallet.realsun.info",
    period: "Approximately 2 months",
    category: "Blockchain Wallet",
    type: "Web3",
    tags: ["Blockchain", "Web3"],
  },
  {
    name: "SMFI",
    website: "https://smfi.io",
    period: "Approximately 6 months",
    category: "Music RWA / SocialFi",
    type: "Web3",
    tags: ["RWA", "Web3"],
  },
  {
    name: "Mission Hunter",
    website: "https://missionhunter.pro",
    period: "Approximately 3 months",
    category: "Location-Based NFT Marketing",
    type: "Web3",
    tags: ["NFT", "Web3"],
  },
  {
    name: "HUB Membership",
    website: "https://hubmembership.info",
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NanoCapital",
  url: "https://nanocapital.example",
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
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="section-heading reveal">
      <span>{eyebrow}</span>
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
  const [activeFilter, setActiveFilter] = useState("All");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
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
    const formData = new FormData(event.currentTarget);
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
        nextErrors[field] = "Required";
      }
    });

    const email = String(formData.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email";
    }

    if (formData.get("amountAcknowledgement") !== "on") {
      nextErrors.amountAcknowledgement = "Please confirm before sending";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("loading");
    window.setTimeout(() => {
      setStatus("success");
      form.reset();
    }, 800);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, softwareSchema]),
        }}
      />
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
              <span aria-hidden="true">|</span>
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

        <main>
          <section className="hero section-dark" id="home">
            <div className="hero-content reveal">
              <p className="eyebrow">Enterprise FinTech and commerce systems</p>
              <h1>
                Payment and Commerce Solutions,
                <span>Built for Your Business</span>
              </h1>
              <p className="lead">
                Launch your payment platform and online shopping ecosystem with
                NanoCapital's proven technology, customizable modules, and
                experienced development team.
              </p>
              <p>
                From payment processing and shopping mall infrastructure to AI
                and blockchain integration, we help businesses move from concept
                to production.
              </p>
              <div className="hero-actions">
                <a className="btn primary large" href="#contact">
                  Request a Solution Demo
                </a>
                <a className="btn secondary large" href="#portfolio">
                  View Our Portfolio
                </a>
              </div>
              <div className="hero-highlights" aria-label="Solution highlights">
                {heroHighlights.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className="hero-visual reveal" aria-label="NanoCapital platform visual">
              <div className="dashboard-card payment-card">
                <div className="card-topline">
                  <span>Payment Dashboard</span>
                  <strong>Live</strong>
                </div>
                <div className="metric-row">
                  <div>
                    <span>Processed</span>
                    <strong>KRW 284.7M</strong>
                  </div>
                  <div>
                    <span>Success rate</span>
                    <strong>99.2%</strong>
                  </div>
                </div>
                <div className="chart-bars" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className="dashboard-card mall-card">
                <div className="card-topline">
                  <span>Shopping Mall</span>
                  <strong>API</strong>
                </div>
                <div className="store-grid" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className="dashboard-card wallet-card">
                <span>Mobile Wallet</span>
                <strong>USDT Payment Ready</strong>
                <small>Final amount confirmed at payment</small>
              </div>
              <div className="flow-line" aria-hidden="true" />
            </div>
          </section>

          <section className="section light-section" id="solutions">
            <SectionHeading
              eyebrow="Solution overview"
              title="Two Core Solutions. One Flexible Ecosystem."
            />
            <div className="solution-grid">
              <article className="solution-card reveal">
                <span className="card-icon">Pay</span>
                <h3>NanoCapital Pay Solution</h3>
                <p>
                  A customizable payment infrastructure designed for merchants,
                  platforms, and digital businesses.
                </p>
                <FeatureList items={payFeatures} />
              </article>
              <article className="solution-card reveal">
                <span className="card-icon">Mall</span>
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

          <section className="section muted-section" id="how-it-works">
            <SectionHeading
              eyebrow="Custom development"
              title="Custom Functions Built Around Your Business"
              body="NanoCapital can develop additional functionality based on the client's operational, payment, commerce, or platform requirements."
            />
            <div className="process-grid">
              {processSteps.map((step, index) => (
                <article className="process-card reveal" key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
            <div className="callout reveal">
              <strong>Estimated Custom Function Development Period:</strong>
              <span>Approximately 2 Weeks</span>
              <p>
                The delivery schedule begins after the requirements, scope, and
                payment have been confirmed. Major changes or additional
                functions may require a revised timeline.
              </p>
            </div>
          </section>

          <section className="section light-section" id="commercial-terms">
            <SectionHeading
              eyebrow="Commercial terms"
              title="Transparent Commercial Structure"
              body="All USD and USDT amounts displayed on the website are estimates. The final payment amount will be confirmed using the agreed exchange rate when the invoice or payment request is issued."
            />
            <div className="exchange-reference reveal">
              <span>Admin-editable exchange-rate reference</span>
              <strong>[Insert agreed exchange-rate source and timestamp]</strong>
            </div>
            <div className="terms-grid">
              {commercialTerms.map((term) => (
                <article className="term-card reveal" key={term.label}>
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
            <p className="compliance-note reveal">
              USDT transfer is presented only as a project payment, development
              deposit, service retainer, or transaction settlement method. It is
              not described as an investment, and this website does not promise
              returns, interest, profit, or appreciation from USDT.
            </p>
          </section>

          <section className="section dark-band">
            <SectionHeading
              eyebrow="Project timeline"
              title="From Agreement to Launch"
            />
            <div className="timeline">
              {timeline.map(([day, item]) => (
                <article className="timeline-item reveal" key={day}>
                  <span>{day}</span>
                  <p>{item}</p>
                </article>
              ))}
            </div>
            <p className="timeline-disclaimer reveal">
              The two-week timeline applies to the agreed custom function scope.
              Additional integrations, external approvals, compliance reviews,
              or scope changes may affect delivery time.
            </p>
          </section>

          <section className="section light-section" id="portfolio">
            <SectionHeading
              eyebrow="Development portfolio"
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
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="portfolio-grid">
              {filteredProjects.map((project) => (
                <article className="portfolio-card reveal" key={project.name}>
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

          <section className="section muted-section" id="technology">
            <SectionHeading eyebrow="Technology expertise" title="Technology Capabilities" />
            <div className="capability-grid">
              {capabilities.map(([title, body]) => (
                <article className="capability-card reveal" key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            <div className="keyword-cloud reveal">
              {keywords.map((keyword) => (
                <span key={keyword}>{keyword}</span>
              ))}
            </div>
          </section>

          <section className="section light-section">
            <SectionHeading eyebrow="Why NanoCapital" title="Why Work With NanoCapital" />
            <div className="trust-grid">
              {trustCards.map(([title, body]) => (
                <article className="trust-card reveal" key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section dark-band">
            <SectionHeading
              eyebrow="Security and compliance"
              title="Built for Responsible Business Operations"
            />
            <div className="security-grid">
              {securityItems.map((item) => (
                <span className="reveal" key={item}>
                  {item}
                </span>
              ))}
            </div>
            <p className="timeline-disclaimer reveal">
              NanoCapital provides technology and software solutions.
              Availability of payment, wallet, blockchain, token, or settlement
              functions may depend on the laws, licensing requirements, and
              regulatory rules of the client's operating jurisdiction.
            </p>
          </section>

          <section className="section light-section">
            <SectionHeading eyebrow="FAQ" title="Common Questions" />
            <div className="faq-list">
              {faqs.map(([question, answer]) => (
                <details className="reveal" key={question}>
                  <summary>{question}</summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="section contact-section" id="contact">
            <div className="contact-copy reveal">
              <span className="eyebrow">Final CTA</span>
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
              className="contact-form reveal"
              id="contact-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="form-grid">
                <label>
                  Name
                  <input name="name" aria-invalid={Boolean(errors.name)} />
                  {errors.name ? <small>{errors.name}</small> : null}
                </label>
                <label>
                  Company
                  <input name="company" aria-invalid={Boolean(errors.company)} />
                  {errors.company ? <small>{errors.company}</small> : null}
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email ? <small>{errors.email}</small> : null}
                </label>
                <label>
                  Phone or Messenger
                  <input name="phone" />
                </label>
                <label>
                  Country
                  <input name="country" aria-invalid={Boolean(errors.country)} />
                  {errors.country ? <small>{errors.country}</small> : null}
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
                  <small>{errors.requiredSolution}</small>
                ) : null}
              </label>
              <label>
                Project requirements
                <textarea
                  name="requirements"
                  rows={5}
                  aria-invalid={Boolean(errors.requirements)}
                />
                {errors.requirements ? <small>{errors.requirements}</small> : null}
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
                {status === "loading" ? "Sending..." : "Submit Project Request"}
              </button>
              {status === "success" ? (
                <p className="success-message" role="status">
                  Thank you. Your request has been prepared for NanoCapital's
                  team.
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
