/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-panels. Base: cards.
 * Source: https://www.saga.co.uk/car-insurance
 * Handles: .content-panel.content-panel--alt product feature panels
 * Cards block: 2 columns per row - col1 = image, col2 = heading + description + CTA
 */
export default function parse(element, { document }) {
  const parent = element.parentElement || element;
  const panels = parent.querySelectorAll('.content-panel.content-panel--alt');
  if (panels.length === 0) {
    // Fallback: treat element itself as a single panel
    const image = element.querySelector('.content-panel__image, img');
    const title = element.querySelector('.content-panel__title, h3');
    const body = element.querySelector('.content-panel__body');
    const cta = element.querySelector('a.button');
    const imageCell = document.createElement('div');
    if (image) imageCell.append(image);
    const textCell = document.createElement('div');
    if (title) textCell.append(title);
    if (body) textCell.append(body);
    if (cta) textCell.append(cta);
    const block = WebImporter.Blocks.createBlock(document, { name: 'cards-panels', cells: [[imageCell, textCell]] });
    element.replaceWith(block);
    return;
  }
  const cells = [];

  panels.forEach((panel) => {
    const image = panel.querySelector('.content-panel__image');
    const title = panel.querySelector('.content-panel__title');
    const body = panel.querySelector('.content-panel__body');
    const cta = panel.querySelector('a.button');

    const imageCell = document.createElement('div');
    if (image) imageCell.append(image);

    const textCell = document.createElement('div');
    if (title) textCell.append(title);
    if (body) textCell.append(body);
    if (cta) textCell.append(cta);

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-panels', cells });
  element.replaceWith(block);

  // Remove remaining duplicate panels (since we gathered from parent)
  panels.forEach((panel) => {
    if (panel !== element && panel.parentElement) {
      panel.remove();
    }
  });
}
