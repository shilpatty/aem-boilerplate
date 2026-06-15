/* eslint-disable */
/* global WebImporter */

/**
 * Parser for table-compare. Base: table.
 * Source: https://www.saga.co.uk/car-insurance
 * Handles: .table.table--comparison with 3-column comparison (Standard/Select/Plus)
 * Table block: multiple columns, row 1 = headers, subsequent rows = feature data
 */
export default function parse(element, { document }) {
  const table = element.querySelector('table.table--comparison');
  if (!table) return;

  const cells = [];

  // Header row
  const headerRow = table.querySelector('thead tr');
  if (headerRow) {
    const headerCells = Array.from(headerRow.querySelectorAll('th')).map((th) => {
      const badge = th.querySelector('.table__badge');
      const cellContent = document.createElement('div');
      cellContent.textContent = th.textContent.trim();
      if (badge) {
        const em = document.createElement('em');
        em.textContent = badge.textContent.trim();
        cellContent.textContent = th.childNodes[0]?.textContent?.trim() || th.textContent.replace(badge.textContent, '').trim();
        cellContent.append(document.createElement('br'), em);
      }
      return cellContent;
    });
    cells.push(headerCells);
  }

  // Data rows
  const bodyRows = table.querySelectorAll('tbody tr');
  bodyRows.forEach((tr) => {
    const rowCells = Array.from(tr.querySelectorAll('td')).map((td) => {
      const subTitle = td.querySelector('.table__subheader-title');
      const subDesc = td.querySelector('.table__subheader-description');
      const icon = td.querySelector('.table__cmp-icon img');
      const text = td.querySelector('.table__cmp-text');

      if (subTitle) {
        // Feature name cell with title and description
        const cell = document.createElement('div');
        const strong = document.createElement('strong');
        strong.textContent = subTitle.textContent.trim();
        cell.append(strong);
        if (subDesc) {
          const p = document.createElement('p');
          p.textContent = subDesc.textContent.trim();
          cell.append(p);
        }
        return cell;
      } else if (icon) {
        // Tick or dash icon - extract title for text representation
        const title = icon.querySelector('title') || icon.closest('svg')?.querySelector('title');
        const altText = title ? title.textContent.trim() : (icon.alt || '');
        const isTick = altText.toLowerCase().includes('tick') || icon.closest('.table__cmp-icon--tick') !== null;
        return isTick ? '✓' : '—';
      } else if (text) {
        return text.textContent.trim();
      }
      return '';
    });
    if (rowCells.length > 0) {
      cells.push(rowCells);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'table-compare', cells });
  element.replaceWith(block);
}
