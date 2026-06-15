/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-cta. Base: columns.
 * Source: https://www.saga.co.uk/car-insurance
 * Handles: .content-double with two side-by-side CTA cards
 * Columns block: 2 columns per row, each with heading + description + buttons
 */
export default function parse(element, { document }) {
  const grids = element.querySelectorAll('.content-double__grid');
  const cells = [];

  if (grids.length >= 2) {
    const row = [];
    grids.forEach((grid) => {
      const cell = document.createElement('div');
      const title = grid.querySelector('.content-double__title, h3');
      const desc = grid.querySelector('.content-double__description');
      const ctas = Array.from(grid.querySelectorAll('.content-double__cta a.button'));

      if (title) cell.append(title);
      if (desc) cell.append(desc);
      ctas.forEach((cta) => cell.append(cta));
      row.push(cell);
    });
    cells.push(row);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-cta', cells });
  element.replaceWith(block);
}
