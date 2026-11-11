# Project record — Muse AI Glasses

**Package date:** 2026-11-11  
**Format:** Static HTML/CSS/JavaScript project, bundled as a ZIP  
**Hosting intent:** User-controlled GitHub Pages, Cloudflare Pages, or Cloudflare Workers. No Manus-hosted site or public URL is created.

## Product summary

An independent multi-page help site using a dark midnight palette, slow aurora motion, reduced-motion accessibility, original comic illustrations, a symbol-only SVG favicon, and a small custom blinking-light GIF. Internal site navigation uses actual `.html` pages. Public files are contained in `site/`.

## Sources supplied

The attachment included a quick pairing guide and a tree naming a pairing guide, a research report, and ten worker receipt documents. The bodies of those named documents were not attached. The package does not represent its newly written notes as originals; it creates fresh source-limited versions and states the limitation in `site/about.html` and the research docs.

## Editorial corrections

- Meta’s official pairing flow uses the Meta AI app and charging case. The submitted case-free steps are labeled as an unverified field note.
- Meta’s official factory reset for Ray-Ban Meta/Oakley Meta glasses: glasses out of case, charged and powered on; fold both arms; press capture five times until orange; hold capture and release when the LED flashes. Reset deletes on-glasses captures.
- A force restart is presented separately and is non-erasing according to Meta.
- Meta says Ray-Ban Meta/Oakley Meta glasses charge in their case. The seller-claimed clip-on USB-C cable technique is not recommended.
- The Gen 2 estimate is up to eight hours for moderate use; the fully charged case provides up to 48 hours of charging capacity. These are manufacturer estimates.
- The LED guide distinguishes case status, glasses notification LEDs and the capture/privacy LED; detailed notification patterns are directed to the in-app library.

## README/demo update

The root README is now a project landing page that describes the actual static site, quick start, deployment status and limitations. It includes a roughly 29-second Chromium walkthrough recorded from the locally served site, four real browser screenshots, and thumbnails of all five original illustrations. `scripts/check_site.py` runs a dependency-free static link/fragment/asset smoke check and uses Node.js for JavaScript syntax checks when Node is available. The demo is not a live deployment; the working copy has no `.git` directory or configured remote.

## Deliverables and limitations

See `FILE-TREE.md` for the complete archive structure. The Support page contains the user-supplied public/live PayPal plan identifier and Stripe publishable key, plus third-party sponsorship/donation links. They enable real checkout flows if the user deploys the archive. The page uses a session-only 18+ self-attestation, which is not robust age verification. The Discord directory adds two user-provided public server links and an 18+ self-attestation before a local HTML page asks for an email request to `museai@fedpromptly.com`; the adult invite URL is not used. All pages share an animated FED-OS footer with short public-link buttons. The footer links to a gated Private Communities page rather than exposing the Matrix URL. That page uses browser-only age and country self-attestation, not verified geolocation or legal age checks. The project has not been published.
