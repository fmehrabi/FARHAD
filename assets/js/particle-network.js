/*
 * FARHAD — subtle interactive particle network, shared by all Jekyll pages.
 * Standalone Canvas 2D: no third-party library or network requests.
 * Light and dark themes follow html[data-theme].
 */
(function () {
  "use strict";

  const canvas = document.getElementById("particle-network");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const root = document.documentElement;
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  const MAX_DPR = 2;
  const FRAME_INTERVAL = 1000 / 30; // Deliberately gentle, battery-conscious motion.
  const LINK_DISTANCE = 145;
  const POINTER_RADIUS = 158;

  let width = 0;
  let height = 0;
  let particles = [];
  let pointer = { x: -9999, y: -9999, active: false };
  let animationId = null;
  let previousTime = 0;
  let resizeScheduled = false;

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  function buildParticles() {
    const area = width * height;
    const mobile = width < 720 || !finePointerQuery.matches;
    // A dense but capped network. Mobile uses fewer points for smoothness.
    const count = mobile
      ? Math.max(25, Math.min(60, Math.round(area / 7500)))
      : Math.max(70, Math.min(180, Math.round(area / 6800)));

    particles = Array.from({ length: count }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: random(-0.22, 0.22),
      vy: random(-0.22, 0.22),
      driftX: random(-0.18, 0.18),
      driftY: random(-0.18, 0.18),
      radius: random(1.25, 2.2),
      tint: index % 9 === 0 ? 1 : 0
    }));
  }

  function resize() {
    const nextWidth = Math.max(1, window.innerWidth);
    const nextHeight = Math.max(1, window.innerHeight);
    if (nextWidth === width && nextHeight === height) return;
    width = nextWidth;
    height = nextHeight;
    const dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildParticles();
    render();
  }

  function update(timeScale) {
    for (const p of particles) {
      if (pointer.active && finePointerQuery.matches) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const distanceSquared = dx * dx + dy * dy;
        if (distanceSquared > 1 && distanceSquared < POINTER_RADIUS * POINTER_RADIUS) {
          const distance = Math.sqrt(distanceSquared);
          const effect = (1 - distance / POINTER_RADIUS) * 0.038 * timeScale;
          p.vx += (dx / distance) * effect;
          p.vy += (dy / distance) * effect;
        }
      }

      // Ease back toward a tiny constant drift; movement never dies out.
      p.vx += (p.driftX - p.vx) * 0.008 * timeScale;
      p.vy += (p.driftY - p.vy) * 0.008 * timeScale;
      const speed = Math.hypot(p.vx, p.vy);
      if (speed > 0.66) {
        p.vx = p.vx / speed * 0.66;
        p.vy = p.vy / speed * 0.66;
      }
      p.x += p.vx * timeScale;
      p.y += p.vy * timeScale;

      // Wrap at the edge rather than creating a visible bounce.
      if (p.x < -8) p.x = width + 8;
      if (p.x > width + 8) p.x = -8;
      if (p.y < -8) p.y = height + 8;
      if (p.y > height + 8) p.y = -8;
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    const dark = root.getAttribute("data-theme") === "dark";
    const primary = dark ? "69,167,194" : "39,140,168";
    const secondary = dark ? "105,132,205" : "76,112,178";
    const linkDistanceSq = LINK_DISTANCE * LINK_DISTANCE;

    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distanceSq = dx * dx + dy * dy;
        if (distanceSq >= linkDistanceSq) continue;
        const proximity = 1 - Math.sqrt(distanceSq) / LINK_DISTANCE;
        const alpha = (dark ? 0.26 : 0.22) * proximity;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${(i + j) % 7 === 0 ? secondary : primary},${alpha})`;
        ctx.lineWidth = 0.85;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.tint ? secondary : primary},${dark ? 0.61 : 0.58})`;
      ctx.fill();
    }
  }

  function loop(time) {
    animationId = requestAnimationFrame(loop);
    if (time - previousTime < FRAME_INTERVAL) return;
    const elapsed = previousTime ? Math.min(time - previousTime, 75) : FRAME_INTERVAL;
    previousTime = time;
    update(elapsed / FRAME_INTERVAL);
    render();
  }

  function stop() {
    if (animationId !== null) cancelAnimationFrame(animationId);
    animationId = null;
    previousTime = 0;
  }

  function syncMotion() {
    stop();
    if (document.hidden) return;
    render();
    if (!motionQuery.matches) animationId = requestAnimationFrame(loop);
  }

  function scheduleResize() {
    if (resizeScheduled) return;
    resizeScheduled = true;
    requestAnimationFrame(function () {
      resizeScheduled = false;
      resize();
    });
  }

  window.addEventListener("pointermove", function (event) {
    if (!finePointerQuery.matches || motionQuery.matches) return;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
  }, { passive: true });

  document.addEventListener("pointerout", function (event) {
    if (!event.relatedTarget) pointer.active = false;
  }, { passive: true });

  // The wheel gives a subtle swirl; never intercept scrolling or block clicks.
  window.addEventListener("wheel", function (event) {
    if (!finePointerQuery.matches || motionQuery.matches) return;
    const x = Number.isFinite(event.clientX) ? event.clientX : width / 2;
    const y = Number.isFinite(event.clientY) ? event.clientY : height / 2;
    const impulse = Math.max(-0.035, Math.min(0.035, event.deltaY * 0.00006));
    for (const p of particles) {
      const dx = p.x - x;
      const dy = p.y - y;
      if (dx * dx + dy * dy > 230 * 230) continue;
      p.vx += (-dy / 230) * impulse;
      p.vy += ( dx / 230) * impulse;
    }
  }, { passive: true });

  window.addEventListener("resize", scheduleResize, { passive: true });
  document.addEventListener("visibilitychange", syncMotion);
  if (motionQuery.addEventListener) motionQuery.addEventListener("change", syncMotion);
  else if (motionQuery.addListener) motionQuery.addListener(syncMotion);
  if (finePointerQuery.addEventListener) finePointerQuery.addEventListener("change", scheduleResize);

  new MutationObserver(render).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  resize();
  syncMotion();
})();
