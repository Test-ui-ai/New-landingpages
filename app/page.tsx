"use client";

import Image from "next/image";
import type { CSSProperties, FormEvent } from "react";
import { useMemo, useState } from "react";

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
  { en: "Structure", ko: "구조", href: "#solutions" },
  { en: "Investment", ko: "투자 조건", href: "#commercial-terms" },
  { en: "Portfolio", ko: "포트폴리오", href: "#portfolio" },
  { en: "Contact", ko: "문의", href: "#contact" },
];

const heroHighlights: Record<Locale, string[]> = {
  en: ["Busan Blockchain Special Zone", "Thailand platform operation", "Web3 portfolio company"],
  ko: ["부산 블록체인 특구", "태국 플랫폼 운영", "Web3 포트폴리오 법인"],
};

const metrics: Record<Locale, Array<[string, string]>> = {
  en: [
    ["KRW 2B", "Scheduled corporation round reference"],
    ["15%", "Scheduled equity allocation"],
    ["KRW 140M", "RealSun development-cost reference"],
    ["Busan", "Incorporation in progress"],
  ],
  ko: [
    ["KRW 20억", "예정 법인 투자 라운드"],
    ["15%", "예정 지분 배정"],
    ["KRW 1.4억", "RealSun 개발비 레퍼런스"],
    ["부산", "법인 설립 진행 중"],
  ],
};

const payFeatures: Record<Locale, string[]> = {
  en: [
    "New Korean corporation: Nexus One",
    "Incorporation in progress in the Busan Blockchain Special Zone",
    "Inherits the Web3 development portfolio of Logiconfire sole proprietorship",
    "CEO Kim Dong-hyuk portfolio reference basis",
    "Holding-company structure for Korea and Thailand platform operations",
    "Investment conditions organized for Korean investor diligence",
  ],
  ko: [
    "신규 한국 법인: Nexus One",
    "부산 블록체인 특구 내 법인 설립 진행 중",
    "Logiconfire 개인사업자 Web3 개발 포트폴리오 승계",
    "김동혁 대표 포트폴리오 레퍼런스 기반",
    "한국 개발 및 태국 블록체인 플랫폼 운영을 위한 지주회사 구조",
    "한국 투자자 실사를 위한 투자 조건 정리",
  ],
};

const mallFeatures: Record<Locale, string[]> = {
  en: [
    "Solar NFC platform and wallet references",
    "Proprietary decentralized OTC platform",
    "Lart NFC and staking platform",
    "Real-time translation community app for Korea commerce",
    "Prepaid card business registration and operation in progress",
    "Moden Members development project tracked separately",
  ],
  ko: [
    "태양광 NFC 플랫폼 및 지갑 레퍼런스",
    "자체 개발 탈중앙화 OTC 플랫폼",
    "Lart NFC 및 스테이킹 플랫폼",
    "한국 상권 외국인 커뮤니케이션 실시간 번역 앱",
    "선불카드 사업자 등록 및 운영 진행 중",
    "Moden Members 개발 프로젝트 별도 관리",
  ],
};

const processSteps: Record<Locale, Array<{ title: string; body: string }>> = {
  en: [
    {
      title: "Portfolio Inheritance",
      body: "Organize the Web3 development portfolio of the existing Logiconfire sole proprietorship for transfer into Nexus One.",
    },
    {
      title: "Busan Incorporation",
      body: "Proceed with Korean corporation formation inside the Busan Blockchain Special Zone.",
    },
    {
      title: "Round Documentation",
      body: "Prepare investment conditions, equity allocation references, and diligence materials for Korean investors.",
    },
    {
      title: "Operating Rollout",
      body: "Coordinate Korea development-zone activity with Thailand blockchain platform operations and ongoing project execution.",
    },
  ],
  ko: [
    {
      title: "포트폴리오 승계",
      body: "기존 Logiconfire 개인사업자의 Web3 개발 포트폴리오를 Nexus One으로 승계하기 위해 정리합니다.",
    },
    {
      title: "부산 법인 설립",
      body: "부산 블록체인 특구 내 신규 한국 법인 설립을 진행합니다.",
    },
    {
      title: "투자 라운드 문서화",
      body: "한국 투자자 실사를 위한 투자 조건, 지분 배정 기준, 포트폴리오 자료를 정리합니다.",
    },
    {
      title: "운영 전개",
      body: "한국 특구 개발 활동과 태국 블록체인 플랫폼 운영 및 진행 프로젝트를 함께 관리합니다.",
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
      label: "Nexus One corporation round",
      amount: "KRW 2,000,000,000",
      usd: "15% scheduled equity allocation",
      payment: "Subject to incorporation, diligence, and signed subscription agreement",
      details:
        "Investment condition reference for the new Korean corporation inheriting the Logiconfire Web3 development portfolio.",
      timing:
        "Scheduled while incorporation proceeds in the Busan Blockchain Special Zone.",
    },
    {
      label: "Prepaid card business",
      amount: "KRW 3,000,000,000",
      usd: "15% expected equity allocation",
      payment: "Registration and operation in progress",
      details:
        "Management describes the investment as in progress and close to confirmation; final allocation remains subject to signed documentation.",
      timing: "Business registration, operational preparation, and investment documentation are moving in parallel.",
    },
    {
      label: "Moden Members project",
      amount: "KRW 100,000,000",
      usd: "Separate equity allocation",
      payment: "Project development condition",
      details:
        "Project development amount is tracked separately from the Nexus One corporation round and prepaid card business investment.",
      timing: "Equity allocation and commercial terms to be confirmed in the project agreement.",
    },
  ],
  ko: [
    {
      label: "Nexus One 법인 투자 라운드",
      amount: "KRW 2,000,000,000",
      usd: "15% 지분 배정 예정",
      payment: "법인 설립, 실사, 최종 투자계약 체결을 전제로 함",
      details:
        "Logiconfire Web3 개발 포트폴리오를 승계하는 신규 한국 법인을 위한 투자 조건 레퍼런스입니다.",
      timing:
        "부산 블록체인 특구 내 법인 설립 진행과 함께 예정되어 있습니다.",
    },
    {
      label: "선불카드 사업",
      amount: "KRW 3,000,000,000",
      usd: "15% 지분 배정 예상",
      payment: "사업자 등록 및 운영 진행 중",
      details:
        "투자는 진행 중이며 거의 확정 단계로 설명되지만, 최종 배정은 서명된 문서에 따릅니다.",
      timing: "사업자 등록, 운영 준비, 투자 문서화가 병행되고 있습니다.",
    },
    {
      label: "Moden Members 프로젝트",
      amount: "KRW 100,000,000",
      usd: "지분 별도 배정",
      payment: "프로젝트 개발 조건",
      details:
        "프로젝트 개발 금액은 Nexus One 법인 라운드 및 선불카드 사업 투자와 별도로 관리됩니다.",
      timing: "지분 배정 및 상업 조건은 프로젝트 계약서에서 확정됩니다.",
    },
  ],
};

