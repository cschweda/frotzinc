# frotz, Inc.

The landing page for frotz, Inc., the umbrella for a family of open-source, browser-native tools
for Z-machine interactive fiction: [frotzsmith](https://frotzsmith.frotzinc.com),
[frotzlens](https://frotzlens.frotzinc.com),
[frotzplay](https://frotzplay.frotzinc.com), and the tools still to come.

Live at **https://frotzinc.com**.

## Layout

```
public/               everything Netlify serves (the publish directory)
  index.html          the page
  404.html            "You can't go that way." Netlify serves it automatically for missing paths
  styles.css          shared by index.html and 404.html
  site.js             theme toggle (applied before first paint) and the status-line score
  fonts/              self-hosted Open Sans (variable) and Courier Prime, latin subset, OFL
  images/             product thumbnails (WebP, 480w and 1200w)
  favicon.svg/.ico    lantern icon; apple-touch-icon.png for iOS home screens
  og-image.png        1200x630 social card for link previews
  robots.txt, sitemap.xml
  llms.txt            plain-language site summary for LLMs (llmstxt.org)
tools/
  og-image.html       source for og-image.png
  render-og.sh        re-renders og-image.png with headless Chrome
netlify.toml          publish dir, security headers (CSP), cache rules
```

Only `public/` is deployed, so this README, `netlify.toml` and `tools/` are never served.

## Local preview

No build step, no dependencies. Serve `public/` with any static server, for example:

```sh
npx serve public
# or
python3 -m http.server -d public 8080
```

Use a server rather than opening the file directly: the page uses root-relative paths
(`/styles.css`, `/fonts/...`).

To preview with the real headers and 404 handling, use the Netlify CLI: `npx netlify dev`.

## Deploying

1. Push this repo to GitHub.
2. In Netlify: **Add new site → Import an existing project**, pick the repo. The settings come
   from `netlify.toml` (publish `public`, no build command), so nothing needs entering.
3. **Domain management → Add a domain** → `frotzinc.com`. Add `www.frotzinc.com` too; Netlify
   redirects www to the primary domain automatically and provisions HTTPS.

## Common edits

- **Adding a product:** copy an `<li class="item">` in `index.html`. Use `class="item linked"`
  and an `<a>` in the `<h3>` once it has a URL, and add it to the JSON-LD `ItemList` and
  `llms.txt`. For a thumbnail, export a 1200x630 card and make
  WebPs: `cwebp -q 82 card.png -o name-1200.webp && cwebp -q 82 -resize 480 0 card.png -o name-480.webp`.
- **Social card:** edit `tools/og-image.html`, then run `./tools/render-og.sh`.
- **Dates:** when the page content changes, bump `<lastmod>` in `public/sitemap.xml` and
  `dateModified` in the JSON-LD in `index.html`. Keep `public/llms.txt` in step with the catalog.
- **Analytics:** Plausible is loaded in the `<head>` of `index.html` and `404.html`, and
  `https://plausible.io` is allowed in the CSP's `script-src` and `connect-src`.
- **Third-party scripts or embeds:** add the origin to the `Content-Security-Policy` in
  `netlify.toml` or the browser will block it.
- **Netlify badge:** the free plan injects a "Powered by Netlify" badge, which needs
  `'unsafe-inline'` in the CSP. See the comment in `netlify.toml` for how to tighten it again
  on a paid plan.
- **Domain change:** update the canonical, `og:url` and `og:image` in `index.html`,
  `robots.txt`, and `sitemap.xml`.

## License

Code: MIT (see `LICENSE`). Fonts: SIL Open Font License 1.1 (see `public/fonts/`).
