import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      const hasPicture = div.querySelector('picture');
      const hasImg = div.children.length === 1 && div.querySelector('img');
      if (hasPicture || hasImg) div.className = 'cards-articles-card-image';
      else div.className = 'cards-articles-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';

  // Wrap in carousel container
  const carousel = document.createElement('div');
  carousel.className = 'cards-articles-carousel';
  carousel.append(ul);

  // Navigation
  const nav = document.createElement('div');
  nav.className = 'cards-articles-nav';

  const counter = document.createElement('span');
  counter.className = 'cards-articles-counter';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'cards-articles-prev';
  prevBtn.setAttribute('aria-label', 'Previous');
  prevBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'cards-articles-next';
  nextBtn.setAttribute('aria-label', 'Next');
  nextBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  nav.append(prevBtn, counter, nextBtn);

  const items = ul.querySelectorAll('li');
  const totalItems = items.length;
  let visibleCount = 4;
  let currentPage = 0;

  function updateCarousel() {
    if (window.innerWidth < 600) visibleCount = 1;
    else if (window.innerWidth < 900) visibleCount = 2;
    else visibleCount = 4;

    const totalPages = Math.ceil(totalItems / visibleCount);
    if (currentPage >= totalPages) currentPage = totalPages - 1;
    const itemWidth = items[0]
      ? items[0].getBoundingClientRect().width + 16
      : 300;
    const scrollAmount = currentPage * visibleCount * itemWidth;
    ul.style.transform = `translateX(-${scrollAmount}px)`;
    counter.textContent = `${currentPage + 1} / ${totalPages}`;
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage >= totalPages - 1;
  }

  prevBtn.addEventListener('click', () => { currentPage -= 1; updateCarousel(); });
  nextBtn.addEventListener('click', () => { currentPage += 1; updateCarousel(); });
  window.addEventListener('resize', updateCarousel);

  block.append(nav, carousel);
  requestAnimationFrame(updateCarousel);
}
