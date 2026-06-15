/* eslint-disable */
/* global WebImporter */

/**
 * Parser for accordion-faq. Base: accordion.
 * Source: https://www.saga.co.uk/car-insurance
 * Handles: .accordion.accordion--stacked with expandable Q&A items
 * Accordion block: 2 columns per row - col1 = question title, col2 = answer content
 */
export default function parse(element, { document }) {
  const items = element.querySelectorAll('.accordion__item');
  const cells = [];

  items.forEach((item) => {
    const title = item.querySelector('.accordion__title');
    const description = item.querySelector('.accordion__description');

    const titleCell = document.createElement('div');
    if (title) titleCell.textContent = title.textContent.trim();

    const contentCell = document.createElement('div');
    if (description) {
      // Clone all child elements to preserve lists and links
      Array.from(description.children).forEach((child) => {
        contentCell.append(child.cloneNode(true));
      });
    }

    cells.push([titleCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
