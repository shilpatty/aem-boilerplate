export default function decorate(block) {
  const rows = [...block.children];
  // Row 1: breadcrumb links (optional)
  // Row 2: image
  // Row 3: title

  if (rows.length >= 2) {
    const imageRow = rows[0];
    const titleRow = rows[1];

    // Build hero structure
    const hero = document.createElement('div');
    hero.className = 'hero-product-banner';

    const img = imageRow.querySelector('img');
    if (img) {
      hero.appendChild(img);
    }

    const titleDiv = document.createElement('div');
    titleDiv.className = 'hero-product-title';
    const heading = titleRow.querySelector('h1, h2, h3');
    if (heading) {
      heading.textContent = heading.textContent.toUpperCase();
      titleDiv.appendChild(heading);
    }
    hero.appendChild(titleDiv);

    block.textContent = '';
    block.appendChild(hero);
  }
}
