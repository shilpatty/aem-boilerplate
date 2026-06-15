/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-features. Base: cards.
 * Source: https://www.saga.co.uk/car-insurance
 * Handles: .content-group.content-group--lg with grid of icon + title + description items
 * Cards block: 2 columns per row - col1 = icon image, col2 = title + description
 */
export default function parse(element, { document }) {
  const items = element.querySelectorAll('.content-group__item');
  const cells = [];

  items.forEach((item) => {
    const icon = item.querySelector('.content-group__item-icon img');
    const title = item.querySelector('.content-group__item-title');
    const desc = item.querySelector('.content-group__item-description');

    const imageCell = document.createElement('div');
    if (icon) imageCell.append(icon);

    const textCell = document.createElement('div');
    if (title) textCell.append(title);
    if (desc) textCell.append(desc);

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-features', cells });
  element.replaceWith(block);
}
