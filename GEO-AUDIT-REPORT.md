# GEO Audit Report: Bearby Wallet

**Audit Date:** 2026-04-13
**URL:** https://bearby.io
**Business Type:** SaaS / Crypto Wallet (YMYL — Financial Software)
**Pages Analyzed:** 5 (/, /ru, /security, /privacy-policy, /terms)

---

## Executive Summary

**Overall GEO Score: 52/100 — Poor**

Bearby has a genuinely strong technical differentiator (post-quantum cryptography) and solid foundational infrastructure — SSR rendering, all AI crawlers permitted, llms.txt present, FAQPage schema, and a well-cited security page. However, the site is critically thin: only 5 pages, no blog, no team attribution, no third-party validation, and no entity recognition in AI knowledge graphs (no Wikipedia, no Wikidata, no LinkedIn). The 2020 privacy policy is an active YMYL liability. Without content depth and external authority signals, AI systems have no basis to cite or recommend Bearby — even when it is the correct answer to a user's query.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 68/100 | 25% | 17.0 |
| Brand Authority | 22/100 | 20% | 4.4 |
| Content E-E-A-T | 44/100 | 20% | 8.8 |
| Technical GEO | 74/100 | 15% | 11.1 |
| Schema & Structured Data | 62/100 | 10% | 6.2 |
| Platform Optimization | 49/100 | 10% | 4.9 |
| **Overall GEO Score** | | | **52/100** |

---

## Critical Issues (Fix Immediately)

### C1 — Privacy Policy Dated 2020 (YMYL Failure)
**Pages affected:** /privacy-policy
**Impact:** AI systems score financial/security products against YMYL standards. A 6-year-old privacy policy signals either abandoned maintenance or compliance negligence. Google's quality raters and AI content evaluators both penalize stale legal documentation on YMYL sites. This is the single most damaging trust signal on the site.
**Fix:** Update the privacy policy to reflect current data practices, include a 2026 effective date, update DPA contacts, and add a cookie/tracking policy section. Minimum: add `dateModified` to the page and update the last-updated date to today.

### C2 — No Wikipedia Article / No Wikidata Entity
**Impact:** AI models (ChatGPT, Gemini, Perplexity, Bing Copilot) use Wikipedia and Wikidata as the primary signal for entity recognition. Without a Wikipedia article or Wikidata Q-item, Bearby is not a recognized entity in any major AI knowledge graph. It will not appear in comparative AI responses ("best quantum-resistant wallets"), will not be cited by name, and brand mentions elsewhere will not be connected into a coherent entity profile. The only "Bearby" Wikidata entry is a Japanese manga series.
**Fix:** Draft a Wikipedia article establishing notability through: 100,000+ downloads, pioneering NTRU Prime implementation in a consumer wallet, post-quantum cryptography positioning. Simultaneously create a Wikidata Q-item with `instance of: software` and add both URLs to the Organization schema `sameAs` array.

---

## High Priority Issues (Fix Within 1 Week)

### H1 — No Content Layer (5 Pages Total)
The entire site has 5 pages. There is no blog, no changelog, no how-to guides, no comparison content, no use-case pages, and no documentation hub. The /security page carries all the technical authority alone. AI systems have almost nothing to cite from Bearby in response to the hundreds of relevant queries ("best quantum-resistant wallet", "how to protect crypto from quantum computers", "NTRU Prime wallet", "non-custodial wallet comparison"). The topical authority required for AI citation does not exist.
**Fix:** Add a minimum of 1 authoritative article in the next 7 days. Recommended: "How NTRU Prime Protects Against Quantum Attacks" (1,000+ words, building on /security content).

### H2 — No LinkedIn Company Page
LinkedIn is absent from `sameAs` and does not exist at `/company/bearby`. This is the highest-weight Microsoft ecosystem signal for Bing Copilot, and a key entity verification source for ChatGPT and Gemini.
**Fix:** Create a LinkedIn company page for Bearby and add the URL to the Organization schema `sameAs` array. 30-minute task.

### H3 — /ru Canonical Points to English Root
`/ru` has `<link rel="canonical" href="https://bearby.io">` — pointing to the English homepage. This tells all search engines and AI crawlers that the Russian page is a duplicate of the English page and should not be indexed independently.
**Fix:** Change the `/ru` canonical to `https://bearby.io/ru` (or `https://bearby.io/ru/` to match the hreflang declaration). One-line fix in the SvelteKit route.

