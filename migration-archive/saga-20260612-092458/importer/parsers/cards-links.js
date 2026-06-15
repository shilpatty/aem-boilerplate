/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-links. Base: cards.
 * Source: https://www.saga.co.uk/car-insurance
 * Handles: .group-icon-button with grid of icon + label links
 * Cards block: 2 columns per row - col1 = icon, col2 = label link
 */
export default function parse(element, { document }) {
  const items = element.querySelectorAll('.group-icon-button__list li');
  const cells = [];

  items.forEach((item) => {
    const link = item.querySelector('a');
    const icon = item.querySelector('img');

    const imageCell = document.createElement('div');
    if (icon) imageCell.append(icon);

    const textCell = document.createElement('div');
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent.trim();
      textCell.append(a);
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-links', cells });
  element.replaceWith(block);
}
