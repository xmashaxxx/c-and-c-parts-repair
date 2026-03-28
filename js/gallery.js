/* ============================================
   BMW SERVICE MIAMI — LIGHTBOX / GALLERY
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lbContent = lightbox.querySelector('.lightbox-content');
  const lbClose   = lightbox.querySelector('.lb-close');
  const lbPrev    = lightbox.querySelector('.lb-prev');
  const lbNext    = lightbox.querySelector('.lb-next');
  const lbCounter = lightbox.querySelector('.lb-counter');

  const items = Array.from(document.querySelectorAll('.gallery-item'));
  let current = 0;

  /* ── Open lightbox ── */
  function openAt(index) {
    current = index;
    renderItem();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    gsap.fromTo(lbContent,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
    );
  }

  /* ── Render current item ── */
  function renderItem() {
    const item    = items[current];
    const type    = item.dataset.type;   // 'photo' or 'video'
    const src     = item.dataset.src;
    const alt     = item.dataset.alt || '[SHOP NAME]';

    lbContent.innerHTML = '';

    if (type === 'video') {
      const vid = document.createElement('video');
      vid.src = src;
      vid.controls = true;
      vid.autoplay = true;
      vid.style.maxWidth  = '90vw';
      vid.style.maxHeight = '85vh';
      lbContent.appendChild(vid);
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.alt = alt;
      lbContent.appendChild(img);
    }

    if (lbCounter) {
      lbCounter.textContent = `${current + 1} / ${items.length}`;
    }

    // Re-add close button (after innerHTML wipe)
    lbContent.appendChild(Object.assign(document.createElement('button'), {
      className: 'lb-close', innerHTML: '&times;',
      onclick: closeLightbox
    }));

    const counter = document.createElement('div');
    counter.className = 'lb-counter';
    counter.textContent = `${current + 1} / ${items.length}`;
    lbContent.appendChild(counter);
  }

  /* ── Close ── */
  function closeLightbox() {
    gsap.to(lbContent, {
      opacity: 0, scale: 0.92, duration: 0.3, ease: 'power3.in',
      onComplete: () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lbContent.innerHTML = '';
      }
    });
  }

  /* ── Navigate ── */
  function goNext() {
    current = (current + 1) % items.length;
    gsap.to(lbContent, { opacity: 0, x: -30, duration: 0.2, ease: 'power2.in',
      onComplete: () => { gsap.set(lbContent, { x: 30 }); renderItem();
        gsap.to(lbContent, { opacity: 1, x: 0, duration: 0.25, ease: 'power2.out' }); }
    });
  }
  function goPrev() {
    current = (current - 1 + items.length) % items.length;
    gsap.to(lbContent, { opacity: 0, x: 30, duration: 0.2, ease: 'power2.in',
      onComplete: () => { gsap.set(lbContent, { x: -30 }); renderItem();
        gsap.to(lbContent, { opacity: 1, x: 0, duration: 0.25, ease: 'power2.out' }); }
    });
  }

  /* ── Bind gallery items ── */
  items.forEach((item, i) => {
    item.addEventListener('click', () => openAt(i));
  });

  /* ── Controls ── */
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbNext)  lbNext.addEventListener('click', goNext);
  if (lbPrev)  lbPrev.addEventListener('click', goPrev);

  /* ── Click overlay to close ── */
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  /* ── Keyboard ── */
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft')  goPrev();
  });

  /* ── Touch swipe ── */
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
  });
});
