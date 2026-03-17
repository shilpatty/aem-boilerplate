/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-climate. Base: hero.
 * Source: https://matthey.com/sustainability/climate
 * Source selector: .panels-hero
 * Block library: 1 column, row 1 = background image (optional), row 2 = heading + subheading + CTA
 * Generated: 2026-03-17
 */
export default function parse(element, { document }) {
  // Extract background image - on live page it's a CSS background-image, not an <img>
  // The scraper converts this to <img> in cleaned.html, but validation runs on live page
  let bgImage = element.querySelector(':scope > img, :scope > picture img');

  // Fallback: extract from computed CSS background-image
  if (!bgImage) {
    const cs = window.getComputedStyle(element);
    const bgStyle = cs.backgroundImage || element.style.backgroundImage;
    if (bgStyle && bgStyle !== 'none') {
      const urlMatch = bgStyle.match(/url\(["']?(.*?)["']?\)/);
      if (urlMatch && urlMatch[1]) {
        bgImage = document.createElement('img');
        bgImage.src = urlMatch[1];
      }
    }
  }

  // Extract heading from .panels-hero-header h1
  const heading = element.querySelector('.panels-hero-header h1, h1');

  // Build cells matching hero block library structure:
  // Row 1: background image (optional)
  // Row 2: heading + subheading + CTA
  const cells = [];

  // Row 1: background image
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: content (heading + any subheading or CTA)
  const contentCell = [];
  if (heading) contentCell.push(heading);

  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  // Preserve any child block tables created by earlier parsers (e.g., columns-stats)
  const childBlockTables = [...element.querySelectorAll(':scope table')].map((t) => t.closest('div') || t);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-climate', cells });
  element.replaceWith(block);

  // Re-insert child block tables after the hero block
  childBlockTables.forEach((cb) => {
    block.after(cb);
  });
}
