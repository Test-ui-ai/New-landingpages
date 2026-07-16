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
type Locale = "en" | "ko";
type FilterValue = ProjectTag | "All";

const navItems = [
  { en: "Home", ko: "홈", href: "#home" },
  { en: "Solutions", ko: "솔루션", href: "#solutions" },
  { en: "Terms", ko: "조건", href: "#commercial-terms" },
  { en: "Portfolio", ko: "포트폴리오", href: "#portfolio" },
  { en: "Contact", ko: "문의", href: "#contact" },
];

const heroHighlights: Record<Locale, string[]> = {
  en: ["Pay Solution", "Shopping Mall Solution", "Custom Development"],
  ko: ["결제 솔루션", "쇼핑몰 솔루션", "맞춤 개발"],
};

const metrics: Record<Locale, Array<[string, string]>> = {
  en: [
    ["12", "Portfolio references listed"],
    ["2", "Core solution tracks"],
    ["14 days", "Target custom-function window"],
    ["0", "Return or profit claims"],
  ],
  ko: [
    ["12", "공개 포트폴리오 레퍼런스"],
    ["2", "핵심 솔루션 트랙"],
    ["14일", "맞춤 기능 목표 기간"],
    ["0", "수익률 또는 투자수익 약속"],
  ],
};

const payFeatures: Record<Locale, string[]> = {
  en: [
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
  ],
  ko: [
    "가맹점 결제 처리",
    "고객 결제 화면",
    "거래 모니터링",
    "정산 및 결제 기록",
    "관리자 대시보드",
    "API 연동",
    "USDT 결제 지원",
    "사용자 및 가맹점 계정 관리",
    "맞춤 리포트",
    "역할 기반 접근 제어",
  ],
};

const mallFeatures: Record<Locale, string[]> = {
  en: [
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
  ],
  ko: [
    "상품 및 카테고리 관리",
    "장바구니와 결제",
    "고객 계정 시스템",
    "주문 관리",
    "가맹점 또는 판매자 관리",
    "결제 연동",
    "프로모션 및 쿠폰 관리",
    "매출 분석",
    "모바일 대응 스토어프론트",
    "맞춤 모듈과 업무 흐름",
  ],
};

const processSteps: Record<Locale, Array<{ title: string; body: string }>> = {
  en: [
    {
      title: "Requirement Confirmation",
      body: "Confirm business requirements, workflows, API needs, and system scope.",
    },
    {
      title: "Commercial Confirmation",
      body: "Confirm the signed invoice, USDT wallet, exchange-rate source, and project start conditions.",
    },
    {
      title: "Development Starts",
      body: "Development begins after payment confirmation and proceeds alongside the Pay Solution and Shopping Mall Solution setup.",
    },
    {
      title: "Delivery and Testing",
      body: "The custom function is developed, integrated, tested, and prepared for delivery within approximately two weeks.",
    },
  ],
  ko: [
    {
      title: "요구사항 확정",
      body: "비즈니스 요구사항, 업무 흐름, API 필요사항, 시스템 범위를 확인합니다.",
    },
    {
      title: "상업 조건 확정",
      body: "서명된 인보이스, USDT 지갑, 환율 기준, 프로젝트 시작 조건을 확인합니다.",
    },
    {
      title: "개발 착수",
      body: "결제 확인 후 Pay Solution 및 Shopping Mall Solution 설정과 함께 개발을 시작합니다.",
    },
    {
      title: "납품 및 테스트",
      body: "합의된 맞춤 기능을 개발, 연동, 테스트한 뒤 약 2주 목표로 납품 준비를 진행합니다.",
    },
  ],
};

const commercialTerms: Record<
  Locale,
  Array<{
    label: string;
    amount: string;
    usd: string;
    payment: string;
    details: string;
    timing: string;
  }>
