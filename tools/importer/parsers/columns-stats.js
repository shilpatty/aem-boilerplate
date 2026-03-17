/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-stats. Base: columns.
 * Source: https://matthey.com/sustainability/climate
 * Source selector: .panels-hero-panels
 * Block library: 1 row with N columns, each cell contains text content
 * Generated: 2026-03-17
 */
export default function parse(element, { document }) {
  // Find all stat panels inside the container
  const panels = element.querySelectorAll('.hero-panels-panel');

  // Build a single row with one cell per panel (3 columns)
  const row = [];

  panels.forEach((panel) => {
    const cellContent = [];

    // Extract panel title (e.g., "2030 target") - may be empty for first panel
    const title = panel.querySelector('.text-panel-title');
    if (title && title.textContent.trim()) {
      const h = document.createElement('p');
      h.textContent = title.textContent.trim();
      h.style.fontWeight = 'bold';
      cellContent.push(h);
    }

    // Extract panel body content (paragraphs with stats text)
    const body = panel.querySelector('.text-panel-body');
    if (body) {
      const paragraphs = body.querySelectorAll('p');
      paragraphs.forEach((p) => {
        if (p.textContent.trim()) {
          cellContent.push(p);
        }
      });
    }

    if (cellContent.length > 0) {
      row.push(cellContent);
    }
  });

  const cells = [];
  if (row.length > 0) {
    cells.push(row);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-stats', cells });
  element.replaceWith(block);
}
