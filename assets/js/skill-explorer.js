/*
 * FARHAD · Skill Explorer
 * A single, editable evidence registry powers:
 * (1) skill chips beneath Research, Publications, Experience, and Learning cards,
 * (2) an accessible site-wide marquee,
 * (3) a compact modal showing where a selected skill is demonstrated or learned.
 *
 * To add a new work: add a record below, give it a unique id/page/title/skills,
 * and either match its page card heading or set data-skill-record="id" on the card.
 * All links respect the GitHub Pages project base path.
 */
(function () {
  "use strict";

  const scriptElement = document.currentScript;
  const siteRoot = new URL(
    (scriptElement && scriptElement.dataset.siteRoot) || "/",
    window.location.href
  );

  // "Research" describes a project or research direction; "Publication" describes
  // an output; "Experience" is evidence of practice; "Learning" is course content.
  const records = [
    { id: "research-generative-ai", page: "research", type: "Research", title: "Generative AI, Organizational Decision-Making, and Strategic Transformation", meta: "Ongoing Research", summary: "Examines organizational decision-making, governance, adaptation, and value creation in the context of generative AI.", skills: ["Generative AI", "AI Governance", "Organizational Decision-Making", "Strategic Management"] },
    { id: "research-digikala-transformation", page: "research", type: "Research", title: "Value Creation of Digital Transformation in Digikala: A System Dynamics Approach", meta: "MA Thesis · 2025", summary: "Modeled feedback across value-creation subsystems and tested digital transformation policies through simulation and sensitivity analysis.", skills: ["System Dynamics", "Digital Transformation", "Policy Simulation", "Sensitivity Analysis", "Mixed-Methods Research"] },
    { id: "research-soda", page: "research", type: "Research", title: "Developing a Cognitive Map of Startup Success Factors Using Strategic Options Development and Analysis (SODA)", meta: "Course Project · 2023", summary: "Used expert interviews and SODA cognitive mapping to identify strategic themes and leverage points in startup growth.", skills: ["Cognitive Mapping", "SODA", "Semi-Structured Interviews", "Strategic Analysis"] },
    { id: "research-snapp", page: "research", type: "Research", title: "Strategic Analysis of Multi-Sided Platforms: A Case Study of Snapp", meta: "Course Project · 2022", summary: "Applied Platform Envelopment and evaluated network effects, multi-homing, and expansion strategy.", skills: ["Platform Strategy", "Platform Envelopment", "Network Effects", "Strategic Analysis"] },
    { id: "research-warehouse", page: "research", type: "Research", title: "Process Reengineering of Warehousing in Digikala", meta: "Course Project · 2022", summary: "Analyzed existing warehouse processes and proposed automation-supported process redesign.", skills: ["Business Process Reengineering", "Process Analysis", "Organizational Capabilities"] },

    { id: "publication-digital-transformation", page: "publications", type: "Publication", title: "An Analysis of Value Creation in the Digital Transformation Process of E-commerce using a System Dynamics Approach", meta: "Working Paper", summary: "Studies dynamic interactions among technological investment, organizational capabilities, and value creation.", skills: ["System Dynamics", "Digital Transformation", "Organizational Capabilities"] },
    { id: "publication-generative-ai", page: "publications", type: "Publication", title: "The Generation–Evaluation Asymmetry in Post-Adoption Generative AI: A System Dynamics Model of Organizational Capability and Innovation", meta: "Working Paper", summary: "Uses system dynamics to examine how generative AI, human cognitive capital, and governance affect sustainable innovation.", skills: ["System Dynamics", "Generative AI", "AI Governance", "Organizational Capabilities"] },
    { id: "publication-robot-exploration", page: "publications", type: "Publication", title: "A Comparison between Rapidly Randomized Tree and Efficient Frontier Methods for Autonomous Mobile Robot Exploration", meta: "ICRoM · 2022", summary: "Compared exploration methods for autonomous robots using ROS, Gazebo, and TurtleBot3 experiments.", skills: ["Robotics", "Autonomous Navigation", "ROS", "Path Planning"] },

    { id: "experience-research-atu", page: "experience", type: "Experience", title: "Research Assistant", matchOrganization: "Allameh Tabataba’i University", displayTitle: "Research Assistant — Allameh Tabataba’i University", meta: "2024–Present", summary: "Developed research designs and conducted mixed-method studies in strategic and technology-enabled organizational research.", skills: ["Research Design", "Mixed-Methods Research", "System Dynamics", "Qualitative Analysis"] },
    { id: "experience-research-amirkabir", page: "experience", type: "Experience", title: "Research Assistant", matchOrganization: "Amirkabir University of Technology", displayTitle: "Research Assistant — Amirkabir University of Technology", meta: "2019–2022", summary: "Developed robot navigation algorithms and coordinated multidisciplinary research projects.", skills: ["Robotics", "Autonomous Navigation", "Path Planning", "Research Coordination"] },
    { id: "experience-teaching-bpm", page: "experience", type: "Experience", title: "Graduate Teaching Assistant — Business Process Management", meta: "2025–Present", summary: "Supported graduate instruction in BPMN modeling, process automation, and process management tools.", skills: ["Business Process Management", "BPMN 2.0", "Camunda", "Academic Mentoring"] },
    { id: "experience-teaching-sd", page: "experience", type: "Experience", title: "Graduate Teaching Assistant — System Dynamics", meta: "2024–Present", summary: "Mentored students in Vensim, feedback modeling, and system dynamics simulation projects.", skills: ["System Dynamics", "Vensim", "Simulation Modeling", "Academic Mentoring"] },
    { id: "experience-syntech", page: "experience", type: "Experience", title: "Manufacturing & Mechanical Design Engineer", meta: "2015–2018", summary: "Contributed to mechanical design, production process improvement, and manufacturing problem-solving.", skills: ["Mechanical Design", "Production Process Improvement", "Engineering Design"] },

    { id: "learning-business-models", page: "learning", type: "Learning", title: "Business models in strategic management", meta: "The Open University · OpenLearn · 2026", summary: "Covered business model classifications, value creation and capture, and the nine blocks of the Business Model Canvas.", skills: ["Business Model Analysis", "Business Model Canvas", "Business Model Design", "Value Proposition Analysis"] },
    { id: "learning-business-analysis", page: "learning", type: "Learning", title: "Career Essentials in Business Analysis", meta: "Microsoft & LinkedIn Learning · 2025", summary: "Studied business analysis, requirements engineering, process modeling, and project and data fundamentals.", skills: ["Business Analysis", "Requirements Engineering", "Business Process Management"] },
    { id: "learning-visual-paradigm", page: "learning", type: "Learning", title: "Visual Paradigm for BPMN 2.0 and Process Design", meta: "Workshop · 2025", summary: "Completed training in process modeling and design with Visual Paradigm.", skills: ["BPMN 2.0", "Process Modeling"] },
    { id: "learning-camunda", page: "learning", type: "Learning", title: "BPMN and Camunda Workshop", meta: "Sharif University of Technology · 2023", summary: "Participated in a workshop on business process notation and Camunda workflows.", skills: ["BPMN 2.0", "Camunda", "Process Modeling"] },
    { id: "learning-powerbi", page: "learning", type: "Learning", title: "Power BI for Business Analytics", meta: "Course · 2023", summary: "Completed training in analytical reporting and business intelligence with Power BI.", skills: ["Power BI", "Business Intelligence"] },
    { id: "learning-celonis", page: "learning", type: "Learning", title: "Celonis Process Mining Fundamentals", meta: "Course · 2023", summary: "Completed foundational training in process mining with Celonis.", skills: ["Process Mining", "Celonis"] },
    { id: "learning-systems-thinking", page: "learning", type: "Learning", title: "Introduction to Systems Thinking with Practical Simulation Project", meta: "Course · 2023", summary: "Completed an introduction to systems thinking accompanied by a practical simulation project.", skills: ["Systems Thinking", "Simulation Modeling"] },
    { id: "learning-tableau-powerbi", page: "learning", type: "Learning", title: "Data Visualization and Dashboarding with Tableau & Power BI", meta: "Self-directed · 2026", summary: "Independent learning focused on visualization, dashboards, and BI software.", skills: ["Tableau", "Power BI", "Business Intelligence"] },
    { id: "learning-research-design", page: "learning", type: "Learning", title: "Advanced Research Design and Methodological Alignment", meta: "Audited · 2026", summary: "Audited graduate-level learning on methodological alignment and research design.", skills: ["Research Design", "Methodological Alignment"] },
    { id: "learning-machine-learning", page: "learning", type: "Learning", title: "Foundations of Machine Learning", meta: "Audited · 2025", summary: "Audited a foundational machine learning course.", skills: ["Machine Learning"] },
    { id: "learning-methodology", page: "learning", type: "Learning", title: "Research Methodology and Proposal Development", meta: "Audited doctoral seminar · 2025", summary: "Audited teaching on research methodology and scholarly proposal development.", skills: ["Research Design", "Research Methodology"] },
    { id: "learning-data-science", page: "learning", type: "Learning", title: "Foundations of Data Science", meta: "Self-directed · 2025", summary: "Self-directed foundational data science learning.", skills: ["Data Science"] }
  ];

  const categoryOrder = ["Research", "Publication", "Experience", "Learning"];
  const pathNames = { research: "research/", publications: "publications/", experience: "experience/", learning: "learning/" };
  const skillNames = Array.from(new Set(records.flatMap(record => record.skills)));
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

  function normalize(value) {
    return String(value || "")
      .normalize("NFKD")
      .replace(/[\u2010-\u2015]/g, "-")
      .replace(/&/g, " and ")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function route(page) {
    return page === "about" ? new URL("./", siteRoot) : new URL(pathNames[page], siteRoot);
  }

  function getPage() {
    const current = window.location.pathname.replace(/\/+$/, "") + "/";
    for (const page of Object.keys(pathNames)) {
      if (current === route(page).pathname.replace(/\/+$/, "") + "/") return page;
    }
    return "about";
  }

  const currentPage = getPage();
  const pageSelectors = {
    research: [".research-project", ".research-project-title"],
    publications: [".publication-item", ".publication-title"],
    experience: [".experience-item", ".experience-role"],
    learning: [".learning-item", ".research-project-title"]
  };

  function findCardRecord(card, headingSelector) {
    const explicit = card.dataset.skillRecord;
    if (explicit) return records.find(record => record.id === explicit && record.page === currentPage) || null;
    const heading = card.querySelector(headingSelector);
    if (!heading) return null;
    const title = normalize(heading.textContent);
    const organization = normalize((card.querySelector(".experience-organization") || {}).textContent);
    return records.find(record =>
      record.page === currentPage &&
      normalize(record.title) === title &&
      (!record.matchOrganization || normalize(record.matchOrganization) === organization)
    ) || null;
  }

  function buttonForSkill(skill, extraClass) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "skill-chip" + (extraClass ? " " + extraClass : "");
    button.dataset.skill = skill;
    button.textContent = skill;
    button.setAttribute("aria-label", "Show related work for " + skill);
    button.addEventListener("click", () => showSkill(skill, button));
    return button;
  }

  function attachSkills() {
    const selectors = pageSelectors[currentPage];
    if (!selectors) return;
    document.querySelectorAll(selectors[0]).forEach(card => {
      const record = findCardRecord(card, selectors[1]);
      if (!record) return;
      card.id = record.id;
      card.classList.add("skill-record-card");
      if (card.querySelector(":scope > .skill-card-tags")) return;
      const box = document.createElement("div");
      box.className = "skill-card-tags";
      const label = document.createElement("div");
      label.className = "skill-card-caption";
      const words = currentPage === "learning" ? "KEY LEARNING AREAS" :
        currentPage === "research" ? "METHODS & AREAS" :
        currentPage === "publications" ? "METHODS & TOPICS" : "SKILLS DEMONSTRATED";
      label.innerHTML = '<span class="skill-diamond" aria-hidden="true"></span>';
      const text = document.createElement("span");
      text.textContent = words;
      label.appendChild(text);
      const chips = document.createElement("div");
      chips.className = "skill-chip-list";
      record.skills.forEach(skill => chips.appendChild(buttonForSkill(skill)));
      box.append(label, chips);
      const details = card.querySelector(":scope > details.expandable-details");
      if (details) card.insertBefore(box, details);
      else card.appendChild(box);
    });
  }

  let dialogBackdrop, dialogPanel, dialogTitle, dialogBody, priorFocus;
  let tickerController = null;

  function modalItem(record) {
    const item = document.createElement("li");
    item.className = "skill-result";
    const heading = document.createElement("span");
    heading.className = "skill-result-title";
    const url = route(record.page);
    url.hash = record.id;
    heading.textContent = record.displayTitle || record.title;
    const meta = document.createElement("span");
    meta.className = "skill-result-meta";
    meta.textContent = record.meta;
    const description = document.createElement("p");
    description.textContent = record.summary;
    const navigate = document.createElement("span");
    navigate.className = "skill-result-link";
    navigate.textContent = "View this entry  →";
    // One accessible link encloses the item's text, so clicking anywhere is intuitive.
    const link = document.createElement("a");
    link.className = "skill-result-link-wrap";
    link.href = url.href;
    link.setAttribute("aria-label", "Open " + (record.displayTitle || record.title));
    link.append(heading, meta, description, navigate);
    item.append(link);
    return item;
  }

  function showSkill(skill, origin) {
    if (!dialogBackdrop || !dialogPanel) return;
    const matches = records.filter(record => record.skills.includes(skill));
    priorFocus = origin || document.activeElement;
    dialogTitle.textContent = skill;
    dialogBody.replaceChildren();
    const intro = document.createElement("p");
    intro.className = "skill-dialog-intro";
    intro.id = "skill-dialog-desc";
    intro.textContent = matches.length + (matches.length === 1 ? " related entry" : " related entries") + " across research, publications, experience, and learning.";
    dialogBody.appendChild(intro);
    for (const type of categoryOrder) {
      const group = matches.filter(record => record.type === type);
      if (!group.length) continue;
      const heading = document.createElement("h3");
      heading.className = "skill-dialog-group-title";
      heading.textContent = type + "  ·  " + group.length;
      const list = document.createElement("ul");
      list.className = "skill-results";
      group.forEach(record => list.appendChild(modalItem(record)));
      dialogBody.append(heading, list);
    }
    dialogBackdrop.hidden = false;
    document.body.classList.add("skill-overlay-open");
    if (tickerController) tickerController.setDialogOpen(true);
    dialogPanel.querySelector(".skill-dialog-close").focus({ preventScroll: true });
  }

  function closeSkill() {
    if (!dialogBackdrop || dialogBackdrop.hidden) return;
    dialogBackdrop.hidden = true;
    document.body.classList.remove("skill-overlay-open");
    if (tickerController) tickerController.setDialogOpen(false);
    if (priorFocus && priorFocus.isConnected && typeof priorFocus.focus === "function") {
      priorFocus.focus({ preventScroll: true });
    }
  }

  function buildDialog() {
    dialogBackdrop = document.createElement("div");
    dialogBackdrop.className = "skill-dialog-backdrop";
    dialogBackdrop.hidden = true;
    dialogBackdrop.innerHTML = [
      '<section class="skill-dialog" role="dialog" aria-modal="true" aria-labelledby="skill-dialog-title" aria-describedby="skill-dialog-desc">',
      '<header class="skill-dialog-header">',
      '<div><span class="skill-dialog-eyebrow">SKILL EXPLORER</span><h2 id="skill-dialog-title"></h2></div>',
      '<button class="skill-dialog-close" type="button" aria-label="Close skill explorer">×</button>',
      '</header>',
      '<div class="skill-dialog-content" id="skill-dialog-desc"></div>',
      '</section>'
    ].join("");
    document.body.appendChild(dialogBackdrop);
    dialogPanel = dialogBackdrop.querySelector(".skill-dialog");
    dialogTitle = dialogBackdrop.querySelector("#skill-dialog-title");
    dialogBody = dialogBackdrop.querySelector(".skill-dialog-content");
    dialogBackdrop.querySelector(".skill-dialog-close").addEventListener("click", closeSkill);
    dialogBackdrop.addEventListener("pointerdown", event => {
      if (event.target === dialogBackdrop) closeSkill();
    });
    document.addEventListener("keydown", event => {
      if (dialogBackdrop.hidden) return;
      if (event.key === "Escape") { event.preventDefault(); closeSkill(); return; }
      if (event.key !== "Tab") return;
      const focusables = Array.from(dialogPanel.querySelectorAll('button:not([disabled]), a[href]'));
      if (!focusables.length) { event.preventDefault(); return; }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    });
  }

  /*
   * A lightweight time-based marquee rather than a CSS animation.
   * A normalized position is saved on pagehide, then advanced by elapsed wall
   * time on the next page so its movement does not restart at the first chip.
   * 232 seconds per full cycle = half the previous 116-second speed.
   */
  function buildTicker() {
    const previousTicker = document.getElementById("skill-marquee");
    if (previousTicker) previousTicker.remove();
    const LOOP_MS = 232000;
    const STORAGE_KEY = "farhad-skill-marquee-position-v4";
    const DRAG_THRESHOLD_PX = 6;

    const ticker = document.createElement("aside");
    ticker.id = "skill-marquee";
    ticker.className = "skill-marquee";
    ticker.dataset.version = "5";
    ticker.setAttribute("aria-label", "Browse skills; drag horizontally or choose a skill");
    const viewport = document.createElement("div");
    viewport.className = "skill-marquee-viewport";
    viewport.setAttribute("aria-label", "Skills; drag left or right to browse");
    const track = document.createElement("div");
    track.className = "skill-marquee-track";

    for (let iteration = 0; iteration < 2; iteration++) {
      const group = document.createElement("div");
      group.className = "skill-marquee-group";
      if (iteration === 1) group.setAttribute("aria-hidden", "true");
      skillNames.forEach(skill => {
        const button = buttonForSkill(skill, "skill-marquee-chip");
        if (iteration === 1) button.tabIndex = -1;
        group.appendChild(button);
      });
      track.appendChild(group);
    }
    viewport.appendChild(track);
    ticker.appendChild(viewport);
    document.body.appendChild(ticker);

    const firstGroup = track.firstElementChild;
    let phase = 0;
    let groupWidth = 0;
    let lastFrameAt = null;
    let frameId = 0;
    let keyboardFocus = false;
    let dialogOpen = false;
    let drag = null;
    let suppressClicksUntil = 0;
    let keyboardNavigation = false;

    function wrap(value) {
      return ((value % 1) + 1) % 1;
    }

    // Reading and writing storage is best-effort: disabled storage must not
    // stop the rest of the portfolio from loading.
    function readState() {
      for (const storageName of ["localStorage", "sessionStorage"]) {
        try {
          const storage = window[storageName];
          const saved = JSON.parse(storage.getItem(STORAGE_KEY) || "null");
          if (saved && Number.isFinite(saved.phase) && Number.isFinite(saved.at)) {
            return saved;
          }
        } catch (error) { /* Browsers can restrict storage. */ }
      }
      return null;
    }

    function saveState() {
      const value = JSON.stringify({ phase: wrap(phase), at: Date.now() });
      for (const storageName of ["localStorage", "sessionStorage"]) {
        try { window[storageName].setItem(STORAGE_KEY, value); return; }
        catch (error) { /* Continue gracefully if storage is unavailable. */ }
      }
    }

    function restoreState() {
      const saved = readState();
      if (!saved) return;
      const elapsed = Math.max(0, Date.now() - saved.at);
      // With reduced motion, never advance autonomously.
      phase = wrap(saved.phase + (motionPreference.matches ? 0 : elapsed / LOOP_MS));
    }

    function measure() {
      groupWidth = firstGroup.getBoundingClientRect().width;
      render();
    }

    function render() {
      if (!groupWidth) return;
      track.style.transform = "translate3d(" + (-phase * groupWidth).toFixed(3) + "px,0,0)";
    }

    function paused() {
      return keyboardFocus || dialogOpen || Boolean(drag) || motionPreference.matches;
    }

    function animate(time) {
      frameId = 0;
      if (paused() || document.hidden) {
        lastFrameAt = null;
        return;
      }
      if (lastFrameAt !== null) {
        // Avoid a large jump when a browser tab is throttled or sleeping.
        phase = wrap(phase + Math.min(time - lastFrameAt, 80) / LOOP_MS);
        render();
      }
      lastFrameAt = time;
      frameId = window.requestAnimationFrame(animate);
    }

    // Do not run a 60fps idle loop while the ribbon is paused or when a user
    // requests reduced motion. Drag rendering is independent from this clock.
    function refreshClock() {
      if (paused() || document.hidden) {
        if (frameId) window.cancelAnimationFrame(frameId);
        frameId = 0;
        lastFrameAt = null;
      } else if (!frameId) {
        lastFrameAt = null;
        frameId = window.requestAnimationFrame(animate);
      }
    }

    // No pause on pointer hover: a cursor parked over the footer should not
    // freeze the marquee indefinitely. Actual drag and the glass dialog pause it.
    // Keyboard focus retains a motion pause for accessibility.

    // Clicking with a mouse should not leave the ticker paused forever merely
    // because the dialog restores focus to its originating chip.
    document.addEventListener("keydown", event => {
      if (["Tab", "ArrowLeft", "ArrowRight"].includes(event.key)) keyboardNavigation = true;
    }, true);
    document.addEventListener("pointerdown", () => { keyboardNavigation = false; }, true);
    ticker.addEventListener("focusin", () => {
      keyboardFocus = keyboardNavigation;
      refreshClock();
    });
    ticker.addEventListener("focusout", event => {
      if (!ticker.contains(event.relatedTarget)) { keyboardFocus = false; refreshClock(); }
    });

    ticker.addEventListener("click", event => {
      // Native button clicks are cancelled only after an actual drag, not after
      // an ordinary click/tap on a capsule.
      if (window.performance.now() < suppressClicksUntil) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);

    viewport.addEventListener("pointerdown", event => {
      if (event.button !== 0 && event.pointerType === "mouse") return;
      drag = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startPhase: phase,
        moved: false
      };
      refreshClock();
    });

    viewport.addEventListener("pointermove", event => {
      if (!drag || drag.pointerId !== event.pointerId) return;
      const distance = event.clientX - drag.startX;
      if (!drag.moved && Math.abs(distance) < DRAG_THRESHOLD_PX) return;
      if (!drag.moved) {
        drag.moved = true;
        viewport.classList.add("is-dragging");
        try { viewport.setPointerCapture(event.pointerId); } catch (error) { /* benign */ }
      }
      if (groupWidth > 0) phase = wrap(drag.startPhase - distance / groupWidth);
      render();
      event.preventDefault();
    });

    function stopDragging(event) {
      if (!drag || drag.pointerId !== event.pointerId) return;
      if (drag.moved) {
        suppressClicksUntil = window.performance.now() + 250;
        saveState();
      }
      drag = null;
      viewport.classList.remove("is-dragging");
      if (viewport.hasPointerCapture(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId);
      }
      refreshClock();
    }
    viewport.addEventListener("pointerup", stopDragging);
    viewport.addEventListener("pointercancel", stopDragging);
    // Covers release outside the ribbon before pointer capture begins.
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);
    viewport.addEventListener("lostpointercapture", event => {
      if (drag && drag.pointerId === event.pointerId) stopDragging(event);
    });

    // Horizontal trackpad scroll works, while a vertical wheel still scrolls
    // the page naturally.
    viewport.addEventListener("wheel", event => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || !groupWidth) return;
      event.preventDefault();
      phase = wrap(phase + event.deltaX / groupWidth);
      render();
      saveState();
      refreshClock();
    }, { passive: false });

    function onPageHide() { saveState(); }
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("pageshow", event => {
      if (event.persisted) {
        restoreState();
        measure();
        refreshClock();
      }
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { saveState(); refreshClock(); }
      else { restoreState(); refreshClock(); render(); }
    });

    if ("ResizeObserver" in window) {
      new ResizeObserver(measure).observe(firstGroup);
    } else {
      window.addEventListener("resize", measure, { passive: true });
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    if (motionPreference.addEventListener) {
      motionPreference.addEventListener("change", () => { saveState(); refreshClock(); });
    }

    restoreState();
    measure();
    refreshClock();
    tickerController = {
      setDialogOpen(value) {
        dialogOpen = Boolean(value);
        if (dialogOpen) saveState();
        refreshClock();
      }
    };
  }

  function locateHashTarget() {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id || !records.some(record => record.id === id)) return;
    const target = document.getElementById(id);
    if (!target) return;
    target.classList.add("skill-target-active");
    // Defer until the fonts/layout settle, also works when arriving from another page.
    window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: motionPreference.matches ? "instant" : "smooth", block: "center" });
    });
    window.setTimeout(() => target.classList.remove("skill-target-active"), 2600);
  }

  function init() {
    attachSkills();
    buildDialog();
    buildTicker();
    locateHashTarget();
    window.addEventListener("hashchange", locateHashTarget);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
