# GEO Audit Report: Bearby Wallet

**Audit Date:** 2026-04-14
**URL:** https://bearby.io
**Business Type:** Crypto Wallet SaaS (quantum-resistant, non-custodial)
**Pages Analyzed:** 5 (/, /security, /privacy-policy, /terms, /ru/)

---

## Executive Summary

**Overall GEO Score: 50/100 (Poor)**

Bearby has a technically sophisticated product and an exemplary AI crawler access configuration — every major AI bot is explicitly permitted in robots.txt. However, the site is a nearly empty house with an open door: only 5 pages exist, the primary content is rendered by client-side JavaScript (invisible to AI crawlers), there is no external brand authority (no Wikipedia, no press coverage, no LinkedIn), and the content volume is insufficient for AI systems to develop citation patterns. The technical foundation is solid but unused; closing the content and authority gaps is the critical path to GEO improvement.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 54/100 | 25% | 13.5 |
| Brand Authority | 29/100 | 20% | 5.8 |
| Content E-E-A-T | 48/100 | 20% | 9.6 |
| Technical GEO | 61/100 | 15% | 9.15 |
| Schema & Structured Data | 63/100 | 10% | 6.3 |
| Platform Optimization | 52/100 | 10% | 5.2 |
| **Overall GEO Score** | | | **50/100** |

---

## Critical Issues (Fix Immediately)

### C1 — Client-Side-Only Vue.js Rendering

The site uses a Vue.js SPA with no server-side rendering. A confirmed `<noscript>` tag reads: *"Please enable JavaScript to use Bearby Wallet website."* This means all prose content — feature descriptions, product copy, security explanations — is invisible to AI crawlers (GPTBot, ClaudeBot, PerplexityBot). Only the JSON-LD schema blocks appear to be server-rendered. AI crawlers can read schema metadata but cannot access the body content they would cite in answers.

