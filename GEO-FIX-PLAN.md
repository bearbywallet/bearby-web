# Plan: Fix Real GEO Issues in bearby-web Source Code

## Context

The GEO audit of bearby.io identified many issues, but several were **incorrect** because the audit tool couldn't see the source code. After reading the actual source, many "critical" findings are false positives. This plan corrects the GEO-AUDIT-REPORT.md and fixes the real issues that do exist in the code.

---

## Audit Errors (False Positives to Correct in the Report)

These were flagged as issues but are **already correctly implemented** in the source:

| Audit Finding | Reality |
|---|---|
| C1: "Client-side Vue.js SPA, no SSR" | **FALSE** — SvelteKit SSG with full prerendering (`prerender: { entries: ['*', ...] }`). The noscript is a font fallback, not an SSR indicator. Framework is SvelteKit, not Vue.js. |
| C2: "No llms.txt" | **FALSE** — Two files exist: `/llms.txt` and `/llms-full.txt`, both prerendered server endpoints. |
| H4: "Missing hreflang tags" | **FALSE** — Implemented in `+layout.svelte` lines 29-31 with `x-default`, `en`, `ru`. Applied to every page globally. |
| M1: "Meta tags may be JS-injected" | **FALSE** — All meta tags are in `<svelte:head>` which SvelteKit prerendering injects into static HTML. |
| "No preconnect/preload hints" | **FALSE** — `app.html` lines 15-16 have Google Fonts preconnect; line 42 preloads hero-bg.webp with `fetchpriority="high"`. |

---

## Real Issues to Fix

### Fix 1 — ratingCount is a quoted string (not integer)
**File:** `src/routes/+page.svelte` line 66
```
// Before:
ratingCount: '1200',
// After:
ratingCount: 1200,
reviewCount: 1200,   // add reviewCount alongside ratingCount
```

### Fix 2 — TechArticle author uses Person type for a team name
**File:** `src/routes/security/+page.svelte` lines 20-25
```
// Before:
author: {
  '@type': 'Person',
  name: 'Bearby Security Team',
  worksFor: { '@type': 'Organization', name: 'Bearby', url: SITE_URL },
  sameAs: 'https://github.com/bearbywallet'
},
// After:
author: {
  '@type': 'Organization',
  name: 'Bearby',
  url: SITE_URL,
  sameAs: 'https://github.com/bearbywallet'
},
```

### Fix 3 — Organization sameAs contains app store download links
App store URLs describe where to download the product, not alternate representations of the organization entity. They're already correctly in `downloadUrl` on SoftwareApplication.

**File:** `src/routes/+page.svelte` lines 106-115
```
// Before:
sameAs: [
  'https://github.com/bearbywallet',
  'https://x.com/BearbyPro',
  'https://chromewebstore.google.com/detail/bearby/klnepcnofpcagllmbcplocjpkmnpjhhb',
  'https://play.google.com/store/apps/details?id=com.zilpay.bearby',
  'https://apps.apple.com/us/app/bearby-wallet/id1612716382'
]
// After:
sameAs: [
  'https://github.com/bearbywallet',
  'https://x.com/BearbyPro'
  // Add when created: 'https://www.linkedin.com/company/bearby'
  // Add when created: 'https://en.wikipedia.org/wiki/Bearby'
]
```

### Fix 4 — og:url doesn't reflect locale on /ru/ page
**File:** `src/routes/+page.svelte` line 173
The `og:url` is hardcoded to `SITE_URL` but should use `canonicalUrl` (which correctly returns `/ru` for the Russian page).
```
// Before:
<meta property="og:url" content={SITE_URL} />
// After:
<meta property="og:url" content={canonicalUrl} />
```

### Fix 5 — datePublished is a placeholder '2023-01-01'
Both files use `datePublished: '2023-01-01'` which is a placeholder. The actual launch was in 2022 (exact date unknown). Use `'2022-12-01'` as a conservative estimate.

**Files:**
- `src/routes/+page.svelte` line 49
- `src/routes/security/+page.svelte` line 18

### Fix 6 — Remove non-functional SearchAction (or implement it)
**File:** `src/routes/+page.svelte` lines 79-83
The target `${SITE_URL}/?q={search_term_string}` doesn't correspond to any real search endpoint. Remove the `potentialAction` from WebSite schema unless a real site search exists.

### Fix 7 — Update GEO-AUDIT-REPORT.md to reflect reality
Correct all false positives (C1, C2, H4, M1), update scores accordingly. Real score should be higher than 50/100 since C1 and C2 were worth heavy weight.

---

## Files to Modify

| File | Changes |
|---|---|
| `src/routes/+page.svelte` | Fix ratingCount (int), fix og:url, fix Organization sameAs, fix datePublished, fix/remove SearchAction |
| `src/routes/security/+page.svelte` | Fix TechArticle author (Person→Organization), fix datePublished |
| `GEO-AUDIT-REPORT.md` | Correct false positives, update scores, rewrite Critical Issues section |

---

## Verification

After changes:
1. Run `npm run build` — should complete without errors
2. Inspect `.svelte-kit/output/prerendered/pages/index.html` — verify JSON-LD changes are in static HTML
3. Validate schema at https://validator.schema.org using the live URL
4. Confirm `/llms.txt` and `/llms-full.txt` are prerendered in output
5. Check hreflang in the prerendered index.html output
