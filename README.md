# Pezic Tech Solutions

Static website for `pezic-tech.com` with a Pezic Tech homepage and separate pages for SUNCRO and HEATCONTROL. German is served at the root. English, Croatian and French use `/en/`, `/hr/` and `/fr/`.

## Preview

From the project directory, run `python -m http.server 8765 --bind 127.0.0.1` and open `http://127.0.0.1:8765/`. Use a local server so directory URLs and language navigation behave as they do on the host.

## Edit

- `site/copy.mjs` contains the localized copy and the product list.
- `site/legal.mjs` contains the operator details and the four privacy notices.
- `site/build.mjs` renders the shared layouts and sitemap. Run `node site/build.mjs` after editing the layouts or copy, then commit the generated output. The host serves the checked-in files directly and needs no build step.
- `assets/css/pezic.css` and `assets/js/site.js` provide styles and navigation behavior.
- `auth-confirmed/` and `reset-password/` are existing SUNCRO account routes. Keep their public URLs when publishing the marketing site.

Add a product by registering it in the product list and adding copy in all four languages. Choose a visual theme and add any logo, portal or demo links in its entry.

## Publication

GitHub Pages publishes the root of `main` to the domain declared in `CNAME`. The SUNCRO account callbacks also run on `go.pezic-tech.com`. Keep the privacy notice current if hosting, account processing, cookies, analytics or operator details change.

The password recovery page serves the browser build of `@supabase/supabase-js` 2.119.0 from `assets/vendor/`, together with its MIT license. When updating it, take `dist/umd/supabase.js` and `LICENSE` from the corresponding official npm package, update the script reference and verify both recovery link formats.
