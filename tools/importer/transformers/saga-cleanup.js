/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Saga site cleanup.
 * Removes non-authorable content: navigation, footer, cookie consent, tracking elements.
 * Selectors from captured DOM of https://www.saga.co.uk/
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove cookie consent and tracking overlays (block parsing)
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '#onetrust-banner-sdk',
      '[class*="onetrust"]',
      '#CybotCookiebotDialog',
      '.sticky-newsletter',
      '#adl_params',
    ]);
  }

  if (hookName === H.after) {
    // Remove non-authorable site chrome
    WebImporter.DOMUtils.remove(element, [
      'nav.meganav',
      'footer.megafoot',
      'noscript',
      'iframe',
      'link',
    ]);

    // Remove tracking/analytics attributes
    element.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('data-di-res-id');
      el.removeAttribute('data-di-rand');
      el.removeAttribute('onclick');
    });
  }
}
