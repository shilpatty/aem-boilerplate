/* eslint-disable */
/* global WebImporter */

/**
 * Parser for form. Base: form.
 * Source: https://www.saga.co.uk/
 * Handles: .form-subscribe newsletter signup form
 * Form block: 2 rows - row 1 = form heading + description, row 2 = form link/embed
 */
export default function parse(element, { document }) {
  const title = element.querySelector('.form-subscribe__title, h3, legend');
  const description = element.querySelector('.form-subscribe__content')?.previousElementSibling;

  // Build content cell with heading and description
  const contentCell = document.createElement('div');
  if (title) {
    const heading = document.createElement('h3');
    heading.textContent = title.textContent.trim();
    contentCell.append(heading);
  }

  // Get the paragraph description
  const descP = element.querySelector('fieldset > .container--sm > p');
  if (descP) {
    const p = document.createElement('p');
    p.textContent = descP.textContent.trim();
    contentCell.append(p);
  }

  const cells = [[contentCell]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'form', cells });
  element.replaceWith(block);
}