> = {
  en: [
    {
      label: "Custom Function Development Deposit",
      amount: "KRW 5,000,000",
      usd: "Approximately USD 3,340",
      payment: "USDT wallet confirmed in the signed invoice",
      details:
        "The final USDT amount is calculated using the exchange-rate source and reference time stated in the invoice or project agreement.",
      timing:
        "The Pay Solution, Shopping Mall Solution, and approved custom development work may proceed concurrently after payment and project confirmation.",
    },
    {
      label: "Monthly Service Retainer",
      amount: "KRW 1,200,000 per month",
      usd: "Approximately USD 802 per month",
      payment: "USDT wallet confirmed in the signed invoice",
      details:
        "Monthly payments begin from the service commencement date stated in the agreement.",
      timing: "Service commencement date is confirmed in the signed agreement.",
    },
    {
      label: "Transaction Fee",
      amount: "3%",
      usd: "Final amount confirmed at payment",
      payment: "Applied to eligible transactions",
      details:
        "A 3% service fee is applied to eligible transactions processed through the solution, subject to the final agreement, transaction type, settlement method, and applicable taxes.",
      timing: "Final calculation basis will be defined in the agreement.",
    },
  ],
  ko: [
    {
      label: "맞춤 기능 개발 예치금",
      amount: "KRW 5,000,000",
      usd: "약 USD 3,340",
      payment: "서명된 인보이스에서 확정되는 USDT 지갑",
      details:
        "최종 USDT 금액은 인보이스 또는 프로젝트 계약서에 명시된 환율 기준과 기준 시점을 사용해 계산됩니다.",
      timing:
        "결제 및 프로젝트 확인 후 Pay Solution, Shopping Mall Solution, 승인된 맞춤 개발을 병행할 수 있습니다.",
    },
    {
      label: "월 서비스 리테이너",
      amount: "KRW 1,200,000 / 월",
      usd: "월 약 USD 802",
      payment: "서명된 인보이스에서 확정되는 USDT 지갑",
      details:
        "월 결제는 계약서에 명시된 서비스 시작일을 기준으로 시작됩니다.",
      timing: "서비스 시작일은 서명된 계약서에서 확정됩니다.",
    },
    {
      label: "거래 수수료",
      amount: "3%",
      usd: "결제 시 최종 금액 확정",
      payment: "대상 거래에 적용",
      details:
        "3% 서비스 수수료는 솔루션을 통해 처리되는 대상 거래에 적용되며, 최종 계약, 거래 유형, 정산 방식, 적용 세금에 따릅니다.",
      timing: "최종 계산 기준은 계약서에서 정의됩니다.",
    },
  ],
};

const timeline: Record<Locale, Array<[string, string]>> = {
  en: [
    ["Day 1-2", "Project kickoff and requirement confirmation"],
    ["Day 2-4", "System configuration and technical planning"],
    ["Day 3-12", "Custom function development and platform integration"],
    ["Day 10-13", "Testing, revisions, and client review"],
    ["Day 14", "Target delivery of the approved custom function"],
  ],
  ko: [
    ["1-2일차", "프로젝트 킥오프 및 요구사항 확정"],
    ["2-4일차", "시스템 설정 및 기술 계획"],
    ["3-12일차", "맞춤 기능 개발 및 플랫폼 연동"],
    ["10-13일차", "테스트, 수정, 고객 검토"],
    ["14일차", "승인된 맞춤 기능 목표 납품"],
  ],
};

const filters: Array<{ value: FilterValue; en: string; ko: string }> = [
  { value: "All", en: "All", ko: "전체" },
  { value: "AI", en: "AI", ko: "AI" },
  { value: "FinTech", en: "FinTech", ko: "핀테크" },
  { value: "Blockchain", en: "Blockchain", ko: "블록체인" },
  { value: "Web3", en: "Web3", ko: "Web3" },
  { value: "Enterprise", en: "Enterprise", ko: "엔터프라이즈" },
];

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

const capabilities: Record<Locale, Array<[string, string]>> = {
  en: [
    ["Blockchain Infrastructure", "VAISEN Mainnet"],
    ["AI Platforms", "ILOVEKOREA.AI and AutoBlog"],
    ["DeFi and DEX", "BUYZONE Protocol"],
    ["RWA Platforms", "RealSun and SMFI"],
    ["NFT Platforms", "Lost Tesla Art NFT and Mission Hunter"],
    ["Prediction Markets", "Oracle Predict"],
    ["Enterprise Solutions", "SimplePayX ERP"],
    ["FinTech and Payments", "HUB Membership and NanoCapital Pay Solution"],
  ],
  ko: [
    ["블록체인 인프라", "VAISEN Mainnet"],
    ["AI 플랫폼", "ILOVEKOREA.AI 및 AutoBlog"],
    ["DeFi 및 DEX", "BUYZONE Protocol"],
    ["RWA 플랫폼", "RealSun 및 SMFI"],
    ["NFT 플랫폼", "Lost Tesla Art NFT 및 Mission Hunter"],
    ["예측 시장", "Oracle Predict"],
    ["엔터프라이즈 솔루션", "SimplePayX ERP"],
    ["핀테크 및 결제", "HUB Membership 및 NanoCapital Pay Solution"],
  ],
};

const keywords: Record<Locale, string[]> = {
  en: [
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
  ],
  ko: [
    "결제 API",
    "가맹점 대시보드",
    "이커머스 시스템",
    "블록체인 지갑",
    "스마트 컨트랙트",
    "EVM 인프라",
    "AI 연동",
    "ERP 시스템",
    "관리자 대시보드",
    "API 개발",
    "데이터베이스 설계",
    "클라우드 배포",
    "보안 테스트",
    "반응형 웹 애플리케이션",
  ],
};

