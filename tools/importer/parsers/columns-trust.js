/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-trust. Base: columns.
 * Source: https://www.saga.co.uk/
 * Handles: .trust-panel with title, description, and award logos
 * Columns block: 2 columns - col1 = heading + description, col2 = award logos
 */
export default function parse(element, { document }) {
  const title = element.querySelector('.trust-panel__title, h2');
  const description = element.querySelector('.trust-panel__description');
  const logoItems = element.querySelectorAll('.trust-panel__logo-item');

  // Column 1: heading + description
  const textCol = document.createElement('div');
  if (title) textCol.append(title);
  if (description) textCol.append(description);

  // Column 2: award logos with links
  const logosCol = document.createElement('div');
  logoItems.forEach((item) => {
    const img = item.querySelector('.trust-panel__logo, img');
    if (img) {
      const link = document.createElement('a');
      link.href = item.href || '#';
      link.append(img);
      logosCol.append(link);
    }
  });

  const cells = [[textCol, logosCol]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-trust', cells });
  element.replaceWith(block);
}
