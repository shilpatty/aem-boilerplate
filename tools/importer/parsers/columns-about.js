/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-about.
 * Base block: columns
 * Source: https://www.nuffieldhealth.com/hospitals (#ways-to-pay .grid--2)
 * Generated: 2026-06-12
 *
 * Source structure: the targeted selector `#ways-to-pay .grid--2` matches THREE
 * `.grid` (grid--2) elements, one per "ways to pay" row (Pay for yourself, Private
 * medical insurance, NHS patients). The parser is invoked once per matched `.grid--2`.
 *
 * Each `.grid--2` has two `.grid__cell` children:
 *   - image cell:  `.image-gallery .image-gallery__hero img`
 *     (the third row's image cell also carries a trailing empty `<p>` which is ignored)
 *   - text cell:   `h2.cms-headings-h2` heading, a body `<p>` (with an optional inline
 *     link), and a `<p>` wrapping the `.button` CTA.
 *
 * Target: this is a `columns` block (image left / text right). Per xwalk field-hinting
 * rules, columns blocks use ONLY default content in cells and do NOT carry `field:`
 * hints. Each row -> one block row with two columns (image cell, content cell).
 */
export default function parse(element, { document }) {
  // Locate the two grid cells for this row. Fall back to a broad scan if direct
  // children are not present.
  let gridCells = Array.from(element.querySelectorAll(':scope > .grid__cell'));
  if (gridCells.length === 0) {
    gridCells = Array.from(element.querySelectorAll('.grid__cell'));
  }

  // Identify the image cell (the one containing the image gallery / picture / img)
  // and the content cell (the remaining one).
  let imageCell = null;
  let contentCell = null;
  gridCells.forEach((cell) => {
    const hasImage = cell.querySelector('.image-gallery, picture, img');
    if (hasImage && !imageCell) {
      imageCell = cell;
    } else if (!contentCell) {
      contentCell = cell;
    }
  });
  // If detection was ambiguous (e.g. only one cell, or image not flagged), use order.
  if (!imageCell && gridCells.length) [imageCell] = gridCells;
  if (!contentCell && gridCells.length > 1) {
    contentCell = gridCells.find((c) => c !== imageCell) || null;
  }

  // Build the image column: prefer the gallery hero image, then any picture/img.
  const imageColumn = document.createElement('div');
  if (imageCell) {
    const img = imageCell.querySelector('.image-gallery__hero img, .image-gallery img, picture, img');
    if (img) imageColumn.appendChild(img);
  }

  // Build the content column: heading + body paragraph(s) + CTA, in source order,
  // skipping empty paragraphs (e.g. `<p><br></p>`).
  const contentColumn = document.createElement('div');
  if (contentCell) {
    Array.from(contentCell.children).forEach((child) => {
      const text = child.textContent.replace(/ /g, ' ').trim();
      const hasLink = child.querySelector('a');
      const hasImage = child.querySelector('picture, img');
      if (text || hasLink || hasImage) {
        contentColumn.appendChild(child);
      }
    });
  }

  const cells = [[imageColumn, contentColumn]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-about', cells });
  element.replaceWith(block);
}