const trustCards: Record<Locale, Array<[string, string]>> = {
  en: [
    [
      "Visible Portfolio",
      "Reference projects are listed with websites, categories, and delivery periods so buyers can review the work directly.",
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
  ],
  ko: [
    [
      "확인 가능한 포트폴리오",
      "웹사이트, 카테고리, 개발 기간을 함께 제시해 구매자가 직접 레퍼런스를 검토할 수 있습니다.",
    ],
    [
      "빠른 시장 진입",
      "모든 구성요소를 처음부터 만들지 않고 기존 Pay Solution과 Shopping Mall Solution을 기반으로 시작합니다.",
    ],
    [
      "유연한 맞춤화",
      "비즈니스 요구사항, 내부 프로세스, 결제 흐름, 고객 여정에 맞춰 기능을 추가합니다.",
    ],
    [
      "투명한 프로젝트 구조",
      "개발 범위, 결제 단계, 납품 일정, 월 서비스 조건, 거래 수수료를 명확히 정리합니다.",
    ],
  ],
};

const securityItems: Record<Locale, string[]> = {
  en: [
    "Wallet address verification before payment",
    "Payment confirmation records",
    "Role-based administrator access",
    "Transaction history",
    "API authentication",
    "Data protection",
    "System activity logging",
    "Testing before production deployment",
    "Client approval before launch",
    "Compliance review based on the operating jurisdiction",
  ],
  ko: [
    "결제 전 지갑 주소 확인",
    "결제 확인 기록",
    "역할 기반 관리자 접근",
    "거래 이력",
    "API 인증",
    "데이터 보호",
    "시스템 활동 로그",
    "프로덕션 배포 전 테스트",
    "출시 전 고객 승인",
    "운영 관할권 기준의 컴플라이언스 검토",
  ],
};

const faqs: Record<Locale, Array<[string, string]>> = {
  en: [
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
      "The commercial structure includes a monthly payment equivalent to KRW 1,200,000, paid in USDT to the wallet confirmed in the signed invoice, beginning from the agreed service commencement date.",
    ],
    [
      "How is the 3% fee calculated?",
      "The 3% fee is applied to eligible transactions processed through the solution. The exact calculation basis, settlement cycle, refund treatment, taxes, and excluded transactions will be defined in the final agreement.",
    ],
  ],
  ko: [
    [
      "Pay Solution에는 무엇이 포함되나요?",
      "Pay Solution에는 핵심 결제 화면, 거래 관리, 관리자 도구, 리포트, 합의된 연동 기능이 포함됩니다. 최종 범위는 프로젝트 계약서에 명시됩니다.",
    ],
    [
      "Shopping Mall Solution에는 무엇이 포함되나요?",
      "상품 관리, 고객 계정, 장바구니, 결제, 주문, 프로모션, 판매자 기능, 결제 연동, 관리자 대시보드 등을 포함할 수 있습니다.",
    ],
    [
      "맞춤 개발은 얼마나 걸리나요?",
      "합의된 범위의 맞춤 기능은 요구사항 및 결제 확인 후 약 2주 내 완료를 목표로 합니다.",
    ],
    [
      "KRW 5,000,000은 USDT로 어떻게 환산되나요?",
      "최종 USDT 금액은 인보이스 또는 프로젝트 계약서에 명시된 환율 기준과 기준 시점을 사용해 계산됩니다.",
    ],
    [
      "월 결제 조건은 무엇인가요?",
      "상업 구조에는 KRW 1,200,000 상당의 월 서비스 리테이너가 포함되며, 서명된 인보이스에서 확정되는 USDT 지갑으로 결제됩니다.",
    ],
    [
      "3% 수수료는 어떻게 계산되나요?",
      "3% 수수료는 솔루션을 통해 처리되는 대상 거래에 적용됩니다. 정확한 계산 기준, 정산 주기, 환불 처리, 세금, 제외 거래는 최종 계약서에서 정의됩니다.",
    ],
  ],
};

const requiredSolutions: Record<Locale, string[]> = {
  en: [
    "Pay Solution",
    "Shopping Mall Solution",
    "Both Solutions",
    "Custom Development",
  ],
  ko: ["Pay Solution", "Shopping Mall Solution", "두 솔루션 모두", "맞춤 개발"],
};

const diligenceRows: Record<Locale, Array<[string, string, string, string]>> = {
  en: [
    ["Payment rails", "Ready", "API + merchant workflow", "Verified"],
    ["Commerce engine", "Ready", "Catalog, cart, order stack", "Verified"],
    ["Custom functions", "Scoped", "Two-week target window", "In review"],
    ["USDT settlement", "Available", "Project payment only", "Controlled"],
    ["Compliance posture", "Jurisdictional", "Reviewed before launch", "Required"],
  ],
  ko: [
    ["결제 레일", "준비됨", "API + 가맹점 흐름", "확인"],
    ["커머스 엔진", "준비됨", "카탈로그, 장바구니, 주문", "확인"],
    ["맞춤 기능", "범위 확정", "2주 목표 기간", "검토 중"],
    ["USDT 정산", "가능", "프로젝트 결제 용도", "통제"],
    ["컴플라이언스", "관할권 기준", "출시 전 검토", "필수"],
  ],
};

