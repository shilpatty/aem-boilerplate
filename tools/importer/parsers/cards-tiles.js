/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-tiles.
 * Base block: cards (container block: cards-tiles + cards-tiles-item children).
 * Sources:
 *   - homepage:  #more-from-nuffield .grid--4  (linked image tiles, no body text)
 *   - hospitals: #how-can-we-help-you .grid--4 (image + body text + CTA link tiles)
 * Generated: 2026-06-12
 *
 * UE model (cards-tiles-item):
 *   - image    (reference)  -> image cell, hint <!-- field:image -->
 *   - imageAlt (collapsed)  -> folded into <img alt="">, no hint, no cell
 *   - text     (richtext)   -> text cell, hint <!-- field:text -->
 *
 * Each .grid__cell tile becomes one block row with two cells: [image][text].
 * The source markup nests grid cells as siblings inside one another, so
 * querySelectorAll('.grid__cell') reliably collects every tile regardless of nesting.
 */
export default function parse(element, { document }) {
  // Collect every tile. Use the scoped image-gallery as the anchor for a tile so
  // we never double-count due to the malformed/nested .grid__cell structure.
  const galleries = Array.from(element.querySelectorAll('.image-gallery'));

  const cells = [];

  galleries.forEach((gallery) => {
    // --- Image cell ---
    // Image lives in .image-gallery__hero, optionally wrapped in a linking anchor.
    const hero = gallery.querySelector('.image-gallery__hero') || gallery;
    const img = hero.querySelector('img');
    const imageLink = img ? img.closest('a') : null;

    const imageCell = [];
    imageCell.push(document.createComment(' field:image '));
    if (img) {
      // Preserve a linking image tile by keeping the wrapping anchor; otherwise
      // place the bare image.
      imageCell.push(imageLink || img);
    }

    // --- Text cell ---
    // Body text and CTA live as <p> siblings of .image-gallery within the tile
    // container. Walk forward from the gallery's parent to gather them.
    const tileRoot = gallery.parentElement || gallery;
    const textNodes = Array.from(tileRoot.children).filter(
      (child) => child !== gallery
        && !child.classList.contains('image-gallery')
        && (child.tagName === 'P'
          || child.tagName === 'H2'
          || child.tagName === 'H3'
          || child.tagName === 'H4'
          || /heading|title/i.test(child.className || '')),
    );

    const textCell = [];
    if (textNodes.length) {
      textCell.push(document.createComment(' field:text '));
      textCell.push(...textNodes);
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-tiles', cells });
  element.replaceWith(block);
}
