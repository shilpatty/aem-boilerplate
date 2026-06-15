/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-banner.
 * Base block: hero
 * Source: https://www.nuffieldhealth.com/ and https://www.nuffieldhealth.com/hospitals
 *         (section `.hero-location-finder` on both homepage and hospitals-listing templates)
 * Generated: 2026-06-12
 *
 * Source structure (identical on both pages):
 *   .hero-location-finder
 *     > (<style> with `.hero-location-finder__inner { background-image: url(...) }`  -- live page)
 *     > .hero-location-finder__inner
 *         > img                         <- background image (cleaned import HTML; no alt attribute)
 *         > .layout-container ... .hero-location-finder__copy
 *             > h1.hero-location-finder__title   <- heading
 *             > .hero-location-finder__desc       <- description paragraphs + CTA links
 *
 * Note: the import source (cleaned.html) materialises the background as a real <img>, while the
 * live page applies it as a CSS `background-image` in an inline <style> block. The parser handles
 * both: it prefers a real <img>/<picture>, otherwise it reconstructs one from the background-image URL.
 *
 * UE model (hero-banner): image (reference, with collapsed imageAlt) + text (richtext).
 * Simple block -> single column, one row per field:
 *   Row 1: field:image  -> background <img>
 *   Row 2: field:text   -> heading + description paragraphs/links (richtext)
 * Field hints precede content per xwalk hinting rules. imageAlt is collapsed into the
 * <img> alt attribute, so it gets no separate field hint.
 */
export default function parse(element, { document }) {
  const cells = [];

  // Background image. The cleaned import HTML materialises it as a real <img>; prefer that.
  let img = element.querySelector(
    '.hero-location-finder__inner > img, .hero-location-finder__inner img, picture img, picture, img',
  );

  // Fallback: the live page applies the background via a CSS `background-image` declared in an
  // inline <style> block (or inline style attribute). Reconstruct an <img> from that URL so the
  // image field is populated in either source variant.
  if (!img) {
    const inner = element.querySelector('.hero-location-finder__inner');
    let bgUrl = '';
    if (inner && inner.style && inner.style.backgroundImage) {
      const m = inner.style.backgroundImage.match(/url\((['"]?)(.*?)\1\)/);
      if (m) bgUrl = m[2];
    }
    if (!bgUrl) {
      const styleEl = element.querySelector('style');
      if (styleEl) {
        const m = styleEl.textContent.match(/background-image:\s*url\((['"]?)(.*?)\1\)/);
        if (m) bgUrl = m[2];
      }
    }
    if (bgUrl) {
      img = document.createElement('img');
      img.setAttribute('src', bgUrl);
    }
  }

  // Heading: the hero title.
  const heading = element.querySelector(
    '.hero-location-finder__title, h1, h2',
  );

  // Description: the copy block holding paragraphs and CTA links. Prefer the dedicated
  // description wrapper; fall back to direct paragraphs within the copy block.
  const desc = element.querySelector('.hero-location-finder__desc');
  const descParagraphs = desc
    ? Array.from(desc.children)
    : Array.from(element.querySelectorAll('.hero-location-finder__copy > p, :scope p'));

  // Row 1: image cell with field hint (imageAlt collapses into the img alt attribute).
  const imageCell = document.createElement('div');
  if (img) {
    const imageFrag = document.createDocumentFragment();
    imageFrag.appendChild(document.createComment(' field:image '));
    imageFrag.appendChild(img);
    imageCell.appendChild(imageFrag);
  }
  cells.push([imageCell]);

  // Row 2: text cell (richtext) with field hint: heading followed by description content.
  const textCell = document.createElement('div');
  const textFrag = document.createDocumentFragment();
  textFrag.appendChild(document.createComment(' field:text '));
  if (heading) textFrag.appendChild(heading);
  descParagraphs.forEach((node) => textFrag.appendChild(node));
  textCell.appendChild(textFrag);
  cells.push([textCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
