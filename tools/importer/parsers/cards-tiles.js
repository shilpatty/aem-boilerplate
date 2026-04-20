/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-tiles. Base: cards.
 * Source: https://www.saga.co.uk/
 * Handles: .new-bu-container with .bu-tile children (8 business unit tiles)
 * Cards block: 2 columns per row - col1 = image, col2 = title + body + CTA
 */
export default function parse(element, { document }) {
  const tiles = element.querySelectorAll('.bu-tile');
  const cells = [];

  tiles.forEach((tile) => {
    const image = tile.querySelector('.bu-image img');
    const title = tile.querySelector('.bu-text h3');
    const body = tile.querySelector('.bu-text p');
    const cta = tile.querySelector('.bu-cta a');

    // Column 1: image
    const imageCell = document.createElement('div');
    if (image) imageCell.append(image);

    // Column 2: title + body + CTA
    const textCell = document.createElement('div');
    if (title) {
      const heading = document.createElement('strong');
      heading.textContent = title.textContent.trim();
      textCell.append(heading);
    }
    if (body) {
      const p = document.createElement('p');
      p.textContent = body.textContent.trim();
      textCell.append(p);
    }
    if (cta) textCell.append(cta);

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-tiles', cells });
  element.replaceWith(block);
}
