export default function decorate(block) {
  const rows = [...block.children];
  const grid = document.createElement('div');
  grid.className = 'feature-cards-grid';

  rows.forEach((row) => {
    const cells = [...row.children];
    const image = cells[0]?.querySelector('img');
    const content = cells[1] || cells[0];

    const card = document.createElement('article');
    card.className = 'feature-card';

    if (image) {
      const media = document.createElement('div');
      media.className = 'feature-card-media';

      const clone = image.cloneNode(true);
      clone.loading = 'lazy';
      media.append(clone);
      card.append(media);
    }

    const body = document.createElement('div');
    body.className = 'feature-card-body';

    if (content) {
      [...content.childNodes].forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'IMG') return;
        body.append(node.cloneNode(true));
      });
    }

    const heading = body.querySelector('h2, h3, h4');
    if (heading) heading.classList.add('feature-card-title');

    card.append(body);
    grid.append(card);
  });

  block.replaceChildren(grid);
}