const timeline: Record<Locale, Array<[string, string]>> = {
  en: [
    ["Now", "Nexus One incorporation in progress in the Busan Blockchain Special Zone"],
    ["Round", "15% of KRW 2,000,000,000 scheduled for the new Korean corporation"],
    ["Portfolio", "RealSun, decentralized OTC, Lart NFC staking, and ILOVEKOREA.AI organized as major references"],
    ["Operations", "Korea special-zone development and Thailand blockchain platform operation structured under the holding company"],
    ["Review", "Thai BOI corporation cost and approval constraints documented for investor diligence"],
  ],
  ko: [
    ["현재", "Nexus One 법인 설립이 부산 블록체인 특구에서 진행 중"],
    ["라운드", "신규 한국 법인 기준 KRW 2,000,000,000의 15% 배정 예정"],
    ["포트폴리오", "RealSun, 탈중앙화 OTC, Lart NFC 스테이킹, ILOVEKOREA.AI를 주요 레퍼런스로 정리"],
    ["운영", "한국 특구 개발과 태국 블록체인 플랫폼 운영을 지주회사 구조로 연결"],
    ["검토", "태국 BOI 법인 비용 및 승인 제약을 투자자 실사 자료에 반영"],
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
  website?: string;
  screenshot: string;
  screenshotAlt: string;
  period: string;
  category: string;
  type: string;
  reference?: string;
  tags: ProjectTag[];
}> = [
  {
    name: "RealSun Solar NFC Platform",
    website: "https://realsun.info",
    screenshot: "/portfolio-screenshots/realsun-platform.png",
    screenshotAlt: "Screenshot of the RealSun Solar NFC Platform website",
    period: "Approximately 6 months",
    category: "Solar NFC Platform",
    type: "Major Portfolio",
    reference: "KRW 140,000,000 development-cost reference",
    tags: ["RWA", "Web3"],
  },
  {
    name: "Decentralized OTC Platform",
    screenshot: "/portfolio-screenshots/decentralized-otc.svg",
    screenshotAlt: "Preview card for the decentralized OTC platform",
    period: "Proprietary platform",
    category: "Decentralized OTC Platform",
    type: "Major Portfolio",
    reference: "Private platform reference",
    tags: ["DeFi", "Web3"],
  },
  {
    name: "Lart NFC and Staking Platform",
    website: "https://nft.lart.lol",
    screenshot: "/portfolio-screenshots/lost-tesla-art-nft.svg",
    screenshotAlt: "Preview card for Lart NFC and Staking Platform",
    period: "Approximately 2 months",
    category: "NFC + Staking Platform",
    type: "Major Portfolio",
    reference: "Proprietary platform reference",
    tags: ["NFT", "Web3"],
  },
  {
    name: "ILOVEKOREA.AI",
    website: "https://ilovekorea.ai",
    screenshot: "/portfolio-screenshots/ilovekorea-ai.png",
    screenshotAlt: "Screenshot of the ILOVEKOREA.AI website",
    period: "Approximately 4 months",
    category: "Real-Time Translation Community App",
    type: "Major Portfolio",
    reference: "Foreigner-to-merchant communication app",
    tags: ["AI"],
  },
  {
    name: "Prepaid Card Business",
    screenshot: "/portfolio-screenshots/hub-membership.svg",
    screenshotAlt: "Preview card for the prepaid card business",
    period: "Registration and operation in progress",
    category: "Prepaid Card Operation",
    type: "Ongoing Project",
    reference: "KRW 3,000,000,000 investment in progress",
    tags: ["FinTech"],
  },
  {
    name: "Moden Members",
    screenshot: "/portfolio-screenshots/simplepayx-erp.svg",
    screenshotAlt: "Preview card for the Moden Members project",
    period: "Development in progress",
    category: "Membership Platform",
    type: "Ongoing Project",
    reference: "KRW 100,000,000 development project",
    tags: ["Enterprise", "FinTech"],
  },
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
    ["Holding Company Structure", "Nexus One corporation formation in Busan"],
    ["Solar NFC and RWA", "RealSun platform and wallet references"],
    ["OTC and DeFi", "Proprietary OTC platform and BUYZONE Protocol"],
    ["NFC and Staking", "Lart NFC and staking platform"],
    ["AI Translation Commerce", "ILOVEKOREA.AI and AutoBlog"],
    ["FinTech Operations", "Prepaid card business and HUB Membership"],
    ["Enterprise Systems", "SimplePayX ERP and Moden Members"],
    ["Blockchain Infrastructure", "VAISEN Mainnet and wallet architecture"],
  ],
  ko: [
    ["지주회사 구조", "부산 내 Nexus One 법인 설립"],
    ["태양광 NFC 및 RWA", "RealSun 플랫폼 및 지갑 레퍼런스"],
    ["OTC 및 DeFi", "자체 OTC 플랫폼과 BUYZONE Protocol"],
    ["NFC 및 스테이킹", "Lart NFC 및 스테이킹 플랫폼"],
    ["AI 번역 커머스", "ILOVEKOREA.AI 및 AutoBlog"],
    ["핀테크 운영", "선불카드 사업과 HUB Membership"],
    ["엔터프라이즈 시스템", "SimplePayX ERP 및 Moden Members"],
    ["블록체인 인프라", "VAISEN Mainnet 및 지갑 아키텍처"],
  ],
};