const projectCategoryKo: Record<string, string> = {
  "EVM Blockchain Mainnet": "EVM 블록체인 메인넷",
  "AI Community Platform": "AI 커뮤니티 플랫폼",
  "NFT Marketplace": "NFT 마켓플레이스",
  "Decentralized Swap Protocol / DEX": "탈중앙화 스왑 프로토콜 / DEX",
  "AI Auto-Blogging SaaS": "AI 자동 블로깅 SaaS",
  "ERP / Intranet": "ERP / 인트라넷",
  "Prediction Market": "예측 시장",
  "RWA Platform": "RWA 플랫폼",
  "Blockchain Wallet": "블록체인 지갑",
  "Music RWA / SocialFi": "음악 RWA / SocialFi",
  "Location-Based NFT Marketing": "위치 기반 NFT 마케팅",
  "Crypto Payment Platform": "크립토 결제 플랫폼",
};

const projectTypeKo: Record<string, string> = {
  "Blockchain Infrastructure": "블록체인 인프라",
  "AI + Web Platform": "AI + 웹 플랫폼",
  Web3: "Web3",
  "Web2 + AI": "Web2 + AI",
  "Enterprise Solution": "엔터프라이즈 솔루션",
  FinTech: "핀테크",
};

const projectPeriodKo: Record<string, string> = {
  "Approximately 12 months": "약 12개월",
  "Approximately 6 months": "약 6개월",
  "Approximately 5 months": "약 5개월",
  "Approximately 4 months": "약 4개월",
  "Approximately 3 months": "약 3개월",
  "Approximately 2 months": "약 2개월",
};

