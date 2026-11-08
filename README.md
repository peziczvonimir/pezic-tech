# Pezic Tech Solutions

Static website for `pezic-tech.com` with a Pezic Tech homepage and separate pages for SUNCRO and HEATCONTROL. German is served at the root. English, Croatian and Italian use `/en/`, `/hr/` and `/it/`.

## Preview

From the project directory, run `python -m http.server 8765 --bind 127.0.0.1` and open `http://127.0.0.1:8765/`. Use a local server so directory URLs and language navigation behave as they do on the host.

## Edit

- `site/copy.mjs` contains the localized copy and the product list.
- `site/build.mjs` renders the shared layouts. Run `node site/build.mjs` after editing the layouts or copy, then commit the generated HTML. The host serves the checked-in files directly and needs no build step.
- `assets/css/pezic.css` and `assets/js/site.js` provide styles and navigation behavior.
- `auth-confirmed/` and `reset-password/` are existing SUNCRO account routes. Keep their public URLs when publishing the marketing site.

Add a product by registering it in the product list and adding copy in all four languages. Choose a visual theme and add any logo, portal or demo links in its entry.

## Publication

The existing domain is declared in `CNAME`. The legal notice and privacy notice are marked as drafts in each locale. Complete and review the operator details and privacy notice before publishing.
