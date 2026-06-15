/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-services.
 * Base block: cards
 * Source: https://www.nuffieldhealth.com/ (sections #gyms .grid--2 and #hospitals .grid--2)
 * Generated: 2026-06-12
 *
 * Source structure: each `.grid--2` contains `.grid__cell` items. Each cell is one card:
 *   - a wide image at `.image-gallery__hero img`
 *   - a sibling descriptive `<p>` containing inline bold links
 * UE model (card): image (reference) + text (richtext). Container block -> one row per card,
 * two columns per row (image cell, text cell). Field hints precede content per xwalk rules.
 */
export default function parse(element, { document }) {
  const cells = [];

  // Each `.grid__cell` is one card. The selector that targets this element is a `.grid--2`
  // grid; iterate its direct card cells. Fall back to scanning the element itself if it is
  // already a single card cell.
  let cardCells = Array.from(element.querySelectorAll(':scope > .grid__cell'));
  if (cardCells.length === 0) {
    cardCells = Array.from(element.querySelectorAll('.grid__cell'));
  }
  if (cardCells.length === 0 && element.classList.contains('grid__cell')) {
    cardCells = [element];
  }

  cardCells.forEach((cell) => {
    // Image: the wide hero image for this card.
    const img = cell.querySelector('.image-gallery__hero img, .image-gallery img, img');

    // Text: the descriptive paragraph(s) (with inline bold links) that are NOT inside the
    // image gallery wrapper.
    const textParagraphs = Array.from(cell.querySelectorAll(':scope > p'));

    // Build the image cell with field hint.
    const imageCell = document.createElement('div');
    if (img) {
      const imageFrag = document.createDocumentFragment();
      imageFrag.appendChild(document.createComment(' field:image '));
      imageFrag.appendChild(img);
      imageCell.appendChild(imageFrag);
    }

    // Build the text cell with field hint.
    const textCell = document.createElement('div');
    if (textParagraphs.length) {
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(' field:text '));
      textParagraphs.forEach((p) => textFrag.appendChild(p));
      textCell.appendChild(textFrag);
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-services', cells });
  element.replaceWith(block);
}
