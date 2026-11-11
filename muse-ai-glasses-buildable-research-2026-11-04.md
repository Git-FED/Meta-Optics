# Muse AI Glasses buildable research note

**Rebuilt for this package on 2026-11-11.** The filename reflects a research document named in the supplied file tree; its original contents were not attached. This is a new, source-linked note, not the missing original.

## Scope and conclusion

The requested product can be delivered as a provider-neutral static site with no runtime backend. The reference excerpt concerns Gen 2 Wayfarer pairing, reset, battery and charging. Before presenting those steps as actionable guidance, compare them with current manufacturer support instructions and label unsupported personal methods as anecdotal.

## Support findings

**Pairing.** Meta’s published flow requires the Meta AI app and a charging case. Turn glasses on, dock them with the nose bridge contacts aligned, wait for the case LED to flash blue, then add the glasses from the app. Holding the case button for at least five seconds manually starts pairing mode. Meta states that the glasses pair with one Meta account at a time and must be factory reset before a different account pairs. [1]

**Troubleshooting.** Meta recommends an up-to-date app, Bluetooth and Wi-Fi enabled, adequate charge, and waiting about 45 seconds after docking powered-on glasses. If the glasses appear in the phone Bluetooth list, forget that connection and retry in the app. A continuously blinking white glasses LED during pairing is a reason to try a force restart. [2]

**Factory reset.** Meta’s Ray-Ban Meta/Oakley Meta sequence is: glasses out of the case, charged and on; fold both arms; press capture five times until the LED turns orange; hold capture and release when the LED flashes. Reset removes photos/videos on the glasses and requires pairing again. [3]

**Restart.** A force restart is a separate, non-erasing action: power off, hold capture, power on while holding, then release when the status LED turns red. [4]

**Charging and LEDs.** Meta says glasses charge in the case and the case charges through USB-C. The case LED indicates status for docked glasses or an empty case depending on context. A clip-on cable connected directly to nose-bridge contacts is not in Meta’s supported charging method and should not be promoted as a recommendation. [5]

**Battery.** Meta lists Ray-Ban Meta Gen 2 at up to eight hours for moderate use and up to 48 hours of charging for the fully charged case. These figures vary with use and other factors. [6]

**LEDs/privacy.** Notification LED colors signal multiple categories; Meta directs users to the per-device LED library inside the Meta AI app. The Capture LED is a separate recording indicator. [7] [8]

## Static-site implementation and deployment

Build as standalone HTML pages, local CSS/JavaScript and local images with internal links to real HTML routes. GitHub Pages supports a custom Actions deployment workflow; the GitHub workflow in the archive publishes `site/`. Cloudflare Pages accepts a static output folder through its Wrangler Pages deploy command. Cloudflare Workers can deploy static assets referenced in a Wrangler config. No framework or build step is needed. [9] [10] [11]

## References

[1]: https://www.meta.com/help/ai-glasses/268269592726432/ "How to pair and unpair AI glasses with the Meta AI app"
[2]: https://www.meta.com/help/ai-glasses/852077233025627/ "How to fix pairing issues with AI glasses"
[3]: https://www.meta.com/help/ai-glasses/814846737027479/ "How to factory reset AI glasses and charging case"
[4]: https://www.meta.com/help/ai-glasses/905490264519056/ "How to restart AI glasses"
[5]: https://www.meta.com/help/ai-glasses/844064497339059/ "How to charge AI glasses"
[6]: https://www.meta.com/help/ai-glasses/303057485648146/ "Battery life on AI glasses"
[7]: https://www.meta.com/help/ai-glasses/757215899749677/ "Notification LED on AI glasses"
[8]: https://www.meta.com/ai-glasses/privacy/ "Privacy, built in every pair"
[9]: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages "Using custom workflows with GitHub Pages"
[10]: https://developers.cloudflare.com/pages/get-started/direct-upload/ "Cloudflare Pages Direct Upload"
[11]: https://developers.cloudflare.com/workers/static-assets/ "Cloudflare Workers Static Assets"
