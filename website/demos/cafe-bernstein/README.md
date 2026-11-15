# Café Bernstein — Hospitality Website Concept

**Project type:** Independent café / hospitality website concept  
**Status:** Portfolio demonstrator — not an official client commission  
**Location represented:** Gärtnerstraße 15, 10245 Berlin, Germany  
**Credits:** Designed and engineered by ERYNDEX

## Preview

- Public route after the ERYNDEX website deployment: `https://eryndex.pages.dev/demos/cafe-bernstein/`
- Official café website: https://www.cafe-bernstein.berlin/

The preview URL depends on the ERYNDEX Cloudflare Pages project deploying this repository. A GitHub commit alone does not confirm a production deployment.

## Concept brief

Create a distinct, premium digital presentation for Café Bernstein that combines a modern hospitality interface with classic editorial styling. The direction uses espresso brown, charcoal, warm cream and muted brass, supported by an animated 3D coffee-cup scene, responsive navigation, a filterable menu, a local favourites panel, an editorial story section, a gallery and visit information.

This is a design proposal based on the café's publicly available website and menu. It is not the café's official website and must not be presented as commissioned, approved or endorsed by the business.

## Implementation

- Semantic HTML5 and responsive CSS
- Vanilla JavaScript, loaded from the local `app.js`
- Three.js r152 from cdnjs for the 3D coffee cup, saucer, floating beans and steam
- Scroll-reveal using Intersection Observer
- Menu category filters
- Browser-session favourites drawer (no persistence or order submission)
- Reduced-motion handling and keyboard-operable controls
- No frontend build step, application backend or database

### Files

```text
website/demos/cafe-bernstein/
├── index.html
├── app.js
└── README.md
```

## Public business information represented

The following details were checked against the café's own public website on 16 November 2026:

- Address: Gärtnerstraße 15, 10245 Berlin, Germany
- Phone: +49 30 887 25 640
- Email: info@cafe-bernstein.berlin
- Opening hours: Monday–Friday 08:00–19:00; Saturday–Sunday 09:00–18:00
- Publicly listed menu examples and prices include Orient Morning (€24.50), Vegan Morning (€19.50), Powercado (€14.50), French Toast (€14.50), Spicy Chicken (€15.50), small Cappuccino (€3.80) and Latte Macchiato (€4.40).

Sources:
- https://www.cafe-bernstein.berlin/
- https://www.cafe-bernstein.berlin/about/
- https://www.cafe-bernstein.berlin/menu/
- https://www.cafe-bernstein.berlin/hot-drinks/

Prices, availability and operating hours may change. Reconfirm details with the café before a client presentation or publication.

## Accuracy and safety boundaries

- Food and venue images in this concept are illustrative stock imagery, not verified photographs of Café Bernstein or its actual dishes.
- The menu is a limited selection based on public listings; it is not a complete or live menu feed.
- The favourites panel is a client-side demonstration only.
- There is no active checkout, payment processing, table-reservation engine, customer database or order API.
- The phone, email and directions links hand off to the visitor's device or map provider.
- The page includes an explicit concept notice and a no-index directive to reduce confusion with the official café website.
- Obtain written permission before using the business's trademarks, original photography, or presenting the proposal as an official partnership.

## Security headers

The parent ERYNDEX site applies a strict Content Security Policy. The scoped rule in `website/_headers` detaches the inherited policy for this demo route and allows only the pinned Three.js CDN origin in `script-src`. Other company pages keep their original policy.

## Local preview

Open `index.html` directly, or serve the website directory with a static server:

```bash
cd website
python -m http.server 8000
```

Open http://localhost:8000/demos/cafe-bernstein/.

The 3D scene requires WebGL and the external Three.js CDN. The rest of the page remains readable if WebGL is unavailable.

## Pre-publication checklist

- [ ] Confirm permission to use the café name and brand assets in a commercial proposal.
- [ ] Replace illustrative stock imagery with client-approved photography if the proposal is accepted.
- [ ] Reconfirm menu names, descriptions, prices and current opening hours.
- [ ] Obtain approved copy and any reservation/order requirements.
- [ ] Test the final hosted page on desktop and mobile.
- [ ] Check deployed CSP headers and the 3D CDN request.
- [ ] Keep ordering, booking and payment features disabled until real integrations are scoped and tested.
