/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-faq.
 * Base block: accordion (container block: accordion-faq + item children).
 * Source: hospitals listing page
 *   - #your-journey .pcof-accordion  (numbered "journey" steps)
 *   - #faqs .accordion               (frequently-asked-question Q&A)
 *   (https://www.nuffieldhealth.com/hospitals?ref=main-nav)
 * Generated: 2026-06-12
 *
 * UE item model (accordion item):
 *   - title (richtext) -> question/step label cell, hint <!-- field:title -->
 *   - text  (richtext) -> answer/panel body cell,   hint <!-- field:text -->
 *
 * Source structure (both instances share the same shape):
 *   <ul class="pcof-accordion|accordion">
 *     <li>
 *       <a class="toggle">
 *         [<img ...> decorative SVG icon — only in .pcof-accordion]
 *         <div class="question">Heading / step label</div>
 *         <div class="more-less-container">…toggle chevron…</div>
 *       </a>
 *       <div class="inner panel">…answer content…</div>
 *     </li>
 *     …
 *   </ul>
 *
 * Each <li> becomes one block row with two cells: [title][text].
 *   - title cell: the `.question` text wrapped in a heading. The decorative SVG
 *     icon and the `.more-less-container` chevron carry no authorable content and
 *     are intentionally excluded.
 *   - text cell: the `.inner.panel` body. The #your-journey panels contain real
 *     <p>/<a> elements; the #faqs panels contain loose text with <br> separators
 *     and inline <a> links. To preserve both variants we move the panel's full
 *     inner content (including loose text nodes) into the cell.
 */
export default function parse(element, { document }) {
  const items = Array.from(element.querySelectorAll(':scope > li'));

  const cells = [];

  items.forEach((li) => {
    // --- Title cell: the question / step label. ---
    const question = li.querySelector('.toggle .question, .question, .toggle');
    const titleCell = document.createElement('div');
    if (question) {
      // Use only the question label text; drop decorative icon / chevron markup.
      const labelText = question.textContent.replace(/ /g, ' ').trim();
      if (labelText) {
        const titleFrag = document.createDocumentFragment();
        titleFrag.appendChild(document.createComment(' field:title '));
        const heading = document.createElement('h3');
        heading.textContent = labelText;
        titleFrag.appendChild(heading);
        titleCell.appendChild(titleFrag);
      }
    }

    // --- Text cell: the expandable answer panel. ---
    const panel = li.querySelector('.inner.panel, .panel, .inner');
    const textCell = document.createElement('div');
    if (panel) {
      // Capture the full panel body: structured children (<p>, <ul>, <a>) as well
      // as loose text nodes / <br> separators used by the #faqs variant.
      const textFrag = document.createDocumentFragment();
      const wrapper = document.createElement('div');
      // Move every child node (elements AND text) to preserve all answer content.
      Array.from(panel.childNodes).forEach((node) => wrapper.appendChild(node));

      if (wrapper.textContent.replace(/ /g, ' ').trim()
        || wrapper.querySelector('a, img, ul, ol')) {
        textFrag.appendChild(document.createComment(' field:text '));
        textFrag.appendChild(wrapper);
        textCell.appendChild(textFrag);
      }
    }

    cells.push([titleCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
