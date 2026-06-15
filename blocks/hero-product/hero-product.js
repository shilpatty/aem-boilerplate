export default function decorate(block) {
  const rows = [...block.children];

  // Row 0: background image
  // Row 1: heading + CTA buttons
  // Row 2: award logos (optional)
  const banner = document.createElement('div');
  banner.className = 'hero-product-banner';

  if (rows.length >= 1) {
    const img = rows[0].querySelector('img');
    if (img) {
      img.classList.add('hero-product-bg');
      banner.appendChild(img);
    }
  }

  const overlay = document.createElement('div');
  overlay.className = 'hero-product-overlay';

  if (rows.length >= 2) {
    const content = document.createElement('div');
    content.className = 'hero-product-content';

    const heading = rows[1].querySelector('h1, h2');
    if (heading) {
      heading.className = 'hero-product-heading';
      content.appendChild(heading);
    }

    const links = rows[1].querySelectorAll('a');
    if (links.length > 0) {
      const ctas = document.createElement('div');
      ctas.className = 'hero-product-ctas';
      links.forEach((link, i) => {
        link.classList.add(i === 0 ? 'button' : 'button-secondary');
        ctas.appendChild(link);
      });
      content.appendChild(ctas);
    }

    overlay.appendChild(content);
  }

  if (rows.length >= 3) {
    const logos = rows[2].querySelectorAll('img');
    if (logos.length > 0) {
      const logosDiv = document.createElement('div');
      logosDiv.className = 'hero-product-logos';
      logos.forEach((logo) => logosDiv.appendChild(logo));
      overlay.appendChild(logosDiv);
    }
  }

  banner.appendChild(overlay);
  block.textContent = '';
  block.appendChild(banner);
}
