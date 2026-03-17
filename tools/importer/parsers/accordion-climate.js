/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-climate. Base: accordion.
 * Source: https://matthey.com/sustainability/climate
 * Source selector: .jmaccrdn
 * Block library: N rows, 2 columns each: [title | body content]
 * Generated: 2026-03-17
 */
export default function parse(element, { document }) {
  // Find all accordion sections
  const sections = element.querySelectorAll('.jmaccrdn__section');

  // Build cells: each row has 2 columns [title | body]
  const cells = [];

  sections.forEach((section) => {
    // Extract title from .jmaccrdn__title-text
    const titleSpan = section.querySelector('.jmaccrdn__title-text');
    const title = titleSpan ? titleSpan.textContent.trim() : '';

    // Extract body content from .jmaccrdn__body
    const body = section.querySelector('.jmaccrdn__body');

    // Build title cell
    const titleCell = document.createElement('p');
    titleCell.textContent = title;

    // Build body cell - collect all paragraphs from the answer section
    const bodyCell = [];
    if (body) {
      const paragraphs = body.querySelectorAll('.jmaccrdn__answer-sec p, p');
      paragraphs.forEach((p) => {
        if (p.textContent.trim()) {
          bodyCell.push(p);
        }
      });
    }

    if (title) {
      cells.push([titleCell, bodyCell.length > 0 ? bodyCell : '']);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-climate', cells });
  element.replaceWith(block);
}
