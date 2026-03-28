/* ============================================
   NSL COLLECTIVE — Community page animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('.nsl-hero')) return;

  gsap.registerPlugin(ScrollTrigger);

  /* ── Hero entrance (triggered after loader hides) ── */
  function nslHeroIn() {
    const tag      = document.querySelector('.nsl-tag');
    const wordmark = document.querySelector('.nsl-wordmark');
    const fullName = document.querySelector('.nsl-full-name');
    const tagline  = document.querySelector('.nsl-tagline');
    const btns     = document.querySelector('.nsl-hero-btns');
    const scroll   = document.querySelector('.nsl-scroll');

    gsap.set([tag, wordmark, fullName, tagline, btns, scroll], { y: 40, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 });
    tl.to(tag,      { opacity: 1, y: 0, duration: 0.8 })
      .to(wordmark, { opacity: 1, y: 0, duration: 1.2 }, '-=0.4')
      .to(fullName, { opacity: 1, y: 0, duration: 0.9 }, '-=0.7')
      .to(tagline,  { opacity: 1, y: 0, duration: 1 },   '-=0.6')
      .to(btns,     { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to(scroll,   { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
  }

  // Hook into the loader completing (main.js fires initHeroEntrance via initLoader;
  // on the NSL page we override with our own entrance)
  const loader = document.getElementById('page-loader');
  if (loader) {
    const obs = new MutationObserver(() => {
      if (loader.style.display === 'none') {
        nslHeroIn();
        obs.disconnect();
      }
    });
    obs.observe(loader, { attributes: true, attributeFilter: ['style'] });
  } else {
    nslHeroIn();
  }

  /* ── NSL About section ── */
  gsap.from('.nsl-about-img', {
    opacity: 0, x: -70, duration: 1.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.nsl-about-inner', start: 'top 80%', toggleActions: 'play none none none' }
  });
  gsap.from('.nsl-about-text', {
    opacity: 0, x: 70, duration: 1.1, delay: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.nsl-about-inner', start: 'top 80%', toggleActions: 'play none none none' }
  });
  gsap.from('.nsl-stat', {
    opacity: 0, y: 30, stagger: 0.15, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: '.nsl-stats', start: 'top 88%', toggleActions: 'play none none none' }
  });

  /* ── NSL Grid items stagger ── */
  const gridItems = gsap.utils.toArray('.nsl-grid-item');
  gridItems.forEach((item, i) => {
    gsap.from(item, {
      opacity: 0, scale: 0.94, duration: 0.7, delay: i * 0.06, ease: 'power3.out',
      scrollTrigger: { trigger: '#nsl-gallery', start: 'top 85%', toggleActions: 'play none none none' }
    });
  });

  /* ── CTA section ── */
  gsap.from('.nsl-cta-inner', {
    opacity: 0, y: 50, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.nsl-cta', start: 'top 80%', toggleActions: 'play none none none' }
  });

  /* ── NSL color bar animate on scroll ── */
  gsap.from('.nsl-color-bar span', {
    scaleX: 0, transformOrigin: 'left', duration: 0.8, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.nsl-color-bar', start: 'top 90%', toggleActions: 'play none none none' }
  });
});
