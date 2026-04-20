import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // Restructure link columns into a grid
  const allStrongs = footer.querySelectorAll('p strong');
  if (allStrongs.length >= 3) {
    const firstStrongP = allStrongs[0].closest('p');
    const contentDiv = firstStrongP.parentElement;
    const children = [...contentDiv.children];
    const columns = document.createElement('div');
    columns.className = 'footer-columns';
    let currentCol = null;
    children.forEach((child) => {
      if (child.tagName === 'P' && child.querySelector('strong')) {
        currentCol = document.createElement('div');
        currentCol.className = 'footer-column';
        columns.append(currentCol);
      }
      if (currentCol) {
        currentCol.append(child);
      }
    });
    contentDiv.append(columns);
  }

  block.append(footer);
}
