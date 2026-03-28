/* ============================================
   BMW SERVICE MIAMI — ENGINE ASSEMBLY
   GSAP ScrollTrigger animation
   Inline-6 TwinPower Turbo assembly/disassembly
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const section = document.getElementById('engine-section');
  if (!section) return;

  /* ── On mobile: show engine fully assembled, skip scroll animation ── */
  if (window.innerWidth < 768) {
    gsap.set('#eng-block, #eng-oilpan, #eng-head, #eng-valvecover, #eng-pistons, #eng-conrods, #eng-crankshaft, #eng-camshafts, #eng-exhaust, #eng-turbo, #eng-intake', { opacity: 1, x: 0, y: 0, scale: 1 });
    gsap.set('#eng-labels', { opacity: 0.75 });
    return;
  }

  /* ── Set initial positions (all parts off-screen) ── */
  gsap.set('#eng-block',     { opacity: 0, y: 160 });
  gsap.set('#eng-oilpan',    { opacity: 0, y: 220 });
  gsap.set('#eng-head',      { opacity: 0, y: -130 });
  gsap.set('#eng-valvecover',{ opacity: 0, y: -200 });
  gsap.set('#eng-pistons',   { opacity: 0, y: -180 });
  gsap.set('#eng-conrods',   { opacity: 0, x: 200 });
  gsap.set('#eng-crankshaft',{ opacity: 0, y: 200, x: -80 });
  gsap.set('#eng-camshafts', { opacity: 0, x: -220 });
  gsap.set('#eng-exhaust',   { opacity: 0, x: 180 });
  gsap.set('#eng-turbo',     { opacity: 0, x: 280, scale: 0.6, transformOrigin: 'center center' });
  gsap.set('#eng-intake',    { opacity: 0, x: -200 });
  gsap.set('#eng-labels',    { opacity: 0 });

  /* ── Master timeline, scrubbed to scroll ── */
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#engine-section',
      start: 'top top',
      end: '+=3200',
      pin: true,
      scrub: 1.2,
      anticipatePin: 1,
    }
  });

  /* Assembly sequence — feels like an engineering reveal */
  tl
    /* 1. Engine block drops in from below — the foundation */
    .to('#eng-block', {
      opacity: 1, y: 0,
      duration: 1.4, ease: 'power3.out'
    })

    /* 2. Oil pan slides up right after */
    .to('#eng-oilpan', {
      opacity: 1, y: 0,
      duration: 1.1, ease: 'power3.out'
    }, '-=0.6')

    /* 3. Crankshaft rises from below + slight lateral drift */
    .to('#eng-crankshaft', {
      opacity: 1, y: 0, x: 0,
      duration: 1.3, ease: 'power3.out'
    }, '-=0.5')

    /* 4. Connecting rods slide in from right */
    .to('#eng-conrods', {
      opacity: 1, x: 0,
      duration: 1.1, ease: 'power3.out'
    }, '-=0.5')

    /* 5. Pistons descend from above (the most satisfying step) */
    .to('#eng-pistons', {
      opacity: 1, y: 0,
      duration: 1.3, ease: 'power3.out'
    }, '-=0.5')

    /* 6. Cylinder head drops down onto block */
    .to('#eng-head', {
      opacity: 1, y: 0,
      duration: 1.2, ease: 'power3.out'
    }, '-=0.3')

    /* 7. Camshafts slide in from the left */
    .to('#eng-camshafts', {
      opacity: 1, x: 0,
      duration: 1.1, ease: 'power3.out'
    }, '-=0.4')

    /* 8. Valve cover caps it off from above */
    .to('#eng-valvecover', {
      opacity: 1, y: 0,
      duration: 1, ease: 'power3.out'
    }, '-=0.4')

    /* 9. Exhaust manifold slides in from right */
    .to('#eng-exhaust', {
      opacity: 1, x: 0,
      duration: 1, ease: 'power3.out'
    }, '-=0.2')

    /* 10. Turbocharger SLAMS in from right with scale */
    .to('#eng-turbo', {
      opacity: 1, x: 0, scale: 1,
      duration: 1.3, ease: 'back.out(1.4)'
    }, '-=0.3')

    /* 11. Intake manifold finishes from left */
    .to('#eng-intake', {
      opacity: 1, x: 0,
      duration: 1, ease: 'power3.out'
    }, '-=0.5')

    /* 12. Labels fade in last */
    .to('#eng-labels', {
      opacity: 0.75,
      duration: 0.8
    }, '-=0.2')

    /* 13. Slight ambient glow pulse on full assembly */
    .to('#engine-svg', {
      filter: 'drop-shadow(0 0 60px rgba(201,168,76,0.18))',
      duration: 1
    }, '-=0.5')

    /* Hold — let user appreciate the assembled engine */
    .to({}, { duration: 1 });
});
