/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-product. Base: hero.
 * Source: https://www.saga.co.uk/car-insurance
 * Handles: .hero.hero--large with background image, title, CTAs, and award logos
 * Hero block: 1 column, row 1 = background image, row 2 = heading + CTAs, row 3 = award logos
 */
export default function parse(element, { document }) {
  const bgImage = element.querySelector('.hero__image img');
  const heading = element.querySelector('.hero__title, h1');
  const ctas = Array.from(element.querySelectorAll('.hero__ctas a.button'));
  const logos = Array.from(element.querySelectorAll('.hero__logos img'));

  const cells = [];

  // Row 1: background image
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: heading + CTA buttons in a single cell
  const contentWrapper = document.createElement('div');
  if (heading) contentWrapper.append(heading);
  ctas.forEach((cta) => contentWrapper.append(cta));
  if (contentWrapper.childNodes.length > 0) {
    cells.push([contentWrapper]);
  }

  // Row 3: award logos
  if (logos.length > 0) {
    const logosWrapper = document.createElement('div');
    logos.forEach((logo) => logosWrapper.append(logo));
    cells.push([logosWrapper]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-product', cells });
  element.replaceWith(block);
}
