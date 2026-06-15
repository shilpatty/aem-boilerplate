/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-articles.
 * Base block: cards
 * Source: https://www.nuffieldhealth.com/hospitals (#articles .promo-editorial-scroller)
 * Generated: 2026-06-12
 *
 * Source structure: the targeted `.promo-editorial-scroller` wraps a
 * `.promo-editorial-wrapper` holding a list of `.promo-editorial` cards
 * (`.promo-editorial--has-media`). Each card contains a title link
 * `a.promo-editorial__link[href]` whose `h3.promo-editorial__heading > span`
 * holds the article title. An optional article image lives on the card as a
 * `<picture>`/`<img>` (lazy-loaded; may be absent in cleaned source).
 *
 * UE model (cards-articles-item): image (reference) + imageAlt (text) + text
 * (richtext). Container block -> one row per card, three columns per row
 * (image cell, imageAlt cell, text cell). Field hints precede content per xwalk
 * rules. The title is preserved as a heading link inside the richtext cell.
 */
export default function parse(element, { document }) {
  const cells = [];

  // Each `.promo-editorial` is one article card. Prefer the cards inside the
  // wrapper; fall back to a broader scan, then to the element itself.
  let cardEls = Array.from(element.querySelectorAll('.promo-editorial-wrapper > .promo-editorial'));
  if (cardEls.length === 0) {
    cardEls = Array.from(element.querySelectorAll('.promo-editorial'));
  }
  if (cardEls.length === 0 && element.classList.contains('promo-editorial')) {
    cardEls = [element];
  }

  cardEls.forEach((card) => {
    // Article image (if present). Picture is preferred; otherwise a plain img.
    const img = card.querySelector('picture img, img');

    // Title link. The whole card links to the article; the title text lives in
    // the heading span. Build a heading containing the link so the richtext
    // preserves both the title and its destination.
    const link = card.querySelector('a.promo-editorial__link, a[href]');
    const headingEl = card.querySelector('.promo-editorial__heading, h2, h3, h4');
    const titleSpan = headingEl ? headingEl.querySelector('span') : null;
    const titleText = (titleSpan ? titleSpan.textContent : (headingEl ? headingEl.textContent : ''))
      .replace(/\s+/g, ' ')
      .trim();

    // Image cell with field hint.
    const imageCell = document.createElement('div');
    {
      const imageFrag = document.createDocumentFragment();
      imageFrag.appendChild(document.createComment(' field:image '));
      if (img) imageFrag.appendChild(img);
      imageCell.appendChild(imageFrag);
    }

    // Image alt cell with field hint.
    const imageAltCell = document.createElement('div');
    {
      const altFrag = document.createDocumentFragment();
      altFrag.appendChild(document.createComment(' field:imageAlt '));
      const altText = (img && img.getAttribute('alt')) ? img.getAttribute('alt').trim() : titleText;
      if (altText) altFrag.appendChild(document.createTextNode(altText));
      imageAltCell.appendChild(altFrag);
    }

    // Text (richtext) cell with field hint. Preserve the title as a heading
    // link when a destination exists, otherwise as a plain heading.
    const textCell = document.createElement('div');
    {
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(' field:text '));
      if (titleText) {
        const heading = document.createElement('h3');
        const href = link ? link.getAttribute('href') : null;
        if (href) {
          const a = document.createElement('a');
          a.setAttribute('href', href);
          a.textContent = titleText;
          heading.appendChild(a);
        } else {
          heading.textContent = titleText;
        }
        textFrag.appendChild(heading);
      }
      textCell.appendChild(textFrag);
    }

    cells.push([imageCell, imageAltCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-articles', cells });
  element.replaceWith(block);
}
