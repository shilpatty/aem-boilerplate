/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-locations.
 * Base block: cards (container block: cards-locations + card children).
 * Source: hospitals listing page -> #our-locations .location-finder
 *         (https://www.nuffieldhealth.com/hospitals?ref=main-nav)
 * Generated: 2026-06-12
 *
 * UE model (card):
 *   - image    (reference) -> image cell, hint <!-- field:image -->
 *   - text     (richtext)  -> text cell,  hint <!-- field:text -->
 *
 * The source is a JS-driven location finder. The authorable content is the
 * repeating list of hospital location cards (.location-finder__card). Each card
 * contains:
 *   - .location-finder__card__heading  -> <a href="/hospitals/..."> with an
 *                                          <h3 class="js-location-name"> location name
 *   - .location-finder__address        -> <p> with the postal address
 *   - .location-finder__number         -> <span> with the phone number
 *
 * Each card becomes one block row with two cells: [image][text].
 * There are no images in this variant, so the image cell is left empty (no hint).
 * The text cell carries the heading link (name + href to the hospital page),
 * the address, and the phone number.
 *
 * Note: the in-card "View details" action (.location-finder__card-action) has an
 * empty href (populated client-side by JS), so it carries no authorable URL and
 * is intentionally excluded. The heading anchor holds the real hospital page link.
 */
export default function parse(element, { document }) {
  const cards = Array.from(element.querySelectorAll('.location-finder__card'));

  const cells = [];

  cards.forEach((card) => {
    // --- Image cell (always empty for this variant; no field hint on empty cell) ---
    const imageCell = [];

    // --- Text cell: location link + address + phone ---
    const textCell = [];

    // Location name + link to the hospital page.
    const headingLink = card.querySelector('.location-finder__card__heading, a[class*="heading"]');
    const heading = card.querySelector('.js-location-name, .location-finder__card__heading h3, h3');

    // Postal address paragraph.
    const address = card.querySelector('.location-finder__address');

    // Phone number.
    const phone = card.querySelector('.location-finder__number, [class*="__number"]');

    const textContent = [];

    if (headingLink) {
      // Rebuild a clean anchor that wraps the location name as its visible text,
      // dropping decorative icon markup inside the source heading link.
      const a = document.createElement('a');
      a.setAttribute('href', headingLink.getAttribute('href') || '');
      const nameText = (heading ? heading.textContent : headingLink.textContent || '')
        .replace(/ /g, ' ')
        .trim();
      a.textContent = nameText;

      const h3 = document.createElement('h3');
      h3.appendChild(a);
      textContent.push(h3);
    } else if (heading) {
      const nameText = heading.textContent.replace(/ /g, ' ').trim();
      const h3 = document.createElement('h3');
      h3.textContent = nameText;
      textContent.push(h3);
    }

    if (address) textContent.push(address);

    if (phone) {
      const phoneText = phone.textContent.replace(/ /g, ' ').trim();
      if (phoneText) {
        const p = document.createElement('p');
        p.textContent = phoneText;
        textContent.push(p);
      }
    }

    if (textContent.length) {
      textCell.push(document.createComment(' field:text '));
      textCell.push(...textContent);
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-locations', cells });
  element.replaceWith(block);
}
