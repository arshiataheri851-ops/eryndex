# Repository Migration Record

**Destination:** `arshiataheri851-ops/eryndex`  
**Branch:** `main`

## What was copied

| Destination | Source |
|---|---|
| `website/**` | `arshiataheri851-ops/portfolio/eryndex/**` |
| `docs/COMPANY_PROFILE.md`, `docs/PORTFOLIO_INDEX.md`, `docs/PUBLICATION_AUDIT.md` | The corresponding ERYNDEX documentation files in `portfolio/eryndex/` |
| `docs/legacy-website-case-study/**` | `arshiataheri851-ops/portfolio/eryndex-company-website/**` |
| `website/tests/check_site.py` | `arshiataheri851-ops/arshiataheri851-ops/projects/eryndex-company-website/tests/check_site.py` |
| `docs/website-case-study.html` | `arshiataheri851-ops/arshiataheri851-ops/projects/eryndex-company-website/docs/portfolio-case-study.html` |

## Included website components

- English and Persian homepages
- English and Persian profile pages
- Four service detail pages
- Five portfolio/work case-study pages
- Shared CSS, JavaScript, and public configuration
- Response headers, robots.txt, and sitemap.xml
- Yar Mansion demo page
- Contact form Worker source, Wrangler configuration, and its README
- Company profile, portfolio index, and publication audit

## Deliberately not moved

The original repositories were not modified or deleted. The engineering source projects (including FarsiPulse, AtlasRAG, RelayForge, RoutePilot, and SignalDesk) remain in their existing repositories and are linked from the portfolio index. This avoids creating divergent duplicate copies of those application codebases.

## Deployment impact

This is a source-code copy only. It does not change Cloudflare Pages, Render, Netlify, DNS, environment variables, Worker secrets, or any live service configuration. The previous hosting setup remains untouched until a new deployment is explicitly configured and verified.