const keywords: Record<Locale, string[]> = {
  en: [
    "Busan Blockchain Special Zone",
    "Portfolio inheritance",
    "Investment diligence",
    "Equity allocation",
    "Prepaid card operations",
    "NFC platforms",
    "OTC infrastructure",
    "Real-time translation",
    "Blockchain wallets",
    "Smart contracts",
    "EVM infrastructure",
    "Thailand platform operations",
  ],
  ko: [
    "부산 블록체인 특구",
    "포트폴리오 승계",
    "투자 실사",
    "지분 배정",
    "선불카드 운영",
    "NFC 플랫폼",
    "OTC 인프라",
    "실시간 번역",
    "블록체인 지갑",
    "스마트 컨트랙트",
    "EVM 인프라",
    "태국 플랫폼 운영",
  ],
};

const trustCards: Record<Locale, Array<[string, string]>> = {
  en: [
    [
      "Organized Portfolio",
      "Major references, ongoing projects, websites, and management-provided value references are separated for faster diligence.",
    ],
    [
      "Clear Corporation Basis",
      "Nexus One is presented as the new Korean corporation inheriting the Logiconfire Web3 development portfolio.",
    ],
    [
      "Korea and Thailand Operating Logic",
      "The company structure connects Busan Blockchain Special Zone development with Thailand blockchain platform operation.",
    ],
    [
      "Measured Investment Language",
      "Round values and equity allocations are stated as scheduled, expected, or subject to signed agreements where appropriate.",
    ],
  ],
  ko: [
    [
      "정리된 포트폴리오",
      "주요 레퍼런스, 진행 프로젝트, 웹사이트, 경영진 제공 금액 기준을 분리해 실사 속도를 높입니다.",
    ],
    [
      "명확한 법인 기준",
      "Nexus One은 Logiconfire Web3 개발 포트폴리오를 승계하는 신규 한국 법인으로 제시됩니다.",
    ],
    [
      "한국과 태국 운영 논리",
      "부산 블록체인 특구 개발과 태국 블록체인 플랫폼 운영을 하나의 지주회사 구조로 연결합니다.",
    ],
    [
      "신중한 투자 표현",
      "라운드 금액과 지분 배정은 예정, 예상 또는 최종 계약 조건부로 구분해 표기합니다.",
    ],
  ],
};

const securityItems: Record<Locale, string[]> = {
  en: [
    "Corporation formation status disclosed as in progress",
    "Investment terms subject to final signed agreements",
    "No return, interest, or appreciation promise",
    "Portfolio values treated as management-provided references",
    "BOI corporation costs and approval constraints disclosed",
    "Thailand operation structure requires jurisdictional review",
    "Equity allocations described as scheduled or expected",
    "Project-specific allocation separated from corporation round",
  ],
  ko: [
    "법인 설립 상태를 진행 중으로 표기",
    "투자 조건은 최종 서명 계약을 전제로 함",
    "수익, 이자, 가치 상승 약속 없음",
    "포트폴리오 금액은 경영진 제공 레퍼런스로 취급",
    "BOI 법인 비용 및 승인 제약 공개",
    "태국 운영 구조는 관할권 검토 필요",
    "지분 배정은 예정 또는 예상으로 구분",
    "프로젝트별 지분 배정은 법인 라운드와 분리",
  ],
};

