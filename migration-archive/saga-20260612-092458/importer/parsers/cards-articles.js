/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-articles. Base: cards.
 * Source: https://www.saga.co.uk/ and https://www.saga.co.uk/car-insurance
 * Handles: .mag-article-feed with .mag-article-feed__card children (homepage)
 *          .card-carousel with .card children (product pages)
 * Cards block: 2 columns per row - col1 = image, col2 = title link + description
 */
export default function parse(element, { document }) {
  // Support both homepage (.mag-article-feed__card) and product page (.card) selectors
  let cards = element.querySelectorAll('.mag-article-feed__card');
  if (cards.length === 0) {
    cards = element.querySelectorAll('.card');
  }

  const cells = [];

  cards.forEach((card) => {
    const image = card.querySelector('.card__image img');
    const titleLink = card.querySelector('.card__title a.expanded-link, .card__title a');
    const body = card.querySelector('.card__body');

    // Column 1: image
    const imageCell = document.createElement('div');
    if (image) imageCell.append(image);

    // Column 2: title as linked heading + optional description
    const textCell = document.createElement('div');
    if (titleLink) {
      const heading = document.createElement('strong');
      const link = document.createElement('a');
      link.href = titleLink.href;
      link.textContent = titleLink.textContent.trim();
      heading.append(link);
      textCell.append(heading);
    }
    if (body) {
      textCell.append(body);
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-articles', cells });
  element.replaceWith(block);
}
