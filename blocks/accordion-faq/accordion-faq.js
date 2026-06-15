export default function decorate(block) {
  [...block.children].forEach((row) => {
    const label = row.children[0];

    if (label) {
      label.addEventListener('click', () => {
        const isOpen = row.classList.contains('open');
        // Close all other items in same accordion
        [...block.children].forEach((r) => r.classList.remove('open'));
        if (!isOpen) row.classList.add('open');
      });
    }
  });
}