const faqs: Record<Locale, Array<[string, string]>> = {
  en: [
    [
      "What is Nexus One?",
      "Nexus One is presented as a new Korean corporation in formation, intended to inherit the Web3 development portfolio of the existing Logiconfire sole proprietorship led by CEO Kim Dong-hyuk.",
    ],
    [
      "What is the proposed corporation round?",
      "The current reference is 15% of KRW 2,000,000,000 for the new Korean corporation, subject to incorporation progress, diligence, and final signed subscription documents.",
    ],
    [
      "Which projects are treated as major portfolio references?",
      "RealSun Solar NFC Platform, the proprietary decentralized OTC platform, Lart NFC and staking platform, and ILOVEKOREA.AI are organized as the major portfolio references.",
    ],
    [
      "What is the prepaid card business status?",
      "The prepaid card business registration and operation are described as in progress, with a KRW 3,000,000,000 investment in progress and 15% expected allocation, subject to final documentation.",
    ],
    [
      "How is the Thai BOI issue described?",
      "The page notes that BOI corporation approval is difficult, actual costs can be KRW 300,000,000 to 400,000,000, and comparable companies may trade at KRW 1,300,000,000 to 1,500,000,000 even without track record.",
    ],
    [
      "Does this page promise investment returns?",
      "No. Amounts, valuations, and equity allocations are presented as references, scheduled terms, or expected terms. Final investment rights depend on signed agreements and diligence.",
    ],
  ],
  ko: [
    [
      "Nexus One은 어떤 회사인가요?",
      "Nexus One은 김동혁 대표의 기존 Logiconfire 개인사업자 Web3 개발 포트폴리오를 승계하기 위한 신규 한국 법인으로 제시됩니다.",
    ],
    [
      "예정 법인 투자 라운드는 무엇인가요?",
      "현재 레퍼런스는 신규 한국 법인 기준 KRW 2,000,000,000의 15% 배정 예정이며, 법인 설립 진행, 실사, 최종 투자계약 체결을 전제로 합니다.",
    ],
    [
      "주요 포트폴리오 레퍼런스는 무엇인가요?",
      "RealSun Solar NFC Platform, 자체 탈중앙화 OTC 플랫폼, Lart NFC 및 스테이킹 플랫폼, ILOVEKOREA.AI를 주요 포트폴리오로 정리했습니다.",
    ],
    [
      "선불카드 사업 상태는 무엇인가요?",
      "선불카드 사업자 등록 및 운영은 진행 중이며, KRW 3,000,000,000 투자 진행과 15% 지분 배정 예상으로 표기했습니다. 최종 조건은 문서화가 필요합니다.",
    ],
    [
      "태국 BOI 이슈는 어떻게 설명하나요?",
      "BOI 법인 승인 난이도, 실제 비용 KRW 300,000,000-400,000,000 수준, 실적이 없어도 KRW 1,300,000,000-1,500,000,000 수준에서 거래되는 시장 상황을 실사 참고 정보로 설명합니다.",
    ],
    [
      "이 페이지가 투자 수익을 약속하나요?",
      "아니요. 금액, 가치, 지분 배정은 레퍼런스, 예정 조건 또는 예상 조건으로 제시되며 최종 권리는 서명 계약과 실사에 따릅니다.",
    ],
  ],
};

const requiredSolutions: Record<Locale, string[]> = {
  en: [
    "Nexus One corporation round",
    "Portfolio inheritance",
    "Prepaid card business",
    "Moden Members project",
    "Thailand BOI and platform operation",
  ],
  ko: [
    "Nexus One 법인 라운드",
    "포트폴리오 승계",
    "선불카드 사업",
    "Moden Members 프로젝트",
    "태국 BOI 및 플랫폼 운영",
  ],
};

const diligenceRows: Record<Locale, Array<[string, string, string, string]>> = {
  en: [
    ["Corporation", "In progress", "Busan Blockchain Special Zone", "Formation"],
    ["Round", "Scheduled", "KRW 2B / 15%", "Terms"],
    ["Portfolio", "Organized", "Logiconfire inheritance", "Reference"],
    ["Prepaid card", "In progress", "KRW 3B / 15% expected", "Ongoing"],
    ["Thailand BOI", "Diligence", "Cost and approval constraints", "Risk"],
  ],
  ko: [
    ["법인", "진행 중", "부산 블록체인 특구", "설립"],
    ["라운드", "예정", "KRW 20억 / 15%", "조건"],
    ["포트폴리오", "정리됨", "Logiconfire 승계", "레퍼런스"],
    ["선불카드", "진행 중", "KRW 30억 / 15% 예상", "진행"],
    ["태국 BOI", "실사", "비용 및 승인 제약", "리스크"],
  ],
};

const projectCategoryKo: Record<string, string> = {
  "Solar NFC Platform": "태양광 NFC 플랫폼",
  "Decentralized OTC Platform": "탈중앙화 OTC 플랫폼",
  "NFC + Staking Platform": "NFC + 스테이킹 플랫폼",
  "Real-Time Translation Community App": "실시간 번역 커뮤니티 앱",
  "Prepaid Card Operation": "선불카드 운영",
  "Membership Platform": "멤버십 플랫폼",
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
  "Major Portfolio": "주요 포트폴리오",
  "Ongoing Project": "진행 프로젝트",
  "Blockchain Infrastructure": "블록체인 인프라",
  "AI + Web Platform": "AI + 웹 플랫폼",
  Web3: "Web3",
  "Web2 + AI": "Web2 + AI",
  "Enterprise Solution": "엔터프라이즈 솔루션",
  FinTech: "핀테크",
};