### H4 — No llms-full.txt
The `llms.txt` file exists but is minimal. The `llms-full.txt` companion (complete prose content for AI ingestion without page crawls) is absent. This is the highest-value llms.txt addition missing — it allows AI models like Perplexity and Claude to ingest the full site content in a single request.
**Fix:** Create `/llms-full.txt` with 1,500–3,000 words covering: product description, full feature explanations, cryptographic architecture details, supported chains with rationale, FAQ content in prose, and contact information.

### H5 — No Named Author on Security Page
The `/security` TechArticle schema attributes authorship to `"@type": "Organization"`. Google's E-E-A-T guidelines and AI content evaluators both prefer a named `Person` with credentials for YMYL content. Anonymous organizational authorship significantly discounts expertise signals for a financial security product.
**Fix:** Add a named engineer or cryptographer with a bio to the /security page. Update the TechArticle schema `author` from Organization to Person with `sameAs` pointing to a GitHub or LinkedIn profile.

### H6 — No Third-Party Security Audit
No published security audit, penetration test, or independent cryptographic review exists anywhere on the site. For a wallet product marketing post-quantum cryptography, this absence is the single biggest authoritativeness gap. Users and AI systems evaluating "is Bearby trustworthy?" have only self-reported claims to evaluate.
**Fix:** Commission an independent cryptographic audit (or publish a GitHub security advisory). Even a summary with redacted findings is a high-impact trust signal. Publish it at `/security-audit`.

### H7 — SoftwareApplication Schema Validation Errors
Two errors in the homepage SoftwareApplication schema:
- `offers.priceCurrency`: Set to `"AED"` (UAE dirham) — should be `"USD"` for a globally distributed free product
- `offers.availability`: `"OnlineOnly"` is not a valid schema.org value — should be `"https://schema.org/InStock"`
**Fix:** Correct both values in the JSON-LD block. 5-minute fix.

### H8 — Missing msvalidate.01 Meta Tag
Bing Webmaster Tools is verified via `BingSiteAuth.xml` (user ID: `6CAD5331F323DF4BBA962F2CB902687F`) but the in-page `<meta name="msvalidate.01">` tag is absent. This is Bing Copilot's primary crawl-priority signal.
**Fix:** Add `<meta name="msvalidate.01" content="6CAD5331F323DF4BBA962F2CB902687F">` to `<svelte:head>` in `src/routes/+layout.svelte`.

---

## Medium Priority Issues (Fix Within 1 Month)

### M1 — llms.txt Links Have No Descriptions
All links in `llms.txt` are bare — no `: Description` text after any URL. AI crawlers use these descriptions to prioritize which pages to fetch.
**Fix:** Add descriptions to each link. Example: `- [Security Architecture](https://bearby.io/security): Technical documentation covering NTRU Prime (sntrup761), AES-256, Kuznechik dual-layer encryption, and Argon2id key derivation.`

### M2 — llms.txt Missing Key Pages and Content
`/security`, `/terms`, `/ru`, and the Firefox extension are not listed in `llms.txt`. The FAQ content (5 high-citability Q&As) is not surfaced.
**Fix:** Add all pages with descriptions. Add a `## FAQ` section with full Q&A text from the FAQPage schema items.

### M3 — No FAQPage Schema on /security Despite Q&A Content
The security page answers questions like "Is NTRU Prime better than CRYSTALS-Kyber?" and "What is Argon2id?" in body content but these are not schema-exposed.
**Fix:** Add a `FAQPage` JSON-LD block to `/security` covering the top 4–5 technical questions answered on the page.

### M4 — TechArticle Schema Incomplete on /security
Missing: `mainEntityOfPage`, `articleSection`, `wordCount`, `speakable` property. Author should be a named `Person` not an `Organization`.
**Fix:** See schema fix templates in the Schema section below.

### M5 — CSP Uses `unsafe-inline` on Scripts
The Content Security Policy includes `script-src 'self' 'unsafe-inline'`. This is a credibility inconsistency for a product marketing itself on security. It does not affect SEO directly but is a trust signal weakness.
**Fix:** Implement nonce-based CSP (SvelteKit supports this natively). Remove `unsafe-inline` from `script-src`.

### M6 — No IndexNow Implementation
No IndexNow key file detected at standard paths. IndexNow allows immediate Bing (and Yandex) index updates on each deployment — directly improving Bing Copilot recency signals.
**Fix:** Generate an IndexNow key, place the key file at `https://bearby.io/[key].txt`, and ping `https://api.indexnow.org` on each SvelteKit deployment.

