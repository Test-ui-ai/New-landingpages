---
name: NanoCapital
description: Black-and-white institutional landing page for payment, commerce, AI, and Web3 software delivery.
colors:
  black: "#050608"
  carbon: "#16181d"
  carbon-2: "#202329"
  paper: "#f7f7f2"
  white: "#ffffff"
  ink: "#101114"
  muted: "#60646f"
  line: "#d7d9de"
  blue: "#2457d6"
  cyan: "#8bd8cf"
  success: "#137b65"
  error: "#c5354f"
typography:
  display:
    fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif"
    fontSize: "clamp(3rem, 7vw, 6.6rem)"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "0"
  headline:
    fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif"
    fontSize: "clamp(2rem, 4.6vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "0"
  title:
    fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 800
    lineHeight: 1.2
  body:
    fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 900
    letterSpacing: "0.06em"
rounded:
  xs: "3px"
  sm: "4px"
  md: "8px"
  lg: "10px"
  full: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "34px"
  section-min: "72px"
  section-max: "118px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "40px"
    typography: "{typography.label}"
  button-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "40px"
    typography: "{typography.label}"
  card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "24px"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
    height: "46px"
  chip:
    backgroundColor: "{colors.white}"
    textColor: "{colors.blue}"
    rounded: "{rounded.md}"
    padding: "7px 10px"
---

# Design System: NanoCapital

## 1. Overview

**Creative North Star: "The Investor Control Room"**

NanoCapital's interface is a credible fintech control room translated into a public landing page. The system uses near-black operating surfaces, institutional paper sections, rare blue actions, cyan verification signals, and dashboard-style artifacts to make payment, commerce, AI, and Web3 claims feel operational rather than speculative.

The mood is reliable, experienced, and skilled. The page can look technically ambitious, but it must never sound inflated or anonymous. It rejects anything that feels like a scam, a beginner portfolio, a speculative crypto pitch, or a generic Web3 template.

**Key Characteristics:**
- Black-and-white institutional framing with rare operational accents.
- Dense proof sections balanced by clear commercial structure.
- Rectangular, disciplined surfaces with an 8px to 10px radius range.
- Korean-language priority: text containers must tolerate longer Korean copy without overflow.
- Motion is present but restrained, with reduced-motion support required.

## 2. Colors

The palette is a black-and-white institutional system with blue and cyan used as trust signals, not decoration.

### Primary
- **Near Black**: The page's institutional base. Use for the body background, hero, footer, and dark bands.
- **Operational Blue**: The primary action and selected-state color. Use for CTAs, active filters, links, and proof accents.

### Secondary
- **Signal Cyan**: A live-system accent. Use for hero labels, dashboard status, highlight lines, and dark-section contrast.

### Neutral
- **Investor Ink**: Primary text on light sections.
- **Due-Diligence Muted**: Secondary copy and descriptions on light backgrounds.
- **Audit Line**: Borders, form strokes, and panel separators.
- **Institutional Paper**: The primary light reading surface.
- **White Panel**: Cards, forms, FAQ surfaces, and content panels.
- **Carbon Surface**: Terminal panels, dark cards, and infrastructure surfaces.

### Named Rules

**The Trust Signal Rule.** Blue and cyan must point to action, status, proof, or structure. If an accent does not clarify the investor story, remove it.

**The No-Hype Gradient Rule.** Gradients are allowed for tiny data signals only. Never use gradient text or decorative color noise.

## 3. Typography

**Display Font:** Geist Sans via `var(--font-geist-sans)` with Arial/Helvetica fallback.
**Body Font:** Geist Sans via `var(--font-geist-sans)` with Arial/Helvetica fallback.
**Label/Mono Font:** No separate mono family is used.

**Character:** The single-family system is direct and operational. Weight, scale, and spacing create authority; the absence of a decorative type pairing helps the page avoid crypto-theater.

### Hierarchy
- **Display** (800, `clamp(3rem, 7vw, 6.6rem)`, 0.96): Hero headlines only. Keep letter spacing at `0` and check mobile line breaks.
- **Headline** (800, `clamp(2rem, 4.6vw, 4rem)`, 1.02): Section titles and the final CTA.
- **Title** (800, `1.35rem`, 1.2): Card titles, term headings, and portfolio entries.
- **Body** (400, `1rem`, 1.65): Explanatory copy, descriptions, FAQs, and form support text. Keep long prose readable and avoid gray that fails contrast.
- **Label** (900, `0.78rem`, `0.06em`): Short metadata, terms labels, badges, and uppercase section signals.

