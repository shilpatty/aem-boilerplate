import { createOptimizedPicture } from '../../scripts/aem.js';

const CARD_COLORS = ['champagne', 'aqua', 'blush'];

export default function decorate(block) {
  const ul = document.createElement('ul');
  const rows = [...block.children];
  const colorOffset = rows.length < 3 ? 1 : 0;
  rows.forEach((row, i) => {
    const li = document.createElement('li');
    li.classList.add(`cards-campaign-${CARD_COLORS[(i + colorOffset) % CARD_COLORS.length]}`);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      const hasPicture = div.querySelector('picture');
      const hasImg = div.children.length === 1 && div.querySelector('img');
      if (hasPicture || hasImg) div.className = 'cards-campaign-card-image';
      else div.className = 'cards-campaign-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}
