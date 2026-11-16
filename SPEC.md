# Brand Specification: TENSILE

- **Audience / Primary Persona:** Liam, 27, Industrial Designer. Needs a crisp, heavyweight white tee that stays structured under structured overshirts.
- **Audience / Secondary Persona:** Maya, 22, Studio Printmaker. Looks for durable, tight-knit fabric with precise sizing and dimensional measurements.
- **Brand Name:** TENSILE
- **Brand Promise (Hypothetical Concept):** "Engineered hypothetical 280 GSM heavyweight cotton. Designed to hold its structure, resist collar distortion, and avoid sheer show-through (hypothetical classroom concept specification; unverified)."
- **Brand Archetype:** The Creator / The Craftsman
- **Voice Traits:** Precise, Architectural, Unembellished

---

# T-Shirt Research

## 0. Research Question & Evidence Separation Policy

- **Research Question:** How do established minimalist and heavyweight T-shirt storefronts present fabric density, collar construction, and sizing data to reduce buyer uncertainty on mobile and desktop screens?
- **Separation of Evidence vs. Assumptions:** All observations labeled **Observed Competitor Fact** come directly from the linked product pages below. All **TENSILE** product specifications (280 GSM weight, `<1%` shrinkage tolerance, `1.25"` bound ribbing collar, and $42 USD price) are explicitly **hypothetical classroom concept assumptions** and are not lab-verified commercial claims.

---

## 1. Competitor Analysis & Teardowns

### Site 1: Lady White Co. — Rugby T-Shirt (White)

