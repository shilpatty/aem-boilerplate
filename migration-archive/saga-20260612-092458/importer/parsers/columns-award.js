/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-award. Base: columns.
 * Source: https://www.saga.co.uk/car-insurance
 * Handles: .accreditation-callout with award badge image + heading + body text
 * Columns block: 2 columns, col1 = award image, col2 = heading + body
 */
export default function parse(element, { document }) {
  const image = element.querySelector('.accreditation-callout__image');
  const title = element.querySelector('.accreditation-callout__title');
  const body = element.querySelector('.accreditation-callout__body');

  const cells = [];

  const imageCell = document.createElement('div');
  if (image) imageCell.append(image);

  const textCell = document.createElement('div');
  if (title) textCell.append(title);
  if (body) textCell.append(body);

  cells.push([imageCell, textCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-award', cells });
  element.replaceWith(block);
}
