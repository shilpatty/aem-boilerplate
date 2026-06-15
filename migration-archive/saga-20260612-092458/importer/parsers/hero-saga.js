/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-saga. Base: hero.
 * Source: https://www.saga.co.uk/
 * Handles: .hero-banner (main hero) and .promotional-banner (mid-page promo)
 * Hero block: 1 column, row 1 = background image, row 2 = heading + body + CTA (single cell)
 */
export default function parse(element, { document }) {
  // Extract background image from either hero-banner or promotional-banner
  const bgImage = element.querySelector('.hero-banner__img, .promotional-banner__img');

  // Extract heading (h1 for hero, h2 for promotional)
  const heading = element.querySelector('.hero-banner__title, .promotional-banner__title, h1, h2');

  // Extract body text
  const body = element.querySelector('.hero-banner__body, .promotional-banner__body');

  // Extract CTA link
  const cta = element.querySelector('.hero-banner__cta, .promotional-banner__cta, a.button');

  // Build cells matching hero block structure (1 column):
  // Row 1: background image
  // Row 2: single cell with heading + body + CTA
  const cells = [];

  if (bgImage) {
    cells.push([bgImage]);
  }

  // Wrap all content in a single container div for one cell
  const contentWrapper = document.createElement('div');
  if (heading) contentWrapper.append(heading);
  if (body) contentWrapper.append(body);
  if (cta) contentWrapper.append(cta);

  if (contentWrapper.childNodes.length > 0) {
    cells.push([contentWrapper]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-saga', cells });
  element.replaceWith(block);
}