### M7 — No robots.txt Sitemap Directive / No Explicit AI Crawler Rules
The `Sitemap:` directive is missing from `robots.txt` despite the sitemap existing (it is declared in the sitemap itself but not in robots.txt). No explicit named allow rules for AI crawlers.
**Fix:** Add `Sitemap: https://bearby.io/sitemap.xml` to robots.txt. Optionally add explicit allow rules: `User-agent: GPTBot`, `User-agent: ClaudeBot`, `User-agent: PerplexityBot`, each with `Allow: /`.

### M8 — No Changelog / Release Notes Page
No evidence of active maintenance is visible on the site. A changelog demonstrates ongoing development — a critical freshness and trust signal for security software.
**Fix:** Add a `/changelog` page with release history. Even 3-4 entries covering the last 12 months provides meaningful signals.

### M9 — Missing Organization Schema Fields
`foundingDate`, `contactPoint`, and `email` are absent from the Organization schema. `sameAs` is missing LinkedIn, YouTube, Wikipedia, and Wikidata.
**Fix:** Add missing fields. See schema recommendations below.

### M10 — Homepage H2s Are Navigation Labels, Not Query-Format Headings
Section headings are "About", "Features", "Security", "Integrations", "Downloads" — navigation labels, not question-answering headings. Google AI Overviews extracts content under headings that match user query patterns.
**Fix:** Convert key section headings to question format followed by a 40–60 word direct-answer paragraph. Example: "How Does Bearby Protect Against Quantum Attacks?" with an answer paragraph before expanding into feature details.

### M11 — No Product Hunt / CoinGecko Listing
Both are sources AI models frequently cite in comparative responses about crypto tools. Neither listing was found.
**Fix:** Submit to Product Hunt (free, moderate effort). Submit to CoinGecko wallet directory (free, low effort).

---

## Low Priority Issues (Optimize When Possible)

### L1 — No BreadcrumbList on Inner Pages
`/security`, `/privacy-policy`, and `/terms` have no BreadcrumbList schema.

### L2 — Missing `screenshot` and `softwareVersion` in SoftwareApplication Schema
Both unlock richer Google display eligibility.

### L3 — Hero Image Missing Preload Hint
`/img/hero-bg.webp` has no `<link rel="preload" as="image">` in the HTML head. Affects LCP.

### L4 — WebSite SearchAction Endpoint May Not Be Functional
A `potentialAction` with `?q={search_term_string}` is declared. If bearby.io has no working site search at that URL, this should be removed to avoid serving a broken action.

### L5 — Trailing Slash Inconsistency
Sitemap uses `/ru` while hreflang declares `https://bearby.io/ru/`. Standardize and enforce via Vercel redirect.

### L6 — Privacy Policy Has No Meta Description or Schema
The privacy policy page has no meta description and no WebPage schema with `dateModified`.

---

## Category Deep Dives

### AI Citability — 68/100

**Strongest citability passages:**

| Passage | Page | Citability Score |
|---|---|---|
| NIST quantum timeline claim ("10-15 years") | /security | 82/100 |
| Dual-encryption defense-in-depth rationale | /security | 79/100 |
| Argon2id definition with PHC reference | /security | 76/100 |
| NTRU Prime vs CRYSTALS-Kyber selection rationale | /security | 74/100 |
| Download statistics (100k+ Play, 4.8/5 × 1,200) | / | 71/100 |

**Weakest citability areas:**
- Hero copy (marketing labels, not answer-format) — 22/100
- Privacy policy (outdated legal boilerplate) — 12/100
- Terms of service (standard legal clauses) — 10/100
- Supported chains list (no per-chain elaboration) — 28/100

The /security page is carrying the entire citability load for the site. One additional technical article would double the citation surface area.

---

### Brand Authority — 22/100

| Platform | Status | Notes |
|---|---|---|
| Wikipedia | Absent | No article exists. Critical gap. |
| Wikidata | Absent | Only entry is a Japanese manga series. |
| Reddit | Unknown | Could not confirm presence. GitHub signal suggests low community engagement. |
| GitHub | Minimal | 29 org followers; top repos have 13, 3, and 1 stars respectively. |
| YouTube | Unknown | No confirmed tutorials or reviews found. |
| LinkedIn | Absent | 404 at `/company/bearby`. |
| Product Hunt | Absent | No listing found. |
| CoinGecko | Absent | No wallet listing found. |
| Chrome Web Store | Present | 30,000+ installs claimed. |
| App Stores | Present | 100,000+ Play downloads, 4.8/5 × 1,200+ ratings. |
| CoinDesk / Decrypt / CoinTelegraph | Not found | No press coverage located. |

App store presence with 100k+ downloads is a genuine signal. The gap between user adoption and external web presence is the central brand authority problem.

