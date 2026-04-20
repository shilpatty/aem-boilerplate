/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Saga section breaks and section metadata.
 * Adds <hr> section breaks and Section Metadata blocks based on template sections.
 * Runs in afterTransform only.
 * Selectors from captured DOM of https://www.saga.co.uk/
 */
export default function transform(hookName, element, payload) {
  if (hookName === 'afterTransform') {
    const { document } = payload;
    const template = payload.template;

    if (!template || !template.sections || template.sections.length < 2) return;

    // Process sections in reverse order to preserve DOM positions
    const sections = [...template.sections].reverse();

    sections.forEach((section) => {
      // Find the section element using selector(s)
      let sectionEl = null;
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];

      for (const sel of selectors) {
        sectionEl = element.querySelector(sel);
        if (sectionEl) break;
      }

      if (!sectionEl) return;

      // Add section-metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(sectionMetadata);
      }

      // Add <hr> before section (except first section)
      if (section.id !== 'section-1') {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    });
  }
}
