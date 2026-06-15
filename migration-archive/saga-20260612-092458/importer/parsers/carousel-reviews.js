/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-reviews. Base: carousel.
 * Source: https://www.saga.co.uk/car-insurance
 * Handles: .testimonial with rotating customer review cards
 * Carousel block: 2 columns per row - col1 = empty (no image), col2 = quote + name
 */
export default function parse(element, { document }) {
  const cards = element.querySelectorAll('.testimonial__card');
  const cells = [];

  cards.forEach((card) => {
    const quotes = card.querySelectorAll('p');
    const name = card.querySelector('.testimonial__name');

    const imageCell = document.createElement('div');

    const textCell = document.createElement('div');
    quotes.forEach((p) => {
      if (!p.querySelector('.testimonial__name')) {
        const quote = document.createElement('p');
        quote.textContent = p.textContent.trim();
        textCell.append(quote);
      }
    });
    if (name) {
      const nameP = document.createElement('p');
      const em = document.createElement('em');
      em.textContent = name.textContent.trim();
      nameP.append(em);
      textCell.append(nameP);
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-reviews', cells });
  element.replaceWith(block);
}