---

### Content E-E-A-T — 44/100 (YMYL-adjusted)

| Dimension | Score | Key Gap |
|---|---|---|
| Experience | 12/25 | No testimonials, case studies, or user stories in body content |
| Expertise | 16/25 | Strong /security content but zero named authors anywhere |
| Authoritativeness | 8/25 | No security audits, no media coverage, no institutional backing |
| Trustworthiness | 8/25 | 2020 privacy policy, no contact form, unverified AggregateRating |

This is a YMYL product (cryptocurrency wallet) held to the highest E-E-A-T standards. The 2020 privacy policy alone would cause a quality evaluator to flag this site for manual review.

---

### Technical GEO — 74/100

**What's working well:**
- SvelteKit SSR confirmed — all content, metadata, and schema is in initial HTML response
- HTTP/2, Vercel TLS, 2-year HSTS with preload
- Complete Open Graph and Twitter Card tags
- `robots: index, follow, max-snippet:-1, max-image-preview:large`
- hreflang for en/ru/x-default correctly declared
- llms.txt present and valid format

**Key issues:**
- `/ru` canonical incorrectly points to English root (indexing suppression)
- CSP `unsafe-inline` on scripts weakens XSS protection
- No `Sitemap:` directive in robots.txt
- llms-full.txt absent
- Trailing slash inconsistency between sitemap and hreflang

---

### Schema & Structured Data — 62/100

**Schemas found:**

| Page | Schema Type | Status |
|---|---|---|
| / | SoftwareApplication | Partial — offers.priceCurrency is "AED", availability invalid |
| / | WebSite + SearchAction | Warn — verify search endpoint works |
| / | Organization | Partial — missing foundingDate, contactPoint, LinkedIn/Wikipedia sameAs |
| / | FAQPage | Valid — 5 high-quality Q&As; not generating rich results (Aug 2023 restriction) but strong for AI extraction |
| /security | TechArticle | Partial — missing mainEntityOfPage, articleSection, wordCount; author should be Person not Organization |
| /privacy-policy | — | No schema |
| /terms | — | No schema |

**GEO-critical missing schemas:**
- `speakable` — not present on any page; direct AI assistant readability signal
- `BreadcrumbList` — missing on all inner pages
- `WebPage` with `dateModified` — missing on /privacy-policy and /terms
- `Person` schema for any team member

**Priority schema fixes:**

```json
// Fix 1: SoftwareApplication — correct offers block
"offers": {
  "@type": "Offer",
  "price": "0",
  "priceCurrency": "USD",
  "availability": "https://schema.org/InStock"
},
"softwareVersion": "[current version number]",
"screenshot": {
  "@type": "ImageObject",
  "url": "https://bearby.io/img/screenshot-wallet.webp",
  "caption": "Bearby quantum-resistant wallet interface"
}

// Fix 2: Organization — add missing sameAs platforms
"sameAs": [
  "https://github.com/bearbywallet",
  "https://x.com/BearbyPro",
  "https://chromewebstore.google.com/detail/bearby/klnepcnofpcagllmbcplocjpkhnpjhhb",
  "https://play.google.com/store/apps/details?id=com.zilpay.bearby",
  "https://apps.apple.com/us/app/bearby-wallet/id1612716382",
  "[https://www.linkedin.com/company/bearby — once created]",
  "[https://en.wikipedia.org/wiki/Bearby — once created]"
],
"foundingDate": "[year]",
"contactPoint": {
  "@type": "ContactPoint",
  "contactType": "customer support",
  "email": "support@bearby.io"
}

// Fix 3: TechArticle on /security — add missing properties
"mainEntityOfPage": "https://bearby.io/security",
"articleSection": "Cryptography",
"wordCount": 950,
"author": {
  "@type": "Person",
  "name": "[Engineer Name]",
  "worksFor": { "@type": "Organization", "name": "Bearby" }
},
"speakable": {
  "@type": "SpeakableSpecification",
  "cssSelector": ["h1", ".security-summary"]
}

// Fix 4: BreadcrumbList for /security
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bearby.io" },
    { "@type": "ListItem", "position": 2, "name": "Security", "item": "https://bearby.io/security" }
  ]
}
```

---

### Platform Optimization — 49/100

| Platform | Score | Key Blocker |
|---|---|---|
| Google AI Overviews | 62/100 | Navigation-label H2s instead of question-format headings; no HowTo schema |
| Perplexity AI | 53/100 | No community validation (Reddit, forums); no blog/freshness signals |
| ChatGPT Web Search | 44/100 | No Wikipedia entity; no named author; llms.txt not structured for GPT extraction |
| Google Gemini | 48/100 | Not in Knowledge Graph; no YouTube content; only 5 pages (no topical clustering) |
| Bing Copilot | 38/100 | No LinkedIn; no IndexNow; msvalidate.01 missing from HTML |

