/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Nuffield Health section breaks + section metadata.
 *
 * Runs in afterTransform only. Reads the matching template's section list from
 * payload.template.sections and, for each section (processed in reverse order so
 * inserted nodes never shift the position of sections not yet processed):
 *   - inserts an <hr> section break before the section element (every section
 *     except the first), and
 *   - inserts a "Section Metadata" block after the section element when the
 *     section defines a `style`.
 *
 * Section selectors come from tools/importer/page-templates.json, each verified
 * against the captured DOM:
 *   - homepage:          migration-work/cleaned.html
 *   - hospitals-listing: migration-work-hospitals/cleaned.html
 *
 * Expected per template (template with 2+ sections):
 *   - homepage:          5 sections -> 4 <hr>, 0 Section Metadata (all style:null)
 *   - hospitals-listing: 9 sections -> 8 <hr>, 7 Section Metadata (styled sections)
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const template = payload && payload.template;
    const sections = template && template.sections;
    if (!sections || sections.length < 2) {
      return;
    }

    const doc = element.ownerDocument;

    // Process sections in reverse order so node insertions for later sections
    // do not shift the DOM position of earlier (not-yet-processed) sections.
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      if (!section || !section.selector) {
        continue;
      }

      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) {
        continue;
      }

      // Section Metadata block (only when the section has a style).
      if (section.style) {
        const metaBlock = WebImporter.Blocks.createBlock(doc, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(metaBlock);
      }

      // Section break: <hr> before every section except the first.
      if (i > 0) {
        const hr = doc.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
