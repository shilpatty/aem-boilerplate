export default function decorate(block) {
  const rows = [...block.children];
  if (rows[0]) rows[0].classList.add('hero-alliatus-media');
  if (rows[1]) rows[1].classList.add('hero-alliatus-body');

  const media = rows[0];
  if (media) {
    // Floating pills positioned individually around the image
    [
      { text: 'Fresh insights.', cls: 'hero-alliatus-pill-1' },
      { text: 'Collective growth.', cls: 'hero-alliatus-pill-2' },
      { text: 'Real conversations.', cls: 'hero-alliatus-pill-3' },
    ].forEach(({ text, cls }) => {
      const pill = document.createElement('span');
      pill.className = `hero-alliatus-pill ${cls}`;
      pill.textContent = text;
      media.append(pill);
    });

    // Large 8-pointed starburst (white fill, dark border) - top-left
    const starburst = document.createElement('span');
    starburst.className = 'hero-alliatus-starburst';
    media.append(starburst);

    // 4-pointed white outline sparkles over the image
    const sparkle1 = document.createElement('span');
    sparkle1.className = 'hero-alliatus-sparkle hero-alliatus-sparkle-1';
    const sparkle2 = document.createElement('span');
    sparkle2.className = 'hero-alliatus-sparkle hero-alliatus-sparkle-2';
    media.append(sparkle1, sparkle2);
  }
}