---

## Quick Wins (This Week)

These 5 actions require less than 1 hour each and produce immediate GEO improvements:

1. **Fix SoftwareApplication schema** — Change `priceCurrency` from `"AED"` to `"USD"` and `availability` from `"OnlineOnly"` to `"https://schema.org/InStock"`. File: wherever JSON-LD is generated in the SvelteKit routes.

2. **Add msvalidate.01 meta tag** — Add `<meta name="msvalidate.01" content="6CAD5331F323DF4BBA962F2CB902687F">` to `src/routes/+layout.svelte`. Activates Bing Copilot crawl-priority signals.

3. **Fix /ru canonical** — Change the canonical on the `/ru` route from `https://bearby.io` to `https://bearby.io/ru`. Unlocks Russian-language indexing.

4. **Add Sitemap directive to robots.txt** — Add `Sitemap: https://bearby.io/sitemap.xml` as the last line of robots.txt.

5. **Add link descriptions to llms.txt** — Update all 6 links in `llms.txt` to include `: Description` text. Add `/security` if it is not listed.

---

## 30-Day Action Plan

### Week 1: Fix Foundations
- [ ] Fix SoftwareApplication schema (priceCurrency AED→USD, availability)
- [ ] Add msvalidate.01 meta tag to layout
- [ ] Fix /ru canonical tag
- [ ] Add Sitemap directive to robots.txt
- [ ] Add explicit AI crawler Allow rules to robots.txt (GPTBot, ClaudeBot, PerplexityBot)
- [ ] Update llms.txt with link descriptions and add /security, /terms pages
- [ ] Create LinkedIn company page for Bearby
- [ ] Begin privacy policy update (draft due end of week)

### Week 2: Content & Authority
- [ ] Publish updated privacy policy with 2026 effective date
- [ ] Publish first technical article (recommended: "How NTRU Prime Protects Against Quantum Attacks")
- [ ] Create `/llms-full.txt` (1,500–3,000 words of structured product content)
- [ ] Add named author with bio and credentials to /security page
- [ ] Update TechArticle schema: mainEntityOfPage, articleSection, Person author, speakable
- [ ] Add FAQPage schema to /security page

### Week 3: Entity & Platform Coverage
- [ ] Draft and submit Wikipedia article for Bearby wallet
- [ ] Create Wikidata Q-item for Bearby
- [ ] Add Wikipedia + Wikidata + LinkedIn URLs to Organization schema sameAs
- [ ] Submit to CoinGecko wallet directory
- [ ] Submit to Product Hunt
- [ ] Implement IndexNow (generate key, add file, add deployment ping)

### Week 4: Schema & Technical Polish
- [ ] Add BreadcrumbList to /security, /privacy-policy, /terms
- [ ] Add WebPage schema with dateModified to /privacy-policy and /terms
- [ ] Add missing Organization fields: foundingDate, contactPoint
- [ ] Add screenshot and softwareVersion to SoftwareApplication schema
- [ ] Add Organization sameAs completeness check
- [ ] Fix trailing slash inconsistency (sitemap /ru vs hreflang /ru/)
- [ ] Verify or remove WebSite SearchAction endpoint
- [ ] Convert 2–3 homepage section headings to question format with direct-answer paragraphs

---

## Appendix: Pages Analyzed

| URL | Title | Status | Key GEO Issues |
|---|---|---|---|
| https://bearby.io | Bearby — Quantum-Resistant Crypto Wallet | 200 | Schema errors (AED, OnlineOnly); no query-format H2s |
| https://bearby.io/security | Security Architecture — Bearby Wallet | 200 | No named author; TechArticle incomplete; no FAQPage |
| https://bearby.io/privacy-policy | Privacy Policy - Bearby | 200 | Last updated 2020; no schema; no meta description |
| https://bearby.io/terms | Terms of Service — Bearby Wallet | 200 | No schema; no meta description |
| https://bearby.io/ru | (Russian version) | 200 | Canonical points to English root — suppresses indexing |

**Pages not found / not crawled:**
- `/llms-full.txt` — 404, needs to be created
- `/changelog` — does not exist
- `/blog` — does not exist
- `/about` — does not exist as a standalone page (only homepage anchor)
- `/sitemap_index.xml` — not present (single sitemap only, appropriate for 5 pages)
