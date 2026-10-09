/* FARHAD · Editorial Rail v6
 * Progressive enhancement for Research / Publication / Experience / Learning.
 * No dependencies; works alongside the existing skill explorer.
 */
(() => {
  "use strict";
  const sectionSelector = ".research-section, .publication-section, .experience-section";
  const cardSelector = ":scope > .research-project, :scope > .publication-item, :scope > .experience-item";
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const groups = [];
  let hoverCard = null;
  let focusedCard = null;
  let lastActive = null;
  let scheduled = false;

  function isVisible(card) {
    if (!card || !card.isConnected) return false;
    const r = card.getBoundingClientRect();
    return r.bottom > 80 && r.top < window.innerHeight - 45 && r.width > 0;
  }

  function getBestCard() {
    const target = document.querySelector(".skill-target-active");
    if (isVisible(target) && target.matches(".research-project, .publication-item, .experience-item")) return target;
    if (hoverCard && hoverCard.matches(":hover") && isVisible(hoverCard)) return hoverCard;
    if (focusedCard && focusedCard.contains(document.activeElement) && isVisible(focusedCard)) return focusedCard;
    // Fall back to the card nearest to the reading line (38% down the viewport).
    const readingLine = Math.min(window.innerHeight - 90, Math.max(125, window.innerHeight * 0.38));
    let best = null, score = Infinity;
    groups.forEach(group => group.cards.forEach(card => {
      if (!isVisible(card)) return;
      const r = card.getBoundingClientRect();
      const distance = r.top <= readingLine && r.bottom >= readingLine
        ? 0 : Math.min(Math.abs(r.top - readingLine), Math.abs(r.bottom - readingLine));
      if (distance < score) {score = distance; best = card;}
    }));
    return best;
  }

  function highlightCard(card) {
    if (card === lastActive) {
      if (card) positionSegment(card);
      return;
    }
    groups.forEach(group => {
      const selected = !!card && group.cards.includes(card);
      group.section.classList.toggle("is-rail-engaged", selected);
      group.cards.forEach(item => item.classList.toggle("is-rail-active", item === card));
      if (!selected) group.segment.style.height = "0px";
    });
    lastActive = card;
    if (card) positionSegment(card);
  }

  function positionSegment(card) {
    const group = groups.find(entry => entry.cards.includes(card));
    if (!group) return;
    const {section, segment} = group;
    const sectionRect = section.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const topOfBranch = parseFloat(getComputedStyle(card, "::before").top) || 26;
    const center = cardRect.top - sectionRect.top + topOfBranch;
    const length = Math.min(54, Math.max(35, Math.min(cardRect.height * 0.38, 54)));
    const minTop = 10;
    const maxTop = Math.max(minTop, section.offsetHeight - length - 8);
    const top = Math.min(maxTop, Math.max(minTop, center - length / 2));
    segment.style.top = `${top.toFixed(1)}px`;
    segment.style.height = `${length.toFixed(1)}px`;
  }

  function update() {
    scheduled = false;
    highlightCard(getBestCard());
  }
  function requestUpdate() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(update);
    }
  }
  function init() {
    document.querySelectorAll(sectionSelector).forEach(section => {
      const cards = Array.from(section.querySelectorAll(cardSelector));
      if (!cards.length) return;
      const segment = document.createElement("span");
      segment.className = "editorial-rail-indicator";
      segment.setAttribute("aria-hidden", "true");
      section.insertBefore(segment, section.firstChild);
      groups.push({section,cards,segment});
      cards.forEach(card => {
        card.addEventListener("pointerenter", () => {hoverCard = card;requestUpdate();});
        card.addEventListener("pointerleave", () => {if (hoverCard === card) hoverCard = null;requestUpdate();});
        card.addEventListener("focusin", () => {focusedCard = card;requestUpdate();});
        card.addEventListener("focusout", () => {requestAnimationFrame(() => {
          if (focusedCard === card && !card.contains(document.activeElement)) focusedCard = null;
          requestUpdate();
        });});
      });
    });
    if (!groups.length) return;
    window.addEventListener("scroll", requestUpdate, {passive:true});
    window.addEventListener("resize", requestUpdate, {passive:true});
    window.addEventListener("hashchange", () => {
      requestAnimationFrame(requestUpdate);
      setTimeout(requestUpdate, 350);
    });
    window.addEventListener("pageshow", requestUpdate);
    document.querySelectorAll(".expandable-details").forEach(details => {
      details.addEventListener("toggle", requestUpdate);
      details.addEventListener("transitionend", requestUpdate);
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(requestUpdate);
    if ("ResizeObserver" in window) {
      const resizeObserver = new ResizeObserver(requestUpdate);
      groups.forEach(group => resizeObserver.observe(group.section));
    }
    requestUpdate();
    if (!prefersReducedMotion.matches) setTimeout(requestUpdate, 350);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, {once:true});
  else init();
})();