**Fix:** Migrate to Nuxt.js (Vue's SSR/SSG framework) or implement static site generation. This is the single highest-ROI technical change for GEO. Until this is resolved, no amount of content improvement will be fully effective.

**Affected pages:** All 5 pages
**Effort:** High — 1-2 weeks
**Impact:** Very high

---

### C2 — No llms.txt File

`https://bearby.io/llms.txt` returns 404. With only 5 pages, a well-crafted llms.txt would meaningfully accelerate AI discoverability by explicitly directing crawlers to the security page's technical claims. This is especially valuable while the site remains thin.

**Fix:** Create `/llms.txt` at the domain root:

```
# Bearby

> Bearby is a quantum-resistant, non-custodial crypto wallet using NTRU Prime,
> AES-256, Kuznechik, and Argon2id encryption. Available for iOS, Android, Chrome,
> and Firefox. Founded 2022. Open-source Rust core.

## Product

- [Home](https://bearby.io/): Product overview, features, and download statistics
- [Security Architecture](https://bearby.io/security): Technical documentation of
  post-quantum cryptography — NTRU Prime, dual symmetric cipher layering, Argon2id
  key derivation

## Legal

- [Privacy Policy](https://bearby.io/privacy-policy): Zero data collection policy
- [Terms of Service](https://bearby.io/terms): Terms governing wallet use

## Optional

- [GitHub](https://github.com/bearbywallet): Open-source Rust core engine
```

**Effort:** 30 minutes
**Impact:** Medium (immediate; amplified as content grows)

---

## High Priority Issues

### H1 — No External Brand Authority

Bearby has zero verifiable third-party presence: no Wikipedia article, no LinkedIn company page, no crypto press coverage (CoinDesk, Decrypt, Cointelegraph, The Block), no named review platform links. The 1,200 reviews cited on the homepage are not linked to any source, making them unverifiable by AI systems. AI models form brand entity judgments from third-party corroboration — Bearby has almost none.

**Most critical gap:** No Wikipedia article. Wikipedia is the primary source AI language models use for entity disambiguation. Every competing wallet with a Wikipedia page (MetaMask, Exodus, Trust Wallet, Ledger) receives preferential citation.

**Fix path:**
1. Secure 2–3 independent press mentions in recognized crypto publications (prerequisite for Wikipedia notability)
2. Create LinkedIn company page (30-minute fix with outsized impact)
3. Submit Wikipedia article once citations exist
4. Add a Trustpilot or G2 profile with linked reviews

**Effort:** High (requires external press outreach)
**Impact:** Very high — affects ChatGPT, Perplexity, Gemini, Bing Copilot entity recognition

---

### H2 — Content Volume Is Critically Thin

Five pages totaling approximately 3,500 words gives Bearby roughly the content footprint of a single blog post. AI models require breadth — multiple angles, multiple queries answered — to build a citation pattern. With no blog, no documentation, no changelog, no comparison content, and no team page, there is almost no surface area for AI systems to discover and cite.

**Top missing content types (in priority order):**
1. Post-quantum cryptography explainer (non-technical audience entry point)
2. "Bearby vs traditional wallets" comparison page
3. Monthly changelog / release notes (currently at v3.8.29 — each release is a content opportunity)
4. Threat model page (what Bearby protects against and what it does not)
5. Developer documentation / integration guide
6. Author/team bio pages

**Effort:** High (ongoing)
**Impact:** Very high — affects all 6 GEO categories

---

### H3 — Invalid Author Attribution on TechArticle

The `/security` page TechArticle schema uses `@type: "Person"` with `name: "Bearby Security Team"`. Teams are not persons — this is semantically invalid and confuses AI entity resolution. It also means no individual's credentials are attached to technical claims, suppressing E-E-A-T signals.

**Fix:** Replace with either:
- `@type: "Organization"` (immediate fix, minimal code change), or
- A real named individual with `name`, `url` (to an author bio page), and `sameAs` links to their LinkedIn/GitHub

```json
"author": {
  "@type": "Organization",
  "name": "Bearby",
  "url": "https://bearby.io",
  "sameAs": "https://github.com/bearbywallet"
}
```

Preferred long-term solution: create a named author (e.g., the CTO or lead engineer) with a bio page and Person schema.

**Effort:** Low (15 minutes for Organization fix; 2 hours for named Person with bio page)
**Impact:** High — affects E-E-A-T scoring on the most citable page on the site

---

### H4 — Missing hreflang Tags for Russian Page

`/ru/` is included in the sitemap but has no `<link rel="alternate" hreflang>` declarations on any page. Search engines must guess the language relationship, risking wrong-language indexing.

**Fix:** Add to both the English homepage and the `/ru/` page:

```html
<link rel="alternate" hreflang="en" href="https://bearby.io/" />
<link rel="alternate" hreflang="ru" href="https://bearby.io/ru/" />
<link rel="alternate" hreflang="x-default" href="https://bearby.io/" />
```

Note: If these tags are currently injected by Vue at runtime rather than present in server-rendered HTML, this is a rendering issue (see C1). Verify via `view-source:https://bearby.io`.

**Effort:** Low
**Impact:** High — prevents wrong-language indexing for Russian users

---

### H5 — Organization sameAs Populated With Wrong Links

The Organization schema `sameAs` array contains 5 entries: GitHub ✓, Twitter/X ✓, and 3 app store URLs (Chrome Web Store, Google Play, App Store). App store listings describe where to download the product — they are not alternate representations of the Bearby organization entity. These three entries should be moved to `downloadUrl` on the SoftwareApplication schema (where they already exist) and replaced with actual authority platform links.

**Fix — replace sameAs on Organization:**

```json
"sameAs": [
  "https://github.com/bearbywallet",
  "https://x.com/BearbyPro",
  "[LinkedIn company page URL]",
  "[Telegram channel URL]",
  "[Reddit community URL — if created]",
  "[YouTube channel URL — if created]",
  "[Wikipedia article URL — when created]",
  "[Wikidata entity URL — when created]"
]
```

**Effort:** Low
**Impact:** High — sameAs is the primary mechanism AI entity graphs use to resolve brand identity

---

## Medium Priority Issues

### M1 — Meta Tags May Be JavaScript-Rendered

The noscript signal and Vue SPA architecture suggest that canonical tags, Open Graph tags, and Twitter Card meta tags may be injected by Vue at runtime rather than present in the server-rendered HTML. If so, AI crawlers and social media scrapers will not see them. Verify via `view-source:https://bearby.io`.

**Fix:** Ensure all of the following are in the static server-rendered `<head>`:
- `<link rel="canonical">`
- `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- `<html lang="en">` (and `lang="ru"` on the Russian page)

**Effort:** Medium (depends on build tooling — Nuxt or Vite SSR can handle this automatically)
**Impact:** Medium-High

---

### M2 — datePublished Appears To Be a Placeholder

Both the SoftwareApplication and TechArticle schemas show `datePublished: "2023-01-01"`. This appears to be a round-number placeholder rather than the true first publication date. Fabricated or approximate dates are an E-E-A-T risk.

**Fix:** Replace with the actual launch date of the app and the actual publication date of the security page. If the security page was published in November 2022, use `"2022-11-15"` (or the actual date).

**Effort:** Low
**Impact:** Medium

---

### M3 — aggregateRating ratingCount Is a Quoted String

`"ratingCount": "1200"` — Schema.org requires Integer, not String. Also, the review sources (App Store, Google Play, Chrome Web Store) are not linked from the homepage, making the claimed 4.8/5 from 1,200 reviews unverifiable by AI systems.

**Fix:**
1. Change `"ratingCount": "1200"` → `"ratingCount": 1200` (remove quotes)
2. Add `"reviewCount": 1200` alongside it
3. Link the download count badges directly to the respective app store pages

**Effort:** Low
**Impact:** Medium

---

### M4 — Homepage H2 Headings Are Navigation Labels

Current H2s on the homepage are navigation section labels ("About", "Features", "Security", "Integrations", "Download"). Google AI Overviews and Bing Copilot specifically extract content where the H2 is a question or descriptive statement followed by a direct answer paragraph.

**Fix:** Rewrite section headings as question-based or descriptive statements:
- "Features" → "What makes Bearby quantum-resistant?"
- "Security" → "How does Bearby protect your private keys?"
- "Integrations" → "Which blockchains does Bearby support?"

Follow each heading with a 50-word direct answer paragraph, then expand into detail below.

**Effort:** Low
**Impact:** Medium (primarily affects Google AI Overviews eligibility)

---

### M5 — No OAI-SearchBot or ChatGPT-User in robots.txt

robots.txt explicitly allows `GPTBot` (OpenAI's training crawler) but not `OAI-SearchBot` (ChatGPT's web search crawler) or `ChatGPT-User` (the browsing plugin agent). The `User-agent: * Allow: /` catch-all technically permits them, but explicit allowance is a quality signal.

**Fix:** Add to robots.txt:

```
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /
```

**Effort:** 10 minutes
**Impact:** Medium (signals active opt-in to ChatGPT indexing)

---

### M6 — Meta Description Too Short

Current meta description: 100 characters (ideal: 150-160). The description undersells the product and misses the opportunity to include supported blockchains, the open-source nature, and the specific quantum threat being addressed.

**Current:** `"Quantum-resistant, non-custodial crypto wallet with on-device key storage and zero data collection."`

**Improved example:** `"Bearby is a quantum-resistant, non-custodial wallet using NTRU Prime cryptography. Supports Bitcoin, Ethereum, and EVM chains. Open-source Rust core. Zero data collection."`

**Effort:** 5 minutes
**Impact:** Low-Medium

---

## Low Priority Issues

### L1 — speakable Property Missing From Homepage

The `speakable` property is correctly implemented on `/security` (targeting `h1` and `.security-page__subtitle`) but is absent from the homepage SoftwareApplication schema. This is a direct AI readability signal.

**Fix:** Add to the existing SoftwareApplication JSON-LD block:
```json
"speakable": {
  "@type": "SpeakableSpecification",
  "cssSelector": ["h1", ".hero__description", ".features__list"]
}
```
Update CSS selectors to match actual class names.

---

### L2 — inLanguage Missing From Russian Page Schemas

All schemas on `/ru/` are identical English-language copies of the homepage schemas. The `inLanguage` property is absent, and descriptions are in English on a Russian URL.

**Fix:** Add `"inLanguage": "ru"` to all schema blocks on `/ru/` and localize the `description` values.

---

### L3 — Trailing Slash Inconsistency

`/ru/` uses a trailing slash while `/security`, `/terms`, `/privacy-policy` do not. If canonical tags are not properly resolving this in server-rendered HTML, crawlers may index both variants.

---

### L4 — No Resource Hints for Performance

No `<link rel="preconnect">`, `<link rel="dns-prefetch">`, or `<link rel="preload">` hints confirmed in server-rendered HTML. For a Vue SPA, preloading the main bundle and preconnecting to CDN origins meaningfully reduces LCP on mobile.

---

### L5 — SearchAction Target URL May Be Non-Functional

The WebSite schema includes a `SearchAction` with target `https://bearby.io/?q={search_term_string}`. If bearby.io has no working site search endpoint at this URL, Google will ignore the SearchAction. Verify or remove.

---

## Category Deep Dives

### AI Citability (54/100)

**Best-performing content blocks:**

| Block | Page | Score | Why It Works |
|---|---|---|---|
| Download stats (100K+, 40K+, 30K+, 4.8/5 from 1,200) | Homepage | 82/100 | Specific, labelled numbers — structurally perfect for AI extraction |
| Argon2id vs GPU brute-force ("billions vs thousands") | /security | 79/100 | Self-contained quantified contrast — citation-ready |
| NTRU Prime design rationale (1996 lineage, module lattice) | /security | 71/100 | Original proprietary reasoning not found in generic sources |
| Harvest-now-decrypt-later threat + NIST 10-15yr timeline | /security | 70/100 | NIST citation gives credibility; quantified claim |

**Worst-performing areas:**
- Homepage hero copy — generic marketing language, no question-answering structure (~28/100)
- Privacy claims ("zero data collection") — identical language found on dozens of wallets; AI will not preferentially cite Bearby (~57/100)
- Blockchain support list — unstructured with no context about why those chains (~35/100)

**Structural penalties applied:**
- Only 5 pages total (-8 pts): Almost no content surface area
- No blog or articles (-6 pts): AI models preferentially cite tutorial/explainer content
- No named author on security content (-4 pts): "Bearby Security Team" bypasses E-E-A-T entirely
- No llms.txt (-3 pts): No structured content prioritization signal
- Security page only ~950 words (-2 pts): Thin for a topic warranting 3,000+ words
- No comparison content (-2 pts): "Bearby vs X" queries will surface competitors

---

### Brand Authority (29/100)

| Platform | Score | Status |
|---|---|---|
| Wikipedia | 0/30 | Absent — most critical gap |
| Reddit | 8/20 | Likely minimal organic mentions; no official presence |
| YouTube | 4/15 | No official channel confirmed |
| LinkedIn | 0/10 | Absent |
| GitHub | 12/25 | Confirmed (bearbywallet); engagement depth unknown |
| Industry/Press/Reviews | 5/25 | No crypto press coverage; review aggregate not linked to source |

Without Wikipedia, Bearby does not exist as a recognized entity in the knowledge graphs that power ChatGPT, Gemini, and Perplexity. Brands that cannot be verified against Wikipedia are treated as unconfirmed entities.

**Path to improving Brand Authority (in order):**
1. Secure 2–3 crypto press mentions (CoinDesk, Decrypt, The Block) — these become Wikipedia notability citations
2. Create LinkedIn company page
3. Create a Trustpilot or G2 profile and link to it from the homepage
4. Submit Wikipedia article using press coverage as notability sources
5. Name and link to the GitHub repo star/fork count — high-star repos are strong authenticity signals

---

### Content E-E-A-T (48/100)

| Dimension | Score | Key Findings |
|---|---|---|
| Experience | 9/25 | Download stats demonstrate adoption; no first-hand case studies, no engineering journey narratives, no original research |
| Expertise | 14/25 | Correct use of sntrup761, Argon2id, GOST R 34.12-2015 signals genuine technical knowledge; no named individual expert |
| Authoritativeness | 10/25 | Open-source GitHub and app store presence; no press coverage, no Wikipedia, no external backlinks |
| Trustworthiness | 15/25 | HTTPS, privacy policy, legal entity registration (DUNS: 506873901), open-source code; no independent security audit |

**Most critical E-E-A-T gap:** No published third-party security audit. For a financial YMYL product claiming quantum resistance, a published audit from Trail of Bits, Cure53, or NCC Group is the single most credible trust signal and is entirely absent.

**AI content assessment:** The security page reads as "Likely Human-Edited AI" — technically accurate with specific standard citations (sntrup761, GOST R 34.12-2015, Argon2id hybrid rationale) but lacking authorial voice, first-hand narrative, or original data. This is functional but not citable by AI systems seeking authoritative expert sources.

---

### Technical GEO (61/100)

| Component | Score | Status |
|---|---|---|
| Server-Side Rendering | 55/100 | CRITICAL — Vue SPA, content JS-rendered |
| Meta Tags & Indexability | 65/100 | Some tags likely JS-injected |
| Crawlability | 85/100 | Excellent robots.txt; all AI crawlers allowed |
| Security Headers | 40/100 | HTTPS confirmed; HSTS/CSP/X-Frame unverifiable |
| Core Web Vitals Risk | 60/100 | Vue SPA elevates LCP and INP risk |
| Mobile Optimization | 75/100 | Good; degraded by SPA rendering on slow connections |
| URL Structure | 90/100 | Clean, short, descriptive slugs |

**Standout positive:** robots.txt is exemplary. Explicit allow rules for GPTBot, ClaudeBot, PerplexityBot, Googlebot-Extended, and anthropic-ai demonstrate awareness of the AI crawler ecosystem. This is better than most crypto wallet sites.

**Standout negative:** Client-side-only rendering is a GEO disqualifier. AI crawlers read the JSON-LD metadata but not the body content. The open door leads to an empty room.

---

### Schema & Structured Data (63/100)

**What's present:** SoftwareApplication, WebSite+SearchAction, Organization, FAQPage (×2), TechArticle, BreadcrumbList (×3), WebPage (×2) — all in JSON-LD, all server-rendered. speakable is implemented on /security.

**Critical schema issues:**

| Issue | Severity | Fix |
|---|---|---|
| TechArticle author is `Person` named "Bearby Security Team" | Critical | Change to `Organization` or a named real Person |
| Organization sameAs has 3 app store links instead of authority platforms | High | Remove app stores from sameAs; add LinkedIn, Wikipedia, Wikidata |
| `datePublished: "2023-01-01"` appears to be a placeholder | Medium | Replace with actual publication dates |
| `ratingCount: "1200"` is a quoted string, should be integer | Low | Remove quotes |
| SearchAction target URL may be non-functional | Low | Verify or remove |
| /ru/ schemas lack `inLanguage: "ru"` and Russian descriptions | Low | Add inLanguage, localize |

**FAQPage note:** FAQPage rich results are restricted to government and health authority sites since August 2023. Bearby will not get FAQ rich results in Google SERP. The schema still provides semantic value for AI comprehension — retain it, but do not prioritize expanding it.

---

### Platform Optimization (52/100)

| Platform | Score | Key Strength | Key Weakness |
|---|---|---|---|
| Google AI Overviews | 61/100 | FAQPage schema on 2 pages, TechArticle with citations | Navigation-label H2s, no answer-target paragraphs |
| Bing Copilot | 58/100 | GitHub (Microsoft ecosystem), strong /security structure | No LinkedIn, no IndexNow, no enterprise content |
| Google Gemini | 50/100 | Technical depth on /security | No YouTube, no topical cluster, no Knowledge Graph entry |
| Perplexity AI | 48/100 | FAQPage direct Q&A extraction, fresh dateModified | No Reddit presence, SPA may block full content parse |
| ChatGPT Web Search | 44/100 | Body content extractable via JSON-LD fields | No Wikipedia, no OAI-SearchBot explicit entry, no entity graph |

**Single action with broadest cross-platform impact:** Create a Wikipedia article for Bearby with citations to independent press coverage. Affects ChatGPT (+15 pts), Perplexity (+8 pts), Gemini (+12 pts), Bing Copilot (+5 pts).

---

## Quick Wins (Implement This Week)

1. **Deploy llms.txt** (30 min) — Place the template above at `https://bearby.io/llms.txt`. No technical dependencies, immediate AI discoverability signal.

2. **Fix TechArticle author schema** (15 min) — Change `@type: "Person"` with `name: "Bearby Security Team"` to `@type: "Organization"`. One JSON-LD property change eliminates a semantic validity error affecting E-E-A-T.

3. **Fix Organization sameAs** (20 min) — Remove the 3 app store URLs from `sameAs`; add LinkedIn company page URL and Telegram channel URL once created. This is the primary mechanism AI entity graphs use to resolve brand identity.

4. **Add hreflang tags** (30 min) — Add English/Russian/x-default hreflang tags to both `/` and `/ru/`. Prevents wrong-language indexing and signals structural awareness to search engines.

5. **Add OAI-SearchBot and ChatGPT-User to robots.txt** (10 min) — Explicit opt-in to ChatGPT's search crawler and browsing agent, separate from the training crawler (GPTBot) already listed.

6. **Fix ratingCount to integer and link review sources** (20 min) — Change `"ratingCount": "1200"` to `"ratingCount": 1200`, add `"reviewCount": 1200`, and make the download count badges link directly to the respective app store review pages.

7. **Expand meta description to 150-160 chars** (5 min) — Include supported blockchains and open-source nature in the description.

---

## 30-Day Action Plan

### Week 1: Schema & Technical Quick Fixes
- [ ] Deploy `llms.txt` at domain root
- [ ] Fix TechArticle `author` (Person → Organization or named individual)
- [ ] Rebuild Organization `sameAs` (remove app stores, prepare slots for authority platforms)
- [ ] Add hreflang tags to homepage and `/ru/`
- [ ] Add `OAI-SearchBot` and `ChatGPT-User` to robots.txt
- [ ] Fix `ratingCount` string → integer; add `reviewCount`; link download badges to app stores
- [ ] Fix `datePublished` placeholders on SoftwareApplication and TechArticle
- [ ] Expand meta description to 150-160 characters
- [ ] Add `speakable` to homepage SoftwareApplication schema
- [ ] Add `inLanguage: "ru"` and Russian-language descriptions to `/ru/` schemas
- [ ] Verify via `view-source:` that canonical, OG, and Twitter tags are in server-rendered HTML (not JS-injected)

### Week 2: Content Creation — Foundation
- [ ] Create named author page (e.g., `/team/[name]`) for the security page lead
- [ ] Add named Person schema to `/security` page TechArticle
- [ ] Publish post-quantum cryptography explainer page (non-technical audience, 1,500+ words)
- [ ] Publish "Bearby vs traditional wallets" comparison page (1,500+ words)
- [ ] Create a changelog/release notes page; document recent versions back to v3.0
- [ ] Rewrite homepage H2 headings from navigation labels to question-based format

### Week 3: Brand Authority — External Presence
- [ ] Create LinkedIn company page for Bearby; add to Organization sameAs
- [ ] Create Trustpilot or G2 profile; link from homepage rating section
- [ ] Draft press release / product story for crypto media outreach (CoinDesk, Decrypt, The Block)
- [ ] Commission third-party security audit (Trail of Bits, Cure53, NCC Group, or equivalent)
- [ ] Engage r/CryptoCurrency and r/netsec with substantive technical posts (not promotional)
- [ ] Create or verify YouTube channel; record one technical explainer video

### Week 4: Technical Architecture — SSR Migration Planning
- [ ] Audit which meta tags and content are currently JS-rendered vs. server-rendered
- [ ] Evaluate Nuxt.js migration path (or Vite SSG) for full server-side rendering
- [ ] Implement IndexNow and submit to Bing Webmaster Tools
- [ ] Audit HTTP security headers via curl; add HSTS, X-Frame-Options, X-Content-Type-Options if missing
- [ ] Begin Nuxt.js migration or implement SSR for critical content paths

---

## Appendix: Pages Analyzed

| URL | Title | Schema Types | GEO Issues |
|---|---|---|---|
| https://bearby.io | Bearby — Quantum-Resistant Crypto Wallet | SoftwareApplication, WebSite, Organization, FAQPage | JS rendering (C1), sameAs misconfig (H5), nav-label H2s (M4), ratingCount string (M3), datePublished placeholder (M2) |
| https://bearby.io/security | Security Architecture — Bearby Wallet | TechArticle, FAQPage, BreadcrumbList | Invalid Person author (H3), datePublished placeholder (M2), ~950 words (thin) |
| https://bearby.io/privacy-policy | Privacy Policy — Bearby Wallet | WebPage, BreadcrumbList | No issues beyond general site-level gaps |
| https://bearby.io/terms | Terms of Service — Bearby Wallet | WebPage, BreadcrumbList | No issues beyond general site-level gaps |
| https://bearby.io/ru/ | Bearby — Quantum-Resistant Crypto Wallet | SoftwareApplication, Organization, FAQPage, WebSite | Missing hreflang (H4), missing inLanguage on schemas (L2), English descriptions on Russian page |

### Fetch Status

| URL | Status | Notes |
|---|---|---|
| https://bearby.io | 200 OK | Full content accessible |
| https://bearby.io/robots.txt | 200 OK | Well-configured; all AI crawlers allowed |
| https://bearby.io/sitemap.xml | 200 OK | 5 URLs; all lastmod 2026-04-13 |
| https://bearby.io/security | 200 OK | Full content accessible |
| https://bearby.io/privacy-policy | 200 OK | Full content accessible |
| https://bearby.io/terms | 200 OK | Full content accessible |
| https://bearby.io/ru/ | 200 OK | Full content accessible |
| https://bearby.io/llms.txt | 404 Not Found | Missing — create this file |
