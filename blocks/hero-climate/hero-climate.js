export default function decorate(block) {
  const firstRow = block.querySelector(':scope > div:first-child');
  const img = firstRow?.querySelector('img');

  if (img) {
    // Wrap standalone img in picture for consistent styling
    if (!img.closest('picture')) {
      const picture = document.createElement('picture');
      img.parentElement.replaceChild(picture, img);
      picture.append(img);
    }
    // Move picture to be direct child of block for absolute positioning
    const picture = firstRow.querySelector('picture');
    if (picture) {
      firstRow.replaceWith(picture);
    }
  } else {
    block.classList.add('no-image');
  }
}
