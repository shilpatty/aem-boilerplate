/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-articles. Base: cards.
 * Source: https://www.saga.co.uk/
 * Handles: .mag-article-feed with .mag-article-feed__card children
 * Cards block: 2 columns per row - col1 = image, col2 = title link
 */
export default function parse(element, { document }) {
  const cards = element.querySelectorAll('.mag-article-feed__card');
  const cells = [];

  cards.forEach((card) => {
    const image = card.querySelector('.card__image img');
    const titleLink = card.querySelector('.card__title a.expanded-link');

    // Column 1: image
    const imageCell = document.createElement('div');
    if (image) imageCell.append(image);

    // Column 2: title as linked heading
    const textCell = document.createElement('div');
    if (titleLink) {
      const heading = document.createElement('strong');
      const link = document.createElement('a');
      link.href = titleLink.href;
      link.textContent = titleLink.textContent.trim();
      heading.append(link);
      textCell.append(heading);
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-articles', cells });
  element.replaceWith(block);
}