const copy = {
  en: {
    skip: "Skip to main content",
    navCta: "Request a Demo",
    navPrimary: "Start a Project",
    hero: {
      kicker: "Operating system for payment and commerce diligence",
      title: "Payment and Commerce Solutions",
      accent: "Built for Operators",
      lead:
        "Launch payment, commerce, and custom platform infrastructure with NanoCapital's proven development team.",
      primary: "Request Demo",
      secondary: "View Portfolio",
    },
    terminal: {
      label: "NanoCapital diligence terminal",
      topline: "Investor diligence console",
      proof: "Operational proof",
      metricOneLabel: "Solution tracks",
      metricOneValue: "Pay + Mall",
      metricTwoLabel: "Commercial basis",
      metricTwoValue: "Invoice confirmed",
      columns: ["Workstream", "Status", "Evidence", "Signal"],
      footer: "API integration flow",
      final: "Final amount confirmed at payment",
    },
    sections: {
      solutionKicker: "Solution overview",
      solutionTitle: "Core Payment and Commerce Infrastructure",
      solutionBody:
        "NanoCapital packages payment and shopping mall systems as reusable operating capability, then adapts them around workflow, settlement, and market launch needs.",
      payBody:
        "A customizable payment infrastructure designed for merchants, platforms, and digital businesses.",
      mallBody:
        "A ready-to-customize e-commerce and shopping mall platform for businesses that want to launch quickly while maintaining control over their brand and operations.",
      customKicker: "Custom development",
      customTitle: "Custom Functions Without Rebuilding the Stack",
      customBody:
        "Additional functionality can be developed around payment, commerce, workflow, or platform requirements.",
      timeLabel: "Estimated Custom Function Development Period",
      timeValue: "Approximately 2 Weeks",
      timeBody:
        "The delivery schedule begins after the requirements, scope, and payment have been confirmed. Major changes or additional functions may require a revised timeline.",
      termsKicker: "Commercial terms",
      termsTitle: "Transparent Commercial Structure",
      termsBody:
        "USD and USDT figures are estimates. The final payment amount is confirmed using the exchange rate stated when the invoice or payment request is issued.",
      exchangeLabel: "Exchange-rate reference",
      exchangeValue: "Source and timestamp are stated in the signed invoice.",
      compliance:
        "USDT transfer is presented only as a project payment, development deposit, service retainer, or transaction settlement method. It is not described as an investment, and this website does not promise returns, interest, profit, or appreciation from USDT.",
      timelineKicker: "Project timeline",
      timelineTitle: "Agreement to Launch",
      timelineDisclaimer:
        "The two-week timeline applies to the agreed custom function scope. Additional integrations, external approvals, compliance reviews, or scope changes may affect delivery time.",
      portfolioKicker: "Development portfolio",
      portfolioTitle: "Proven Experience Across AI, FinTech, Enterprise, and Web3",
      portfolioBody:
        "Delivered work spans blockchain infrastructure, AI platforms, payment systems, enterprise software, RWA, SocialFi, NFT, and prediction markets.",
      techKicker: "Technology expertise",
      techTitle: "Technology Capabilities Behind the Build",
      trustKicker: "Decision factors",
      trustTitle: "Why Work With NanoCapital",
      securityKicker: "Security and compliance",
      securityTitle: "Built for Responsible Business Operations",
      securityBody:
        "NanoCapital provides technology and software solutions. Availability of payment, wallet, blockchain, token, or settlement functions may depend on the laws, licensing requirements, and regulatory rules of the client's operating jurisdiction.",
      faqKicker: "Investor questions",
      faqTitle: "Common Questions",
    },
    termsLabels: {
      payment: "Payment method",
      description: "Description",
      timing: "Development timing",
    },
    portfolioLabels: {
      period: "Development period",
      category: "Category",
      website: "Website",
      action: "View Project",
    },
    contact: {
      kicker: "Project intake",
      title: "Ready to Launch Your Payment and Commerce Platform?",
      body:
        "Tell us about your business model, required payment flow, shopping mall functions, and integration needs. Our team will prepare a suitable implementation plan.",
      proposal: "Request a Proposal",
      consult: "Schedule a Consultation",
      name: "Name",
      company: "Company",
      email: "Email",
      phone: "Phone or Messenger",
      country: "Country",
      launchDate: "Expected launch date",
      required: "Required solution",
      select: "Select a solution",
      requirements: "Project requirements",
      acknowledgement:
        "I understand that displayed USD and USDT amounts are estimates and that the final amount will be confirmed in the official agreement or invoice.",
      loading: "Preparing brief...",
      submit: "Prepare Project Brief",
      success:
        "Project brief prepared on this page. Connect an approved email or CRM endpoint before using this form for live submissions.",
    },
    validation: {
      requiredSolution: "a required solution",
      requiredPrefix: "Please enter",
      email: "Email needs a valid format, for example name@company.com.",
      acknowledgement:
        "Please confirm that final amounts are set by the official agreement or invoice.",
      fields: {
        name: "name",
        company: "company",
        email: "email",
        country: "country",
        requirements: "project requirements",
      },
    },
    footer:
      "Pay Solution, Shopping Mall Solution, Custom Development, and enterprise technology delivery.",
    footerLinks: [
      "Pay Solution",
      "Shopping Mall Solution",
      "Custom Development",
      "Portfolio",
      "Privacy Policy",
      "Terms of Service",
      "Risk and Compliance Notice",
      "Contact Information",
    ],
  },
  ko: {
    skip: "본문으로 바로가기",
    navCta: "데모 요청",
    navPrimary: "프로젝트 시작",
    hero: {
      kicker: "결제 및 커머스 실사를 위한 운영 시스템",
      title: "결제 및 커머스 솔루션",
      accent: "운영자를 위해 설계",
      lead:
        "NanoCapital의 검증 가능한 개발 경험을 기반으로 결제, 커머스, 맞춤 플랫폼 인프라를 출시합니다.",
      primary: "데모 요청",
      secondary: "포트폴리오 보기",
    },
    terminal: {
      label: "NanoCapital 실사 터미널",
      topline: "투자자 실사 콘솔",
      proof: "운영 증거",
      metricOneLabel: "솔루션 트랙",
      metricOneValue: "Pay + Mall",
      metricTwoLabel: "상업 기준",
      metricTwoValue: "인보이스 확정",
      columns: ["업무 영역", "상태", "근거", "신호"],
      footer: "API 연동 흐름",
      final: "결제 시 최종 금액 확정",
    },
    sections: {
      solutionKicker: "솔루션 개요",
      solutionTitle: "핵심 결제 및 커머스 인프라",
      solutionBody:
        "NanoCapital은 결제 시스템과 쇼핑몰 시스템을 재사용 가능한 운영 역량으로 패키징하고, 업무 흐름, 정산, 시장 출시 요구에 맞춰 조정합니다.",
      payBody:
        "가맹점, 플랫폼, 디지털 비즈니스를 위한 맞춤형 결제 인프라입니다.",
      mallBody:
        "빠른 출시와 브랜드/운영 통제를 동시에 원하는 비즈니스를 위한 맞춤형 이커머스 및 쇼핑몰 플랫폼입니다.",
      customKicker: "맞춤 개발",
      customTitle: "스택을 다시 만들지 않는 맞춤 기능 개발",
      customBody:
        "결제, 커머스, 업무 흐름, 플랫폼 요구사항에 맞춰 추가 기능을 개발할 수 있습니다.",
      timeLabel: "예상 맞춤 기능 개발 기간",
      timeValue: "약 2주",
      timeBody:
        "납품 일정은 요구사항, 범위, 결제가 확인된 후 시작됩니다. 큰 변경이나 추가 기능은 일정 조정이 필요할 수 있습니다.",
      termsKicker: "상업 조건",
      termsTitle: "투명한 상업 구조",
      termsBody:
        "USD 및 USDT 금액은 추정치입니다. 최종 결제 금액은 인보이스 또는 결제 요청서 발행 시 명시된 환율 기준으로 확정됩니다.",
      exchangeLabel: "환율 기준",
      exchangeValue: "환율 출처와 기준 시점은 서명된 인보이스에 명시됩니다.",
      compliance:
        "USDT 이체는 프로젝트 결제, 개발 예치금, 서비스 리테이너 또는 거래 정산 방식으로만 제시됩니다. 투자로 설명하지 않으며, 본 웹사이트는 USDT에 대한 수익, 이자, 이익, 가치 상승을 약속하지 않습니다.",
      timelineKicker: "프로젝트 일정",
      timelineTitle: "계약부터 출시까지",
      timelineDisclaimer:
        "2주 일정은 합의된 맞춤 기능 범위에 적용됩니다. 추가 연동, 외부 승인, 컴플라이언스 검토, 범위 변경은 납품 일정에 영향을 줄 수 있습니다.",
      portfolioKicker: "개발 포트폴리오",
      portfolioTitle: "AI, 핀테크, 엔터프라이즈, Web3 경험",
      portfolioBody:
        "블록체인 인프라, AI 플랫폼, 결제 시스템, 엔터프라이즈 소프트웨어, RWA, SocialFi, NFT, 예측 시장 경험을 제공합니다.",
      techKicker: "기술 전문성",
      techTitle: "구축을 뒷받침하는 기술 역량",
      trustKicker: "의사결정 기준",
      trustTitle: "NanoCapital과 협업해야 하는 이유",
      securityKicker: "보안 및 컴플라이언스",
      securityTitle: "책임 있는 비즈니스 운영을 위한 설계",
      securityBody:
        "NanoCapital은 기술 및 소프트웨어 솔루션을 제공합니다. 결제, 지갑, 블록체인, 토큰, 정산 기능의 제공 가능 여부는 고객 운영 관할권의 법률, 라이선스 요건, 규제 규칙에 따라 달라질 수 있습니다.",
      faqKicker: "투자자 질문",
      faqTitle: "자주 묻는 질문",
    },
    termsLabels: {
      payment: "결제 방식",
      description: "설명",
      timing: "개발 시점",
    },
    portfolioLabels: {
      period: "개발 기간",
      category: "카테고리",
      website: "웹사이트",
      action: "프로젝트 보기",
    },
    contact: {
      kicker: "프로젝트 접수",
      title: "결제 및 커머스 플랫폼 출시를 준비하시나요?",
      body:
        "비즈니스 모델, 필요한 결제 흐름, 쇼핑몰 기능, 연동 요구사항을 알려주세요. 적합한 구현 계획을 준비할 수 있습니다.",
      proposal: "제안 요청",
      consult: "상담 예약",
      name: "이름",
      company: "회사",
      email: "이메일",
      phone: "전화 또는 메신저",
      country: "국가",
      launchDate: "예상 출시일",
      required: "필요한 솔루션",
      select: "솔루션 선택",
      requirements: "프로젝트 요구사항",
      acknowledgement:
        "표시된 USD 및 USDT 금액은 추정치이며 최종 금액은 공식 계약서 또는 인보이스에서 확정됨을 이해합니다.",
      loading: "브리프 준비 중...",
      submit: "프로젝트 브리프 준비",
      success:
        "프로젝트 브리프가 이 페이지에서 준비되었습니다. 실제 제출용으로 사용하기 전 승인된 이메일 또는 CRM 엔드포인트를 연결하세요.",
    },
    validation: {
      requiredSolution: "필요한 솔루션",
      requiredPrefix: "입력해 주세요:",
      email: "올바른 이메일 형식이 필요합니다. 예: name@company.com",
      acknowledgement:
        "최종 금액이 공식 계약서 또는 인보이스에서 확정됨을 확인해 주세요.",
      fields: {
        name: "이름",
        company: "회사",
        email: "이메일",
        country: "국가",
        requirements: "프로젝트 요구사항",
      },
    },
    footer:
      "Pay Solution, Shopping Mall Solution, 맞춤 개발, 엔터프라이즈 기술 제공.",
    footerLinks: [
      "Pay Solution",
      "Shopping Mall Solution",
      "맞춤 개발",
      "포트폴리오",
      "개인정보 처리방침",
      "서비스 약관",
      "리스크 및 컴플라이언스 고지",
      "문의 정보",
    ],
  },
} as const;