- **Exact Source Page:** [Lady White Co. Rugby T-Shirt – White (LW-T130-WHT)](https://ladywhiteco.com/products/rugby-t-shirt-white) — Accessed Nov 6, 2026
- **Observed Competitor Fact (Evidence):** Lists concrete material and construction facts directly in the product description: custom 10-ounce heavy jersey, 100% US cotton, preshrunk, high set-in collar, wide boxy proportions, and knit/cut/sewn in Los Angeles, CA at $100 USD.
- **Proposed TENSILE Design Decision (Hypothetical / Assumption):** Technical clarity and explicit material specs establish immediate credibility with structural minimalist shoppers. For TENSILE ($42 USD concept price), we adopt a transparent specification block featuring a hypothetical 280 GSM combed cotton weight (labeled as a classroom concept spec rather than a verified laboratory test).

### Site 2: Los Angeles Apparel — Style 1801GD 6.5oz Crew Neck T-Shirt

- **Exact Source Page:** [Los Angeles Apparel 1801GD 6.5oz Garment Dye Crew Neck T-Shirt](https://losangelesapparel.net/products/1801gd-6-5oz-garment-dye-pastel-crew-neck-t-shirt) — Accessed Nov 6, 2026
- **Observed Competitor Fact (Evidence):** Uses stark, high-contrast studio photography on neutral backgrounds, states the exact fabric weight (`6.5oz`) in the product title, and notes a higher, snug crew neckline alongside cold-wash care instructions.
- **Proposed TENSILE Design Decision (Hypothetical / Assumption):** A high-contrast utilitarian visual grid (`#0f172a` slate ink on `#f8fafc` paper) reinforces garment structure without promotional clutter.

### Site 3: Uniqlo U — Unisex U Crew Neck Short-Sleeve T-Shirt

- **Exact Source Page:** [Uniqlo U Crew Neck Short-Sleeve T-Shirt (Product ID 422992 / 475356)](https://www.uniqlo.com/us/en/products/E422992-001/00) — Accessed Nov 6, 2026
- **Observed Competitor Fact (Evidence):** Explicitly calls out heavyweight 100% cotton jersey made with thick yarn, collar binding that helps the neckline maintain its shape wear after wear, an opacity indicator (`Sheer: Not Sheer`), and detailed size/fit guidance at $19.90–$34.90 USD.
- **Proposed TENSILE Design Decision (Hypothetical / Assumption):** Digital apparel storefronts must provide unambiguous physical sizing metrics (chest pit-to-pit from 21" to 25.5" for S–XL) and explicit collar construction details to prevent shopper uncertainty.

---

## 2. Market Positioning & Audience Hypotheses

### Positioning Comparison

- **Position A (Disposable Commodity):** High-volume multipacks (140–160 GSM) priced under $20. Focuses on low friction, rapid replacement, and lightweight sheer drape.
- **Position B (Architectural Essential — Selected for TENSILE):** Single heavyweight (hypothetical 280 GSM) combed cotton t-shirt priced at $42 USD. Focuses on a boxy drop-shoulder silhouette and collar shape retention as a hypothetical concept product.

### Persona Hypotheses

- **Persona 1 (The Seasonal Fast-Fashion Buyer — Not Selected):** Buys bulk multipacks for convenience; views t-shirts as hidden undershirts; accepts frequent color fading and collar baconing.
- **Persona 2 (The Structural Minimalist — Selected Audience):** Design-conscious students and young professionals (ages 19–28) who prioritize modular capsule wardrobes and durable streetwear staples.

---

## 3. Brand Identity & Honest Persuasion

- **Look & Feel:** High-contrast neutral palette (`#0f172a` deep slate, `#f8fafc` crisp off-white, `#64748b` border slate), clean geometric sans-serif typography, and modular grid cards.
- **Brand Character:** Durable, functional, restrained, unembellished.
- **Honest Persuasion Principles Applied:**
  1. _Empirical Specification & Honest Disclosure:_ Clearly labeling the 280 GSM fabric weight, `1.25"` collar ribbing, and `<1%` shrinkage tolerance as **hypothetical concept specifications** so visitors understand the design intent without misleading, unverified performance claims.
  2. _Transparent Garment Dimensions:_ Providing explicit pit-to-pit chest measurements (S: 21", M: 22.5", L: 24", XL: 25.5") to eliminate sizing guesswork.

---

## 4. Peer Feedback & Issue #2 Record Reconciliation

- **Feedback Issue:** [GitHub Issue #2 — Clarify garment shrinkage and collar durability](https://github.com/mpincay619/is117-brand-studio/issues/2)
- **Critique / Question Logged:** Heavyweight cotton tees (hypothetical 280 GSM) often experience post-wash shrinkage and collar baconing under repeated laundering; requested explicit dimensional tolerance and collar ribbing specifications in `SPEC.md`.
- **Decision & Reconciled Specification (Hypothetical Concept Specs):**
  - **Pre-Shrunk Dimensional Tolerance (Hypothetical):** `<1%` post-wash length and width variance under cold-wash / flat-dry care (classroom concept specification; unverified).
  - **Collar Ribbing Construction (Hypothetical):** `1.25"` heavy bound ribbed crew collar designed to resist stretching and collar baconing (classroom concept specification; unverified).
- **Verification:** Reconciled across `SPEC.md`, `public/index.html`, `public/styleguide.html`, and `public/studio.html` with consistent `$42 USD` pricing and hypothetical disclaimers.

---

# T-Shirt Plan

## 1. Two Concise Approaches Compared (For Structural Minimalist Audience)

- **Approach A — Single-Page Technical Spec Sheet + Simulated SQLite Checkout (Selected):**
  - **Structure:** High-contrast architectural product page (`index.html`), living token guide (`styleguide.html`), and rationale comparison (`studio.html`), backed by a local `node:sqlite` (`data/orders.sqlite`) order ledger via `/api/orders`.
  - **Why Selected:** Directly serves our primary persona (Liam, 27, Industrial Designer) and secondary persona (Maya, 22, Studio Printmaker) by placing exact pit-to-pit garment measurements, hypothetical 280 GSM specs, and single-click size selection above the fold without multi-step cart friction.
- **Approach B — Multi-Step Editorial Lookbook Funnel (Not Selected):**
  - **Structure:** Lifestyle photo carousel leading into a 3-step shipping/billing wizard.
  - **Why Rejected:** Buries garment measurements below marketing imagery and introduces unnecessary form fields for a simulated classroom checkout.

## 2. Carried-Forward Brand Identity & Honest Persuasion

- **Brand Promise (Hypothetical Concept):** "Engineered hypothetical 280 GSM heavyweight cotton. Designed to hold its structure, resist collar distortion, and avoid sheer show-through (hypothetical classroom concept specification; unverified)."
- **Visual Choices:** Deep slate ink (`#0f172a`), crisp off-white paper (`#f8fafc`), border slate (`#64748b`), geometric sans-serif scale, and custom `TENSILE` SVG wordmark + garment spec diagram.
- **Two Honest Persuasion Elements:**
  1. **Explicit Hypothetical Disclosure:** Clearly labeling the `280 GSM` weight, `<1%` shrinkage tolerance, and `1.25"` collar ribbing as unverified classroom concept assumptions rather than fake lab claims.
  2. **Transparent Dimensional Table & Price:** Displaying exact S–XL pit-to-pit measurements (`21"` to `25.5"`) and `$42 USD` simulated unit price before adding to bag.

## 3. User Stories, Essential Features & Observable Checks

1. **Story 1 (Garment Spec Inspection):** As a structural minimalist shopper, I want to read exact fabric weight, collar ribbing, and S–XL pit-to-pit dimensions before choosing a size so I know how the tee will fit.
   - _Essential Feature:_ Specification card and tabular measurement chart on `public/index.html`.
   - _Observable Check:_ Open `public/index.html` at 375px mobile and 1280px desktop widths; verify all four sizes (`S`, `M`, `L`, `XL`), `$42 USD` price, and hypothetical spec labels are readable without horizontal overflow.
2. **Story 2 (Accessible Size Validation):** As a keyboard or screen-reader user, I want clear validation feedback if I submit the form without choosing a size so I can recover without confusion.
   - _Essential Feature:_ Radio group validation in `public/shop.js` toggling `#size-error` and `aria-invalid="true"`.
   - _Observable Check:_ Click "Add to demo bag" with no size selected; confirm `#size-error` becomes visible, focus moves to the first size radio button, and selecting a size clears the error.
3. **Story 3 (Simulated Checkout & Bag Summary):** As a shopper, I want to add a selected size to my simulated checkout bag and see item quantities and `$42 USD` pricing update immediately.
   - _Essential Feature:_ Live ARIA status region (`#bag-status`), itemized list (`#bag-items`), and reset control (`#clear-bag`).
   - _Observable Check:_ Select `L`, submit twice, and confirm `#bag-count` reads `2`, `#bag-items` shows `Size L · Quantity 2`, and clicking Clear resets count to `0`.
4. **Story 4 (SQLite Order Persistence Across Restarts):** As the store operator, I want simulated checkout orders saved to a local SQLite database (`data/orders.sqlite`) so order records persist after stopping and reopening the server.
   - _Essential Feature:_ Node `node:sqlite` (`DatabaseSync`) table `simulated_orders` in `server.mjs` exposed via `POST /api/orders` and `GET /api/orders`.
   - _Observable Check:_ Start `node server.mjs`, place a simulated order, stop the server, reopen `node server.mjs`, and check `GET /api/orders` to verify the order ID, size, and `$42 USD` total persist across restarts.

## 4. SQLite Starter Implementation & Changes Explained

- **Implementation:** Replaced the static `405` stub in `server.mjs` with Node's built-in `node:sqlite` (`DatabaseSync`) writing to `data/orders.sqlite` (`simulated_orders` table storing `id`, `customer_name`, `size`, `quantity`, `unit_price_usd`, `total_usd`, and `created_at`).
- **Frontend Integration:** Updated `public/shop.js` to `POST` simulated checkout selections to `/api/orders` and load saved SQLite order history on page open, while gracefully falling back to in-memory bag updates when viewed on static GitHub Pages.

## 5. Peer Review & Decision Record

- **Review Issue:** [GitHub Issue #2](https://github.com/mpincay619/is117-brand-studio/issues/2)
- **Question / Critique Recorded:** How will shoppers verify that simulated checkout orders actually save to a real SQLite backend rather than disappearing on refresh, and how are collar/shrinkage specs kept honest?
- **Decision & Action:** Implemented `node:sqlite` (`data/orders.sqlite`) in `server.mjs` connected to `public/shop.js`, and carried forward explicit hypothetical labels in `SPEC.md` and `public/index.html`.

---

# Portfolio Plan

## 1. Target Reader, Goal & Evidence
- **Target Reader:** Technical recruiters, hiring managers, and senior UX/design engineering leads at companies like Fidelity and Audible.
- **Primary Goal:** Demonstrate end-to-end capability in translating UX research into accessible, responsive web code with rigorous version control and accessibility checks.
- **Evidence Provided:** Published documentation site (`is117-brand-studio`), verified employer role research (`career-research.html`), live GitHub repositories, and interactive design prototypes.

## 2. Two Page Approaches Compared
- **Approach A — Comprehensive Single-Page Architectural Portfolio (Selected):** A clean, modular multi-page documentation site (`index.html`, `styleguide.html`, `studio.html`, `career-research.html`) with clear semantic nav and embedded project cards.
- **Approach B — Minimalist Static Link-Tree Resume:** A single landing page with outbound PDF links. (Rejected because it fails to showcase interactive coding, accessibility styling, and git version control discipline required by Audible/Fidelity).

## 3. Three to Five Checkable User Stories
1. **Story 1 (Navigation & Discovery):** As a recruiter, I want to click from the storefront to the Career Research page in one step so I can verify employer alignment instantly. (Checked via top navbar links across all pages).
2. **Story 2 (Responsive Viewport Adaptation):** As a hiring manager inspecting on mobile or desktop, I want cards and text to scale cleanly without horizontal overflow. (Checked via CSS media queries and responsive layout validation).
3. **Story 3 (Accessibility & Contrast):** As an accessibility auditor, I want high-contrast text and explicit keyboard focus states on all interactive links. (Checked via Lighthouse accessibility audits and keyboard tab tests).

## 4. Professional Profile & Artifact Plan
- **LinkedIn Profile:** Updated with current B.S. in Human-Computer Interaction studies at NJIT, design ambassador leadership, and project documentation links.
- **GitHub Profiles & Repositories:** Maintained under `mpincay619` across three public repos (`is117-brand-studio`, `is117-group-business`, and personal portfolio).
- **Résumé:** Professional PDF detailing UX design coursework, responsive web prototyping, Git workflows, and UI component structuring.
