# ERYNDEX

**Build beyond the expected.**

ERYNDEX is an independent software engineering and applied-AI partner focused on practical, maintainable software delivery.

This repository is the central home for ERYNDEX's company website, public company documentation, portfolio index, demo pages, and supporting website infrastructure.

## Repository map

| Path | Purpose |
|---|---|
| `website/` | Current bilingual company website (English and Persian), service pages, work/case-study pages, profile pages, shared assets, and demo pages |
| `website/contact-api/` | Cloudflare Worker source and deployment notes for the inquiry form |
| `website/demos/` | Independent hospitality website concept demos (Yar Mansion Cafe and Café Bernstein) |
| `docs/COMPANY_PROFILE.md` | Approved company positioning, services, leadership responsibilities, and delivery process |
| `docs/PORTFOLIO_INDEX.md` | Portfolio inventory with source links and status/claim boundaries |
| `docs/PUBLICATION_AUDIT.md` | Content consistency audit and remaining launch checks |
| `docs/website-case-study.html` | Website case-study page |
| `docs/legacy-website-case-study/` | Earlier website concept and its case-study materials, retained for reference |

## Website preview

- English: https://eryndex.pages.dev/
- Persian: https://eryndex.pages.dev/fa/
- Leadership profile: https://eryndex.pages.dev/profile/
- Persian leadership profile: https://eryndex.pages.dev/fa/profile/

These are the existing public URLs documented by the previous deployment. This repository migration does **not** change the hosting configuration or prove current uptime.

## Local preview

The frontend is plain HTML, CSS, and JavaScript; there is no frontend build step.

You can open `website/index.html` directly, or run a local static server from the repository root:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000/website/`.

## Static hosting configuration

For a new Cloudflare Pages or Netlify deployment from this repository:

- Production branch: `main`
- Base/root directory: `website`
- Build command: leave empty
- Publish/output directory: `.` (relative to `website`)

The existing Cloudflare Pages project still points to the original repository until its settings are deliberately changed. Do not disconnect or delete the old source before a replacement deployment has been verified.

## Contact form — current limitation

The contact form interface and client-side validation are present. The endpoint in `website/assets/config.js` is currently blank, so the form uses an email-app fallback. The Worker in `website/contact-api/` is source code only; it is **not** evidence of a deployed, configured, tested live submission service.

Before enabling server-side submissions:
1. Deploy the Worker independently.
2. Configure allowed origins and verified sender/recipient addresses.
3. Store provider credentials as Worker secrets, never in Git.
4. Add rate limiting and bot protection.
5. Set the deployed Worker URL in `website/assets/config.js` and update `connect-src` in `website/_headers`.
6. Test successful delivery, validation failures, CORS, provider failures, and abuse controls.

## Portfolio accuracy

The portfolio contains demonstrators, reference implementations, concepts, and MVPs. A public page or repository does not by itself establish a paid customer engagement, production deployment, or customer outcome.

Use the status and technical limitations documented in `docs/PORTFOLIO_INDEX.md` and `docs/PUBLICATION_AUDIT.md`. Do not invent clients, testimonials, metrics, certifications, legal details, or production guarantees.

Project source code remains in its existing engineering repositories and is linked from the portfolio index; it has not been duplicated wholesale into this company repository.

## Company identity and publication

The public brand name is **ERYNDEX**. The company profile is the reference for public descriptions. Legal registration details, team credentials, customer references, and commercial claims must be verified and approved before publication.

## Migration note

The files in this repository were copied from the existing ERYNDEX website and documentation directories in the `portfolio` and engineering repositories. Those original repositories were left unchanged. See `docs/REPOSITORY_MIGRATION.md` for the source-to-destination mapping.
