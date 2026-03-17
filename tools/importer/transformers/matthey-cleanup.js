/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: matthey cleanup. Selectors from captured DOM of matthey.com.
 * Removes non-authorable content: header, footer, nav, breadcrumbs, cookie banner, search.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie consent banner (OneTrust) - found in captured DOM: #onetrust-consent-sdk
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
    ]);
  }
  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable content from captured DOM
    WebImporter.DOMUtils.remove(element, [
      // Header: <header id="banner" class="jmheader--fixed">
      'header#banner',
      // Navigation: <nav id="navigation" class="jmheader__navbar">
      'nav#navigation',
      // Skip nav: <nav class="quick-access-nav">
      'nav.quick-access-nav',
      // Mobile nav toggle
      '.nav__toggler',
      // Breadcrumbs: <nav id="breadcrumbs">
      'nav#breadcrumbs',
      // Footer: <div class="container-fluid bg--theme">
      '.bg--theme',
      // Hidden form
      'form.hide',
      // Safe element cleanup
      'noscript',
      'link',
      'iframe',
    ]);
  }
}