function localizeProjectValue(
  value: string,
  locale: Locale,
  translations: Record<string, string>,
) {
  return locale === "ko" ? translations[value] ?? value : value;
}

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
  featureList: [...payFeatures.en, ...mallFeatures.en, ...keywords.en],
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
  const [locale, setLocale] = useState<Locale>("ko");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("All");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const t = copy[locale];

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter((project) => project.tags.includes(activeFilter as ProjectTag));
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
        const label =
          field === "requiredSolution"
            ? t.validation.requiredSolution
            : t.validation.fields[field as keyof typeof t.validation.fields];
        nextErrors[field] =
          locale === "ko"
            ? `${t.validation.requiredPrefix} ${label}.`
            : `${t.validation.requiredPrefix} ${label}.`;
      }
    });

    const email = String(formData.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = t.validation.email;
    }

    if (formData.get("amountAcknowledgement") !== "on") {
      nextErrors.amountAcknowledgement = t.validation.acknowledgement;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("loading");
    window.setTimeout(() => {
      setStatus("success");
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
        {t.skip}
      </a>
      <div className="site-shell">
        <header className="nav-wrap">
          <a className="brand" href="#home" aria-label="NanoCapital home">
            <span className="brand-mark">N</span>
            <span>NanoCapital</span>
          </a>
          <nav aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item[locale]}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <div className="language-switch" aria-label="Language selector">
              <button
                type="button"
                aria-pressed={locale === "en"}
                onClick={() => setLocale("en")}
              >
                EN
              </button>
              <span aria-hidden="true">/</span>
              <button
                type="button"
                aria-pressed={locale === "ko"}
                onClick={() => setLocale("ko")}
              >
                KR
              </button>
            </div>
            <a className="btn secondary" href="#contact">
              {t.navCta}
            </a>
            <a className="btn primary" href="#contact">
              {t.navPrimary}
            </a>
          </div>
        </header>

        <main id="main-content">
          <section className="hero" id="home">
            <div className="hero-copy">
              <p className="kicker">{t.hero.kicker}</p>
              <h1>
                {t.hero.title}
                <span>{t.hero.accent}</span>
              </h1>
              <p className="lead">{t.hero.lead}</p>
              <div className="hero-actions">
                <a className="btn primary large" href="#contact">
                  {t.hero.primary}
                </a>
                <a className="btn secondary large" href="#portfolio">
                  {t.hero.secondary}
                </a>
              </div>
              <div className="hero-highlights" aria-label="Solution highlights">
                {heroHighlights[locale].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className="terminal-panel" aria-label={t.terminal.label}>
              <div className="terminal-topline">
                <span>{t.terminal.topline}</span>
                <strong>{t.terminal.proof}</strong>
              </div>
              <div className="terminal-metrics">
                <div>
                  <span>{t.terminal.metricOneLabel}</span>
                  <strong>{t.terminal.metricOneValue}</strong>
                </div>
                <div>
                  <span>{t.terminal.metricTwoLabel}</span>
                  <strong>{t.terminal.metricTwoValue}</strong>
                </div>
              </div>
              <div className="terminal-grid" role="table" aria-label="Solution readiness">
                <div role="row" className="terminal-row terminal-head">
                  {t.terminal.columns.map((column) => (
                    <span role="columnheader" key={column}>
                      {column}
                    </span>
                  ))}
                </div>
                {diligenceRows[locale].map(([workstream, rowStatus, evidence, signal]) => (
                  <div role="row" className="terminal-row" key={workstream}>
                    <span role="cell">{workstream}</span>
                    <span role="cell">{rowStatus}</span>
                    <span role="cell">{evidence}</span>
                    <strong role="cell">{signal}</strong>
                  </div>
                ))}
              </div>
              <div className="terminal-footer">
                <span>{t.terminal.footer}</span>
                <div className="flow-bars" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <strong>{t.terminal.final}</strong>
              </div>
            </div>

            <div className="metric-strip" aria-label="NanoCapital operating metrics">
              {metrics[locale].map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="section paper-section" id="solutions">
            <SectionHeading
              kicker={t.sections.solutionKicker}
              title={t.sections.solutionTitle}
              body={t.sections.solutionBody}
            />
            <div className="solution-grid">
              <article className="solution-card">
                <span className="card-index">01</span>
                <h3>NanoCapital Pay Solution</h3>
                <p>{t.sections.payBody}</p>
                <FeatureList items={payFeatures[locale]} />
              </article>
              <article className="solution-card dark-card">
                <span className="card-index">02</span>
                <h3>Shopping Mall Solution</h3>
                <p>{t.sections.mallBody}</p>
                <FeatureList items={mallFeatures[locale]} />
              </article>
            </div>
          </section>

          <section className="section split-section" id="how-it-works">
            <SectionHeading
              align="left"
              kicker={t.sections.customKicker}
              title={t.sections.customTitle}
              body={t.sections.customBody}
            />
            <div className="process-grid">
              {processSteps[locale].map((step, index) => (
                <article className="process-card" key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
            <div className="time-callout">
              <span>{t.sections.timeLabel}</span>
              <strong>{t.sections.timeValue}</strong>
              <p>{t.sections.timeBody}</p>
            </div>
          </section>

          <section className="section paper-section" id="commercial-terms">
            <SectionHeading
              kicker={t.sections.termsKicker}
              title={t.sections.termsTitle}
              body={t.sections.termsBody}
            />
            <div className="exchange-reference">
              <span>{t.sections.exchangeLabel}</span>
              <strong>{t.sections.exchangeValue}</strong>
            </div>
            <div className="terms-grid">
              {commercialTerms[locale].map((term) => (
                <article className="term-card" key={term.label}>
                  <p>{term.label}</p>
                  <h3>{term.amount}</h3>
                  <strong>{term.usd}</strong>
                  <dl>
                    <div>
                      <dt>{t.termsLabels.payment}</dt>
                      <dd>{term.payment}</dd>
                    </div>
                    <div>
                      <dt>{t.termsLabels.description}</dt>
                      <dd>{term.details}</dd>
                    </div>
                    <div>
                      <dt>{t.termsLabels.timing}</dt>
                      <dd>{term.timing}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
            <p className="compliance-note">{t.sections.compliance}</p>
          </section>

          <section className="section dark-section">
            <SectionHeading
              kicker={t.sections.timelineKicker}
              title={t.sections.timelineTitle}
            />
            <div className="timeline">
              {timeline[locale].map(([day, item]) => (
                <article className="timeline-item" key={day}>
                  <span>{day}</span>
                  <p>{item}</p>
                </article>
              ))}
            </div>
            <p className="timeline-disclaimer">{t.sections.timelineDisclaimer}</p>
          </section>

          <section className="section paper-section" id="portfolio">
            <div className="portfolio-head">
              <SectionHeading
                align="left"
                kicker={t.sections.portfolioKicker}
                title={t.sections.portfolioTitle}
                body={t.sections.portfolioBody}
              />
              <div className="filter-row" aria-label="Portfolio filters">
                {filters.map((filter) => (
                  <button
                    className={filter.value === activeFilter ? "active" : ""}
                    key={filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    type="button"
                    aria-pressed={filter.value === activeFilter}
                  >
                    {filter[locale]}
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
                  <span>{localizeProjectValue(project.type, locale, projectTypeKo)}</span>
                  <h3>{project.name}</h3>
                  <dl>
                    <div>
                      <dt>{t.portfolioLabels.period}</dt>
                      <dd>
                        {localizeProjectValue(project.period, locale, projectPeriodKo)}
                      </dd>
                    </div>
                    <div>
                      <dt>{t.portfolioLabels.category}</dt>
                      <dd>
                        {localizeProjectValue(
                          project.category,
                          locale,
                          projectCategoryKo,
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt>{t.portfolioLabels.website}</dt>
                      <dd>{project.website.replace("https://", "")}</dd>
                    </div>
                  </dl>
                  <a href={project.website} rel="noreferrer" target="_blank">
                    {t.portfolioLabels.action}
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section className="section split-section" id="technology">
            <SectionHeading
              align="left"
              kicker={t.sections.techKicker}
              title={t.sections.techTitle}
            />
            <div className="capability-grid">
              {capabilities[locale].map(([title, body]) => (
                <article className="capability-card" key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            <div className="keyword-cloud" aria-label="Technical keywords">
              {keywords[locale].map((keyword) => (
                <span key={keyword}>{keyword}</span>
              ))}
            </div>
          </section>

          <section className="section paper-section">
            <SectionHeading
              kicker={t.sections.trustKicker}
              title={t.sections.trustTitle}
            />
            <div className="trust-grid">
              {trustCards[locale].map(([title, body]) => (
                <article className="trust-card" key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section dark-section">
            <SectionHeading
              kicker={t.sections.securityKicker}
              title={t.sections.securityTitle}
            />
            <div className="security-grid">
              {securityItems[locale].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <p className="timeline-disclaimer">{t.sections.securityBody}</p>
          </section>

          <section className="section paper-section">
            <SectionHeading
              kicker={t.sections.faqKicker}
              title={t.sections.faqTitle}
            />
            <div className="faq-list">
              {faqs[locale].map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}</summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="section contact-section" id="contact">
            <div className="contact-copy">
              <span className="kicker">{t.contact.kicker}</span>
              <h2>{t.contact.title}</h2>
              <p>{t.contact.body}</p>
              <div className="hero-actions">
                <a className="btn primary large" href="#contact-form">
                  {t.contact.proposal}
                </a>
                <a className="btn secondary large" href="#contact-form">
                  {t.contact.consult}
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
                  {t.contact.name}
                  <input
                    name="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name ? <small id="name-error">{errors.name}</small> : null}
                </label>
                <label>
                  {t.contact.company}
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
                  {t.contact.email}
                  <input
                    name="email"
                    type="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email ? <small id="email-error">{errors.email}</small> : null}
                </label>
                <label>
                  {t.contact.phone}
                  <input name="phone" />
                </label>
                <label>
                  {t.contact.country}
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
                  {t.contact.launchDate}
                  <input name="launchDate" type="date" />
                </label>
              </div>
              <label>
                {t.contact.required}
                <select
                  name="requiredSolution"
                  aria-invalid={Boolean(errors.requiredSolution)}
                  aria-describedby={
                    errors.requiredSolution ? "required-solution-error" : undefined
                  }
                  defaultValue=""
                >
                  <option value="" disabled>
                    {t.contact.select}
                  </option>
                  {requiredSolutions[locale].map((solution) => (
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
                {t.contact.requirements}
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
                <span>{t.contact.acknowledgement}</span>
              </label>
              {errors.amountAcknowledgement ? (
                <small className="form-error">{errors.amountAcknowledgement}</small>
              ) : null}
              <button className="btn primary large" disabled={status === "loading"} type="submit">
                {status === "loading" ? t.contact.loading : t.contact.submit}
              </button>
              {status === "success" ? (
                <p className="success-message" role="status">
                  {t.contact.success}
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
            <p>{t.footer}</p>
          </div>
          <div className="footer-links">
            <a href="#solutions">{t.footerLinks[0]}</a>
            <a href="#solutions">{t.footerLinks[1]}</a>
            <a href="#how-it-works">{t.footerLinks[2]}</a>
            <a href="#portfolio">{t.footerLinks[3]}</a>
            <a href="#contact">{t.footerLinks[4]}</a>
            <a href="#contact">{t.footerLinks[5]}</a>
            <a href="#contact">{t.footerLinks[6]}</a>
            <a href="#contact">{t.footerLinks[7]}</a>
          </div>
        </footer>
      </div>
    </>
  );
}
