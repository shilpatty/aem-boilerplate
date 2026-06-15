/* eslint-disable */
/* global WebImporter */
/**
 * Parser for form.
 * Base block: form (forms plugin - ALWAYS base name "form", never a variant).
 * Source: https://www.nuffieldhealth.com/hospitals (form.form)
 * Generated: 2026-06-12
 *
 * The EDS form block (blocks/form/form.js) is DEFINITION-DRIVEN. Its `decorate`
 * function does NOT consume inline <input>/<select> fields. Instead it looks for
 * either:
 *   1. an <a href> pointing at a form definition resource (sheet/JSON), or
 *   2. an inline JSON definition in a <pre><code> block.
 * It then fetches/parses that definition and renders the form (createForm /
 * createFormForAuthoring). See blocks/form/form.js `decorate()` and `fetchForm()`.
 *
 * Therefore the imported `form` block must contain a single cell that is a
 * markdown link to the generated form definition JSON file, NOT a recreation of
 * the source form's fields. The definition JSON itself is produced separately by
 * the forms plugin's form-importer.js (excat-form-migration skill) and saved
 * alongside the page markdown. The source `<form class="form">` carries no name
 * attribute, so the importer's default filename is `form.json`; that is the file
 * this link references.
 *
 * The block name is the exact variant name 'form' (forms plugin rule: never a
 * variant suffix). The single-column, single-content-row layout matches the
 * forms plugin's required form-block table shape:
 *   Row 1: block name "Form"
 *   Row 2: [form.json](form.json)
 */
export default function parse(element, { document }) {
  // Resolve the form definition file name. The forms plugin derives this from the
  // source form's `name` (sanitized); when absent it defaults to `form`.
  const rawName = (element.getAttribute('name') || element.id || 'form').trim();
  const sanitized = rawName
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'form';
  const jsonFile = `${sanitized}.json`;

  // The form block consumes a link to the form definition resource.
  const link = document.createElement('a');
  link.href = jsonFile;
  link.textContent = jsonFile;

  const cells = [[link]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'form', cells });
  element.replaceWith(block);
}
