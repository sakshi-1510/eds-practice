export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const image = rows[0].querySelector('img');
  const hero = document.createElement('div');
  hero.className = 'hero-banner-inner';

  if (image) {
    hero.style.setProperty('--hero-image', `url("${image.src}")`);
    rows[0].remove();
  }

  const content = document.createElement('div');
  content.className = 'hero-banner-content';

  rows.forEach((row, index) => {
    const wrapper = document.createElement('div');

    if (index === 0) wrapper.className = 'hero-eyebrow';
    if (index === 1) {
      wrapper.className = 'hero-title';
      const heading = row.querySelector('h1, h2, h3, p');
      if (heading) {
        const h1 = document.createElement('h1');
        h1.innerHTML = heading.innerHTML;
        wrapper.append(h1);
      } else {
        const h1 = document.createElement('h1');
        h1.textContent = row.textContent;
        wrapper.append(h1);
      }
    }
    if (index === 2) wrapper.className = 'hero-description';
    if (index === 3) wrapper.className = 'hero-actions';

    if (index !== 1) wrapper.append(...row.childNodes);
    content.append(wrapper);
  });

  hero.append(content);
  block.replaceChildren(hero);
}