const projectPeriodKo: Record<string, string> = {
  "Proprietary platform": "자체 플랫폼",
  "Registration and operation in progress": "사업자 등록 및 운영 진행 중",
  "Development in progress": "개발 진행 중",
  "Approximately 12 months": "약 12개월",
  "Approximately 6 months": "약 6개월",
  "Approximately 5 months": "약 5개월",
  "Approximately 4 months": "약 4개월",
  "Approximately 3 months": "약 3개월",
  "Approximately 2 months": "약 2개월",
};

const projectReferenceKo: Record<string, string> = {
  "KRW 140,000,000 development-cost reference": "KRW 140,000,000 개발비 레퍼런스",
  "Private platform reference": "비공개 자체 플랫폼 레퍼런스",
  "Proprietary platform reference": "자체 플랫폼 레퍼런스",
  "Foreigner-to-merchant communication app": "외국인-상점 실시간 커뮤니케이션 앱",
  "KRW 3,000,000,000 investment in progress": "KRW 3,000,000,000 투자 진행 중",
  "KRW 100,000,000 development project": "KRW 100,000,000 개발 프로젝트",
};

const copy = {
  en: {
    skip: "Skip to main content",
    navCta: "Request Diligence",
    navPrimary: "Discuss Investment",
    hero: {
      kicker: "Korean investment reference for Web3 portfolio diligence",
      title: "Nexus One",
      accent: "Web3 Portfolio Holding Company",
      lead:
        "A new Korean corporation in formation, organized to inherit Logiconfire's Web3 development portfolio and operate blockchain platform opportunities across Korea and Thailand.",
      primary: "Request Diligence",
      secondary: "View Portfolio",
    },
    terminal: {
      label: "Nexus One diligence terminal",
      topline: "Investor diligence console",
      proof: "Portfolio proof",
      metricOneLabel: "Round reference",
      metricOneValue: "KRW 2B",
      metricTwoLabel: "Equity reference",
      metricTwoValue: "15%",
      columns: ["Workstream", "Status", "Evidence", "Signal"],
      footer: "Korea and Thailand operating structure",
      final: "Final terms subject to signed agreement",
    },
    sections: {
      solutionKicker: "Corporation overview",
      solutionTitle: "New Korean Corporation for Web3 Portfolio Operations",
      solutionBody:
        "Nexus One is organized as a Korean corporation inheriting Logiconfire's Web3 development portfolio, with incorporation in progress in the Busan Blockchain Special Zone.",
      payBody:
        "Corporate structure and portfolio inheritance basis for Korean investor diligence.",
      mallBody:
        "Operating portfolio spanning Korea development-zone activity, Thailand platform operation, and current investment-linked projects.",
      customKicker: "Execution path",
      customTitle: "From Portfolio Transfer to Operating Holding Company",
      customBody:
        "The portfolio is being organized for investor review while corporation formation, round documentation, and current project execution continue.",
      timeLabel: "Primary formation location",
      timeValue: "Busan Blockchain Special Zone",
      timeBody:
        "The corporation is described as in progress. Timing, rights, and allocations remain subject to incorporation status, diligence, and final agreements.",
      termsKicker: "Investment conditions",
      termsTitle: "Structured Reference Terms for Korean Investors",
      termsBody:
        "Investment amounts, equity allocations, and project values are presented as management-provided references unless confirmed in signed agreements.",
      exchangeLabel: "BOI reference note",
      exchangeValue: "Thai BOI corporation approval is difficult and cost-intensive.",
      compliance:
        "This page is a portfolio and investment reference surface. It does not promise returns, interest, profit, appreciation, regulatory approval, or investment completion. Final conditions require legal, tax, compliance, corporate, and investment-document review.",
      timelineKicker: "Current status",
      timelineTitle: "Corporation and Portfolio Roadmap",
      timelineDisclaimer:
        "BOI corporation approval in Thailand is described as difficult, with actual costs alone estimated at KRW 300,000,000 to 400,000,000. Comparable companies may trade around KRW 1,300,000,000 to 1,500,000,000 even without track record, subject to market conditions and diligence.",
      portfolioKicker: "Organized portfolio",
      portfolioTitle: "Major References and Current Projects",
      portfolioBody:
        "Major references include RealSun, decentralized OTC, Lart NFC staking, and ILOVEKOREA.AI. Additional portfolio items are retained as supporting technology references.",
      techKicker: "Technology expertise",
      techTitle: "Capabilities Behind the Portfolio",
      trustKicker: "Decision factors",
      trustTitle: "Why the Structure Is Diligence-Ready",
      securityKicker: "Risk and compliance",
      securityTitle: "Responsible Investment Framing",
      securityBody:
        "Availability of corporate, platform, payment, wallet, blockchain, token, BOI, or settlement functions may depend on the laws, licensing requirements, approvals, and regulatory rules of each operating jurisdiction.",
      faqKicker: "Investor questions",
      faqTitle: "Common Questions",
    },
    termsLabels: {
      payment: "Condition",
      description: "Description",
      timing: "Current timing",
    },
      portfolioLabels: {
        period: "Development period",
        category: "Category",
        website: "Website",
        reference: "Reference",
        private: "Private / proprietary",
        noLink: "No public link",
        otherTitle: "Other Portfolio References",
        otherBody: "Supporting technology references are listed compactly for review after the four major portfolio items.",
        action: "View Project",
      },
    contact: {
      kicker: "Investor intake",
      title: "Request the Nexus One Diligence Pack",
      body:
        "Share your investor profile, required materials, and questions about the corporation round, portfolio inheritance, or Thailand operating structure.",
      proposal: "Request Materials",
      consult: "Discuss Terms",
      name: "Name",
      company: "Company",
      email: "Email",
      phone: "Phone or Messenger",
      country: "Country",
      launchDate: "Expected review date",
      required: "Diligence topic",
      select: "Select a topic",
      requirements: "Questions or required materials",
      acknowledgement:
        "I understand that listed amounts and equity allocations are references, scheduled terms, or expected terms, and final rights require signed agreements.",
      loading: "Preparing brief...",
      submit: "Prepare Diligence Brief",
      success:
        "Diligence brief prepared on this page. Connect an approved email or CRM endpoint before using this form for live submissions.",
    },
    validation: {
      requiredSolution: "a diligence topic",
      requiredPrefix: "Please enter",
      email: "Email needs a valid format, for example name@company.com.",
      acknowledgement:
        "Please confirm that final rights require signed agreements.",
      fields: {
        name: "name",
        company: "company",
        email: "email",
        country: "country",
        requirements: "questions or required materials",
      },
    },
    footer:
      "Nexus One corporation formation, Web3 portfolio inheritance, Korean investor diligence, and Thailand blockchain platform operations.",
    footerLinks: [
      "Corporation",
      "Portfolio",
      "Investment Terms",
      "Portfolio",
      "Privacy Policy",
      "Terms of Service",
      "Risk and Compliance Notice",
      "Contact Information",
    ],
  },
  ko: {
    skip: "본문으로 바로가기",
    navCta: "실사 자료 요청",
    navPrimary: "투자 논의",
    hero: {
      kicker: "한국 투자자 실사용 Web3 포트폴리오 레퍼런스",
      title: "Nexus One",
      accent: "Web3 포트폴리오 지주회사",
      lead:
        "Nexus One은 Logiconfire Web3 개발 자산을 승계해 부산 블록체인 특구 개발과 태국 플랫폼 운영을 연결하는 신규 한국 법인입니다.",
      primary: "실사 자료 요청",
      secondary: "포트폴리오 보기",
    },
    terminal: {
      label: "Nexus One 실사 터미널",
      topline: "투자자 실사 콘솔",
      proof: "포트폴리오 근거",
      metricOneLabel: "라운드 기준",
      metricOneValue: "KRW 20억",
      metricTwoLabel: "지분 기준",
      metricTwoValue: "15%",
      columns: ["업무 영역", "상태", "근거", "신호"],
      footer: "한국 및 태국 운영 구조",
      final: "최종 조건은 서명 계약 기준",
    },
    sections: {
      solutionKicker: "법인 개요",
      solutionTitle: "Web3 포트폴리오 운영을 위한 신규 한국 법인",
      solutionBody:
        "Nexus One은 Logiconfire의 Web3 개발 포트폴리오를 승계하는 한국 법인입니다. 현재 부산 블록체인 특구 내 설립 절차가 진행 중입니다.",
      payBody:
        "한국 투자자 실사를 위한 법인 구조와 포트폴리오 승계 기준입니다.",
      mallBody:
        "한국 특구 개발, 태국 플랫폼 운영, 투자 연계 진행 프로젝트를 포함하는 운영 포트폴리오입니다.",
      customKicker: "실행 경로",
      customTitle: "포트폴리오 승계와 지주회사 운영",
      customBody:
        "법인 설립, 라운드 문서화, 현재 진행 프로젝트가 병행되는 동안 포트폴리오를 투자자 검토용으로 정리합니다.",
      timeLabel: "주요 설립 지역",
      timeValue: "부산 블록체인 특구",
      timeBody:
        "법인은 설립 진행 중으로 설명됩니다. 일정, 권리, 지분 배정은 법인 설립 상태, 실사, 최종 계약에 따릅니다.",
      termsKicker: "투자 조건",
      termsTitle: "현재 검토 중인 투자 조건",
      termsBody:
        "아래 금액과 지분율은 투자 검토용 기준입니다. 최종 권리와 조건은 법인 설립, 실사, 서명 계약을 통해 확정됩니다.",
      exchangeLabel: "BOI 참고 사항",
      exchangeValue: "태국 BOI 법인은 승인 난이도와 실제 비용 부담이 큰 구조입니다.",
      compliance:
        "본 페이지는 투자 권유서가 아니라 포트폴리오 및 조건 정리 자료입니다. 수익, 이자, 가치 상승, 규제 승인, 투자 완료를 약속하지 않으며 최종 조건은 법률, 세무, 컴플라이언스, 법인, 투자 문서 검토가 필요합니다.",
      timelineKicker: "현재 상태",
      timelineTitle: "법인 및 포트폴리오 로드맵",
      timelineDisclaimer:
        "태국 BOI 법인 승인은 어렵고 실제 비용만 KRW 300,000,000-400,000,000 수준으로 설명됩니다. 실적이 없는 법인도 KRW 1,300,000,000-1,500,000,000 수준에서 거래될 수 있다는 시장 참고 정보는 조건과 실사에 따라 달라질 수 있습니다.",
      portfolioKicker: "정리된 포트폴리오",
      portfolioTitle: "주요 레퍼런스 및 현재 진행 프로젝트",
      portfolioBody:
        "주요 4개 레퍼런스를 먼저 검토하고, 그 외 프로젝트는 기술 이력으로 간결하게 확인할 수 있도록 정리했습니다.",
      techKicker: "기술 전문성",
      techTitle: "포트폴리오를 뒷받침하는 기술 역량",
      trustKicker: "의사결정 기준",
      trustTitle: "실사 가능한 구조로 정리된 이유",
      securityKicker: "리스크 및 컴플라이언스",
      securityTitle: "책임 있는 투자 설명 방식",
      securityBody:
        "법인, 플랫폼, 결제, 지갑, 블록체인, 토큰, BOI, 정산 기능의 제공 가능 여부는 각 운영 관할권의 법률, 라이선스 요건, 승인, 규제 규칙에 따라 달라질 수 있습니다.",
      faqKicker: "투자자 질문",
      faqTitle: "자주 묻는 질문",
    },
    termsLabels: {
      payment: "조건",
      description: "설명",
      timing: "현재 시점",
    },
      portfolioLabels: {
        period: "개발 기간",
        category: "카테고리",
        website: "웹사이트",
        reference: "레퍼런스",
        private: "비공개 / 자체 플랫폼",
        noLink: "공개 링크 없음",
        otherTitle: "기타 포트폴리오 레퍼런스",
        otherBody: "주요 4개 항목 이후 검토할 수 있는 보조 기술 이력입니다.",
        action: "프로젝트 보기",
      },
    contact: {
      kicker: "투자자 문의",
      title: "Nexus One 실사 자료 요청",
      body:
        "투자자 프로필, 필요한 자료, 법인 라운드, 포트폴리오 승계, 태국 운영 구조에 대한 질문을 남겨주세요.",
      proposal: "자료 요청",
      consult: "조건 논의",
      name: "이름",
      company: "회사",
      email: "이메일",
      phone: "전화 또는 메신저",
      country: "국가",
      launchDate: "예상 검토일",
      required: "실사 주제",
      select: "주제 선택",
      requirements: "질문 또는 필요한 자료",
      acknowledgement:
        "표시된 금액과 지분 배정은 레퍼런스, 예정 조건 또는 예상 조건이며 최종 권리는 서명 계약이 필요함을 이해합니다.",
      loading: "브리프 준비 중...",
      submit: "실사 브리프 준비",
      success:
        "실사 브리프가 이 페이지에서 준비되었습니다. 실제 제출용으로 사용하기 전 승인된 이메일 또는 CRM 엔드포인트를 연결하세요.",
    },
    validation: {
      requiredSolution: "실사 주제",
      requiredPrefix: "입력해 주세요:",
      email: "올바른 이메일 형식이 필요합니다. 예: name@company.com",
      acknowledgement:
        "최종 권리가 서명 계약을 통해 확정됨을 확인해 주세요.",
      fields: {
        name: "이름",
        company: "회사",
        email: "이메일",
        country: "국가",
        requirements: "질문 또는 필요한 자료",
      },
    },
    footer:
      "Nexus One 법인 설립, Web3 포트폴리오 승계, 한국 투자자 실사, 태국 블록체인 플랫폼 운영.",
    footerLinks: [
      "법인 구조",
      "포트폴리오",
      "투자 조건",
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
  name: "Nexus One",
  url: "https://new-landingpages-test-ui-ai-speednano.vercel.app",
  description:
    "Nexus One is a new Korean corporation in formation for Web3 portfolio inheritance, Busan Blockchain Special Zone development, and Thailand blockchain platform operations.",
  sameAs: projects.flatMap((project) => (project.website ? [project.website] : [])),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Investor diligence",
    availableLanguage: ["English", "Korean"],
  },
};

const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Nexus One Web3 Portfolio References",
  itemListElement: projects.slice(0, 6).map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: project.name,
    url: project.website,
    description: project.reference ?? project.category,
  })),
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

