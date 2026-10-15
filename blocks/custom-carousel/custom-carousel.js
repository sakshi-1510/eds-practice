export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const carousel = document.createElement('div');
  carousel.className = 'feature-carousel-track';

  rows.forEach((row) => {
    const cells = [...row.children];
    const image = cells[0]?.querySelector('img');
    const content = cells[1] || cells[0];

    const slide = document.createElement('article');
    slide.className = 'feature-slide';

    const media = document.createElement('div');
    media.className = 'feature-slide-media';

    if (image) {
      const clone = image.cloneNode(true);
      clone.loading = 'lazy';
      media.append(clone);
    }

    const body = document.createElement('div');
    body.className = 'feature-slide-content';

    if (content) {
      [...content.childNodes].forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'IMG') return;
        body.append(node.cloneNode(true));
      });
    }

    slide.append(media, body);
    carousel.append(slide);
  });

  const slides = [...carousel.children];
  if (!slides.length) return;

  const controls = document.createElement('div');
  controls.className = 'feature-carousel-controls';

  const previous = document.createElement('button');
  previous.type = 'button';
  previous.className = 'carousel-arrow';
  previous.textContent = '←';
  previous.setAttribute('aria-label', 'Previous slide');

  const indicators = document.createElement('div');
  indicators.className = 'carousel-indicators';

  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'carousel-arrow';
  next.textContent = '→';
  next.setAttribute('aria-label', 'Next slide');

  let active = 0;
  const dots = slides.map((slide, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => showSlide(index));
    indicators.append(dot);
    return dot;
  });

  function showSlide(index) {
    active = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.hidden = i !== active;
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === active);
      dot.setAttribute('aria-current', i === active ? 'true' : 'false');
    });
  }

  previous.addEventListener('click', () => showSlide(active - 1));
  next.addEventListener('click', () => showSlide(active + 1));

  controls.append(previous, indicators, next);
  block.replaceChildren(carousel, controls);
  block.classList.add('is-enhanced-carousel');

  showSlide(0);
}