### Named Rules

**The Korean First-Class Rule.** Any future Korean copy must be tested in the same containers as English. Do not let labels, buttons, filters, or nav links rely on short English word lengths.

## 4. Elevation

NanoCapital uses a hybrid elevation system: white content panels lift from paper backgrounds with a broad ambient shadow, while dark terminal artifacts use surface lightness, borders, and restrained shadows. Depth should feel like layered software infrastructure, not floating marketing cards.

### Shadow Vocabulary
- **Ambient Panel** (`0 24px 70px rgba(10, 24, 45, 0.16)`): Main cards, forms, term blocks, and proof containers.
- **CTA Glow** (`0 16px 34px rgba(29, 100, 255, 0.25)`): Primary action buttons.
- **Hero Frame** (`0 28px 90px rgba(0, 0, 0, 0.22)`): The hero terminal visual.
- **FAQ Low Lift** (`0 12px 36px rgba(10, 24, 45, 0.08)`): Accordions and lower-emphasis panels.

### Named Rules

**The Evidence Over Ornament Rule.** Elevation must separate proof, terms, forms, or dashboard artifacts. Never add shadows only to make a section feel premium.

## 5. Components

### Buttons
- **Shape:** Disciplined rectangle with gently curved corners (8px).
- **Primary:** Solid Operational Blue, white text, heavy label weight, 44px default height or 52px large height.
- **Hover / Focus:** Small upward transform and visible state change. Keep the interaction calm and quick.
- **Secondary:** White or translucent surface with a clear border. On dark areas it uses translucent white; on light areas it uses a white fill and ink text.

### Chips
- **Style:** Small rectangular tags with 8px corners, strong label weight, and either pale-blue-on-blue or translucent-white-on-dark treatment.
- **State:** Active filters invert into solid Operational Blue with white text. Never use ambiguous low-contrast active states.

### Cards / Containers
- **Corner Style:** 8px for controls, 10px for larger panels, 4px for the brand mark, and 3px for tiny data bars.
- **Background:** White panels on paper sections; carbon panels inside the dark hero visual.
- **Shadow Strategy:** Use Ambient Panel for main content, Dashboard Card for hero artifacts, and FAQ Low Lift for accordions.
- **Border:** Light sections use Audit Line. Dark sections use low-opacity white borders.
- **Internal Padding:** 24px is the standard card padding; larger solution cards may expand to 36px.

### Inputs / Fields
- **Style:** White fields, Audit Line border, 8px radius, 46px minimum height.
- **Focus:** Maintain a clear border/focus-visible treatment; do not rely on color alone.
- **Error / Disabled:** Errors use the existing red error color and inline helper copy. Disabled states must remain readable.

### Navigation
- **Style:** Sticky near-black bar with a translucent backdrop blur and white text. The brand mark is outlined, while nav links stay quiet until hover or focus.
- **Mobile Treatment:** Navigation and actions may scroll horizontally above tablet widths; on mobile, action buttons become full-width and the language switch centers.

### Dashboard Visual

The hero terminal is the signature proof metaphor. It uses layered dark rows, live status labels, readiness tables, bar signals, and a cyan verification pulse to show operational competence. Keep it specific to payments, commerce, settlement, and USDT readiness; never let it become an abstract generic tech illustration.

## 6. Do's and Don'ts

### Do:
- **Do** use Near Black, Institutional Paper, Operational Blue, and Signal Cyan to communicate a serious technical company rather than a speculative token project.
- **Do** preserve the 8px to 10px radius system across cards, buttons, fields, badges, accordions, and dashboard artifacts.
- **Do** make commercial terms, compliance notes, and portfolio proof visually easy to scan.
- **Do** test Korean-first copy in nav, filters, buttons, forms, and card headings before shipping.
- **Do** keep reduced-motion behavior intact for every animation and transition.

### Don't:
- **Don't** make the site feel like a scam, a beginner portfolio, a speculative crypto pitch, a generic Web3 template, or a vague agency page.
- **Don't** use exaggerated return language, hype-heavy token language, fake urgency, anonymous-looking visuals, or anything that weakens trust.
- **Don't** use gradient text, oversized rounded cards, side-stripe card accents, decorative grid backgrounds, or repeated generic card grids as filler.
- **Don't** let USDT or Web3 language visually dominate the investor story; they are capabilities and payment mechanics, not hype objects.
- **Don't** ship English-only layout assumptions when Korean is the priority language.