function motionIndex(index: number): CSSProperties {
  return { "--i": index } as CSSProperties;
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

  const majorProjects = filteredProjects.filter(
    (project) => project.type === "Major Portfolio",
  );
  const supportingProjects = filteredProjects.filter(
    (project) => project.type !== "Major Portfolio",
  );

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
          __html: JSON.stringify([organizationSchema, portfolioSchema]),
        }}
      />
      <a className="skip-link" href="#main-content">
        {t.skip}
      </a>
      <div className="site-shell">
        <header className="nav-wrap">
          <a className="brand" href="#home" aria-label="Nexus One home">
            <span className="brand-mark">N</span>
            <span>Nexus One</span>
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
                {heroHighlights[locale].map((item, index) => (
                  <span key={item} style={motionIndex(index)}>
                    {item}
                  </span>
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
                {diligenceRows[locale].map(([workstream, rowStatus, evidence, signal], index) => (
                  <div
                    role="row"
                    className="terminal-row"
                    key={workstream}
                    style={motionIndex(index + 1)}
                  >
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

            <div className="metric-strip" aria-label="Nexus One operating metrics">
              {metrics[locale].map(([value, label], index) => (
                <div key={label} style={motionIndex(index)}>
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
              <article className="solution-card" style={motionIndex(0)}>
                <span className="card-index">01</span>
                <h3>Nexus One Corporation</h3>
                <p>{t.sections.payBody}</p>
                <FeatureList items={payFeatures[locale]} />
              </article>
              <article className="solution-card dark-card" style={motionIndex(1)}>
                <span className="card-index">02</span>
                <h3>Portfolio Operations</h3>
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
                <article className="process-card" key={step.title} style={motionIndex(index)}>
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
              {commercialTerms[locale].map((term, index) => (
                <article className="term-card" key={term.label} style={motionIndex(index)}>
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
              {timeline[locale].map(([day, item], index) => (
                <article className="timeline-item" key={day} style={motionIndex(index)}>
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
                {filters.map((filter, index) => (
                  <button
                    className={filter.value === activeFilter ? "active" : ""}
                    key={filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    type="button"
                    aria-pressed={filter.value === activeFilter}
                    style={motionIndex(index)}
                  >
                    {filter[locale]}
                  </button>
                ))}
              </div>
            </div>
            <div className="portfolio-grid">
              {majorProjects.map((project, index) => (
                <article
                  className="portfolio-card"
                  key={project.name}
                  style={motionIndex(index)}
                >
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
                      <dd>
                        {project.website
                          ? project.website.replace("https://", "")
                          : project.type === "Major Portfolio"
                            ? t.portfolioLabels.private
                            : t.portfolioLabels.noLink}
                      </dd>
                    </div>
                    {project.reference ? (
                      <div>
                        <dt>{t.portfolioLabels.reference}</dt>
                        <dd>
                          {localizeProjectValue(
                            project.reference,
                            locale,
                            projectReferenceKo,
                          )}
                        </dd>
                      </div>
                    ) : null}
                  </dl>
                  {project.website ? (
                    <a href={project.website} rel="noreferrer" target="_blank">
                      {t.portfolioLabels.action}
                    </a>
                  ) : (
                    <p className="portfolio-private">
                      {project.type === "Major Portfolio"
                        ? t.portfolioLabels.private
                        : t.portfolioLabels.noLink}
                    </p>
                  )}
                </article>
              ))}
            </div>
            {supportingProjects.length > 0 ? (
              <div className="other-portfolio">
                <div className="other-portfolio-head">
                  <h3>{t.portfolioLabels.otherTitle}</h3>
                  <p>{t.portfolioLabels.otherBody}</p>
                </div>
                <div className="other-reference-grid">
                  {supportingProjects.map((project, index) => (
                    <article
                      className="other-reference-card"
                      key={project.name}
                      style={motionIndex(index)}
                    >
                      <span>
                        {localizeProjectValue(project.type, locale, projectTypeKo)}
                      </span>
                      <h4>{project.name}</h4>
                      <p>
                        {localizeProjectValue(
                          project.category,
                          locale,
                          projectCategoryKo,
                        )}
                      </p>
                      <div className="other-reference-meta">
                        <strong>
                          {localizeProjectValue(
                            project.period,
                            locale,
                            projectPeriodKo,
                          )}
                        </strong>
                        {project.reference ? (
                          <em>
                            {localizeProjectValue(
                              project.reference,
                              locale,
                              projectReferenceKo,
                            )}
                          </em>
                        ) : null}
                      </div>
                      {project.website ? (
                        <a href={project.website} rel="noreferrer" target="_blank">
                          {project.website.replace("https://", "")}
                        </a>
                      ) : (
                        <p className="portfolio-private">
                          {project.type === "Major Portfolio"
                            ? t.portfolioLabels.private
                            : t.portfolioLabels.noLink}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </section>

          <section className="section split-section" id="technology">
            <SectionHeading
              align="left"
              kicker={t.sections.techKicker}
              title={t.sections.techTitle}
            />
            <div className="capability-grid">
              {capabilities[locale].map(([title, body], index) => (
                <article className="capability-card" key={title} style={motionIndex(index)}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            <div className="keyword-cloud" aria-label="Technical keywords">
              {keywords[locale].map((keyword, index) => (
                <span key={keyword} style={motionIndex(index)}>
                  {keyword}
                </span>
              ))}
            </div>
          </section>

          <section className="section paper-section">
            <SectionHeading
              kicker={t.sections.trustKicker}
              title={t.sections.trustTitle}
            />
            <div className="trust-grid">
              {trustCards[locale].map(([title, body], index) => (
                <article className="trust-card" key={title} style={motionIndex(index)}>
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
              {securityItems[locale].map((item, index) => (
                <span key={item} style={motionIndex(index)}>
                  {item}
                </span>
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
              {faqs[locale].map(([question, answer], index) => (
                <details key={question} style={motionIndex(index)}>
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
            <a className="brand" href="#home" aria-label="Nexus One home">
              <span className="brand-mark">N</span>
              <span>Nexus One</span>
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
