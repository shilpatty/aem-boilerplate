/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-campaign. Base: cards.
 * Source: https://www.saga.co.uk/
 * Handles: .campaign-pods containers with .card.campaign-pod children
 * Cards block: 2 columns per row - col1 = image, col2 = title + body + CTA
 */
export default function parse(element, { document }) {
  const cards = element.querySelectorAll('.card.campaign-pod');
  const cells = [];

  cards.forEach((card) => {
    const image = card.querySelector('.card__image img');
    const title = card.querySelector('.card__title');
    const body = card.querySelector('.card__body');
    const cta = card.querySelector('a.expanded-link, a.card__cta');

    // Column 1: image
    const imageCell = document.createElement('div');
    if (image) imageCell.append(image);

    // Column 2: title + body + CTA in one cell
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

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-campaign', cells });
  element.replaceWith(block);
}
