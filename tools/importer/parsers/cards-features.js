/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-features.
 * Base block: cards
 * Source: https://www.nuffieldhealth.com/ (#more-than-just-a-gym .grid--3)
 *         https://www.nuffieldhealth.com/hospitals (#why-nuffield .grid--2)
 * Generated: 2026-06-12
 *
 * Source structure: the targeted element is a `.grid` (grid--2 / grid--3) containing
 * `.grid__cell` items. Each `.grid__cell` is one feature card with:
 *   - an icon/image at `.image-gallery__hero img`
 *   - a body with a bold title, a short description, and (homepage only) an optional link.
 *     Homepage cards wrap the body in `.service-card` with a `.service-card__link-wrapper a`.
 *     Hospital cards use a plain `<p>` containing `<b>title</b><br>description` and no link.
 *
 * UE model (card item): image (reference) + text (richtext). Container block -> one row per
 * card, two columns per row (image cell, text cell). Field hints precede content per xwalk rules.
 */
export default function parse(element, { document }) {
  const cells = [];

  // Each `.grid__cell` is one card. The selector targets a `.grid` element; iterate its direct
  // card cells. Fall back to a broader scan, then to the element itself if it is a single cell.
  let cardCells = Array.from(element.querySelectorAll(':scope > .grid__cell'));
  if (cardCells.length === 0) {
    cardCells = Array.from(element.querySelectorAll('.grid__cell'));
  }
  if (cardCells.length === 0 && element.classList.contains('grid__cell')) {
    cardCells = [element];
  }

  cardCells.forEach((cell) => {
    // Image: the icon/hero image for this card.
    const img = cell.querySelector('.image-gallery__hero img, .image-gallery img, img');

    // Body content. Collect the descriptive node(s) that are NOT inside the image gallery
    // wrapper. Homepage cards keep the title/description inside `.service-card__content`;
    // hospital cards use a direct `<p>`.
    const bodyNodes = [];
    const serviceCardContent = cell.querySelector('.service-card__content');
    if (serviceCardContent) {
      // Title + description block(s) followed by any link wrapper(s).
      Array.from(serviceCardContent.children).forEach((child) => bodyNodes.push(child));
    } else {
      Array.from(cell.querySelectorAll(':scope > p')).forEach((p) => bodyNodes.push(p));
    }

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
    if (bodyNodes.length) {
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(' field:text '));
      bodyNodes.forEach((node) => textFrag.appendChild(node));
      textCell.appendChild(textFrag);
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-features', cells });
  element.replaceWith(block);
}
