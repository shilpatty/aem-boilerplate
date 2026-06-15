/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Nuffield Health site-wide cleanup.
 *
 * Removes non-authorable site shell / chrome and tracking markup so the import
 * contains only page-level authorable content. The real page content begins at
 * <div id="main">; everything else (top nav, footer, cookie consent, tracking
 * pixels/iframes, third-party widgets) is removed.
 *
 * ⚠️ ALL selectors below were verified against the captured DOM in:
 *   - migration-work/cleaned.html (homepage)
 *   - migration-work-hospitals/cleaned.html (hospitals listing)
 * No selectors are guessed. Source line references noted in comments.
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Cookie consent banner + overlay (both pages, lines 2-19): #ccc wraps
    // #ccc-overlay and #ccc-notify (.ccc-* buttons/text). Remove before block
    // parsing so it cannot interfere with block matching.
    WebImporter.DOMUtils.remove(element, [
      '#ccc', // cookie-consent container (includes #ccc-overlay, #ccc-notify, .ccc-*)
      '#ccc-overlay',
      '#ccc-notify',
      '.browser-notification', // legacy IE upgrade prompt (homepage line 1035: #action_insert_*)
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Non-authorable site shell / chrome (both pages):
    //   - .nav / #nav            top navigation + drawers (line 30)
    //   - .nav__skiplink         "Skip to content" link (line 29)
    //   - #focus-on-nav          nav focus trap anchor (line 867)
    //   - .footer / charcoal row footer link lists (homepage 5910/5915, hospitals 2900)
    //   - #sprite                inlined SVG sprite sheet (homepage 5951, hospitals 2936)
    //   - .pac-container         Google Places autocomplete dropdown (homepage 5956, hospitals 2943)
    WebImporter.DOMUtils.remove(element, [
      '.nav',
      '#nav',
      '.nav__skiplink',
      '#focus-on-nav',
      '.footer',
      '#sprite',
      '.pac-container',
    ]);

    // Analytics / tracking / third-party embeds (verified in captured DOM):
    //   - #destination_publishing_iframe_* / .aamIframeLoaded  Adobe demdex ID sync iframe
    //   - #AWIN_CDT                                            AWIN affiliate tracking iframe
    //   - img[src*="lantern.roeye.com"]                        Roeye tracking pixel
    //   - iframe.doctify-widget                                Doctify ratings embed (hospitals line 903)
    //   - .g-recaptcha / .g-recaptcha-bubble-arrow / iframe[src*="recaptcha"]  Google reCAPTCHA (hospitals)
    WebImporter.DOMUtils.remove(element, [
      'iframe[id^="destination_publishing_iframe"]',
      '.aamIframeLoaded',
      '#AWIN_CDT',
      'img[src*="lantern.roeye.com"]',
      'iframe.doctify-widget',
      '.g-recaptcha',
      '.g-recaptcha-bubble-arrow',
      'iframe[src*="recaptcha"]',
    ]);

    // Generic safe leftover removals (present in captured DOM): tracking iframes,
    // noscript, link, source elements that are never authorable.
    WebImporter.DOMUtils.remove(element, [
      'iframe[src="about:blank"]',
      'noscript',
      'link',
    ]);
  }
}
