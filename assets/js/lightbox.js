(() => {
  const triggerSelector =
    ".experience-gallery-item img, " +
    ".publication-paper-preview img";

  const triggers = Array.from(
    document.querySelectorAll(triggerSelector)
  );

  if (!triggers.length) {
    return;
  }

  const reduceMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)");

  const lightbox = document.createElement("div");
  lightbox.id = "image-lightbox";
  lightbox.className = "image-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Image preview");
  lightbox.setAttribute("aria-hidden", "true");

  lightbox.innerHTML = `
    <div class="image-lightbox-stage">
      <div class="image-lightbox-image-shell">
        <img
          id="image-lightbox-image"
          class="image-lightbox-image"
          src=""
          alt=""
          draggable="false"
        >
      </div>
    </div>

    <button
      id="image-lightbox-close"
      class="image-lightbox-control image-lightbox-close"
      type="button"
      aria-label="Close image preview"
      title="Close"
    >
      <span aria-hidden="true">&times;</span>
    </button>

    <button
      id="image-lightbox-prev"
      class="image-lightbox-control image-lightbox-prev"
      type="button"
      aria-label="Previous image"
      title="Previous image"
      hidden
    >
      <span aria-hidden="true">&lsaquo;</span>
    </button>

    <button
      id="image-lightbox-next"
      class="image-lightbox-control image-lightbox-next"
      type="button"
      aria-label="Next image"
      title="Next image"
      hidden
    >
      <span aria-hidden="true">&rsaquo;</span>
    </button>

    <div
      id="image-lightbox-counter"
      class="image-lightbox-counter"
      aria-live="polite"
      hidden
    ></div>

    <div
      class="image-lightbox-zoom-controls"
      aria-label="Image zoom controls"
    >
      <button
        id="image-lightbox-zoom-out"
        class="image-lightbox-zoom-button"
        type="button"
        aria-label="Zoom out"
        title="Zoom out"
      >
        <span aria-hidden="true">&minus;</span>
      </button>

      <span
        id="image-lightbox-zoom-value"
        class="image-lightbox-zoom-value"
        aria-live="polite"
      >
        100%
      </span>

      <button
        id="image-lightbox-zoom-in"
        class="image-lightbox-zoom-button"
        type="button"
        aria-label="Zoom in"
        title="Zoom in"
      >
        <span aria-hidden="true">+</span>
      </button>

      <button
        id="image-lightbox-zoom-reset"
        class="image-lightbox-zoom-button image-lightbox-zoom-reset"
        type="button"
        aria-label="Reset zoom"
        title="Reset zoom"
      >
        <span aria-hidden="true">&#8634;</span>
      </button>
    </div>
  `;

  document.body.appendChild(lightbox);

  const stage =
    lightbox.querySelector(".image-lightbox-stage");

  const imageShell =
    lightbox.querySelector(".image-lightbox-image-shell");

  const lightboxImage =
    document.getElementById("image-lightbox-image");

  const closeButton =
    document.getElementById("image-lightbox-close");

  const prevButton =
    document.getElementById("image-lightbox-prev");

  const nextButton =
    document.getElementById("image-lightbox-next");

  const counter =
    document.getElementById("image-lightbox-counter");

  const zoomOutButton =
    document.getElementById("image-lightbox-zoom-out");

  const zoomInButton =
    document.getElementById("image-lightbox-zoom-in");

  const zoomResetButton =
    document.getElementById("image-lightbox-zoom-reset");

  const zoomValue =
    document.getElementById("image-lightbox-zoom-value");

  let activeGroup = [];
  let activeIndex = 0;
  let lastTrigger = null;
  let switchTimer = null;

  let zoom = 1;
  let panX = 0;
  let panY = 0;

  const minZoom = 1;
  const maxZoom = 4;
  const zoomStep = 0.25;

  let isDragging = false;
  let dragPointerId = null;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragOriginX = 0;
  let dragOriginY = 0;

  function getImageSource(image) {
    return image.currentSrc || image.src;
  }

  function getImageGroup(trigger) {
    const experienceGallery =
      trigger.closest(".experience-gallery");

    if (experienceGallery) {
      return Array.from(
        experienceGallery.querySelectorAll(
          ".experience-gallery-item img"
        )
      );
    }

    return [trigger];
  }

  function preloadGroup(group) {
    group.forEach((item) => {
      const source = getImageSource(item);

      if (!source) {
        return;
      }

      const preload = new Image();
      preload.src = source;
    });
  }

  function updateNavigation() {
    const multipleImages =
      activeGroup.length > 1;

    prevButton.hidden = !multipleImages;
    nextButton.hidden = !multipleImages;
    counter.hidden = !multipleImages;

    if (multipleImages) {
      counter.textContent =
        `${activeIndex + 1} / ${activeGroup.length}`;
    } else {
      counter.textContent = "";
    }
  }

  function updateZoomControls() {
    const percentage =
      Math.round(zoom * 100);

    zoomValue.textContent =
      `${percentage}%`;

    zoomOutButton.disabled =
      zoom <= minZoom + 0.001;

    zoomInButton.disabled =
      zoom >= maxZoom - 0.001;

    lightbox.classList.toggle(
      "is-zoomed",
      zoom > 1.001
    );
  }

  function getStageAvailableSize() {
    const style =
      window.getComputedStyle(stage);

    const paddingLeft =
      parseFloat(style.paddingLeft) || 0;

    const paddingRight =
      parseFloat(style.paddingRight) || 0;

    const paddingTop =
      parseFloat(style.paddingTop) || 0;

    const paddingBottom =
      parseFloat(style.paddingBottom) || 0;

    return {
      width:
        stage.clientWidth -
        paddingLeft -
        paddingRight,
      height:
        stage.clientHeight -
        paddingTop -
        paddingBottom
    };
  }

  function clampPan() {
    if (zoom <= 1.001) {
      panX = 0;
      panY = 0;
      return;
    }

    const baseWidth =
      lightboxImage.offsetWidth;

    const baseHeight =
      lightboxImage.offsetHeight;

    const available =
      getStageAvailableSize();

    const scaledWidth =
      baseWidth * zoom;

    const scaledHeight =
      baseHeight * zoom;

    const maxX =
      Math.max(
        0,
        (scaledWidth - available.width) / 2 + 24
      );

    const maxY =
      Math.max(
        0,
        (scaledHeight - available.height) / 2 + 24
      );

    panX =
      Math.min(
        maxX,
        Math.max(-maxX, panX)
      );

    panY =
      Math.min(
        maxY,
        Math.max(-maxY, panY)
      );
  }

  function renderTransform() {
    clampPan();

    lightboxImage.style.transform =
      `translate3d(${panX}px, ${panY}px, 0) scale(${zoom})`;

    updateZoomControls();
  }

  function setZoom(nextZoom) {
    zoom =
      Math.min(
        maxZoom,
        Math.max(minZoom, nextZoom)
      );

    if (zoom <= 1.001) {
      zoom = 1;
      panX = 0;
      panY = 0;
    }

    renderTransform();
  }

  function resetZoom() {
    zoom = 1;
    panX = 0;
    panY = 0;
    renderTransform();
  }

  function applyActiveImage() {
    const activeImage =
      activeGroup[activeIndex];

    if (!activeImage) {
      return;
    }

    resetZoom();

    lightboxImage.src =
      getImageSource(activeImage);

    lightboxImage.alt =
      activeImage.alt || "Expanded image";

    updateNavigation();
  }

  function switchImage(nextIndex) {
    if (activeGroup.length <= 1) {
      return;
    }

    const normalizedIndex =
      (nextIndex + activeGroup.length) %
      activeGroup.length;

    if (normalizedIndex === activeIndex) {
      return;
    }

    if (switchTimer) {
      window.clearTimeout(switchTimer);
      switchTimer = null;
    }

    if (reduceMotion.matches) {
      activeIndex = normalizedIndex;
      applyActiveImage();
      return;
    }

    imageShell.classList.add("is-switching");

    switchTimer = window.setTimeout(() => {
      activeIndex = normalizedIndex;
      applyActiveImage();

      requestAnimationFrame(() => {
        imageShell.classList.remove(
          "is-switching"
        );
      });

      switchTimer = null;
    }, 110);
  }

  function openLightbox(trigger) {
    activeGroup = getImageGroup(trigger);

    activeIndex = Math.max(
      0,
      activeGroup.indexOf(trigger)
    );

    lastTrigger = trigger;

    preloadGroup(activeGroup);
    applyActiveImage();

    document.body.classList.add("lightbox-open");

    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );

    requestAnimationFrame(() => {
      lightbox.classList.add("is-open");

      window.setTimeout(() => {
        closeButton.focus({
          preventScroll: true
        });
      }, reduceMotion.matches ? 0 : 80);
    });
  }

  function closeLightbox() {
    if (!lightbox.classList.contains("is-open")) {
      return;
    }

    if (switchTimer) {
      window.clearTimeout(switchTimer);
      switchTimer = null;
    }

    isDragging = false;
    dragPointerId = null;

    lightbox.classList.remove("is-open");
    lightbox.classList.remove("is-dragging");

    document.body.classList.remove(
      "lightbox-open"
    );

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    resetZoom();

    if (lastTrigger) {
      lastTrigger.focus({
        preventScroll: true
      });
    }
  }

  function panBy(deltaX, deltaY) {
    if (zoom <= 1.001) {
      return;
    }

    panX += deltaX;
    panY += deltaY;
    renderTransform();
  }

  function getFocusableControls() {
    return [
      closeButton,
      prevButton,
      nextButton,
      zoomOutButton,
      zoomInButton,
      zoomResetButton
    ].filter((button) => {
      return !button.hidden && !button.disabled;
    });
  }

  triggers.forEach((trigger) => {
    trigger.classList.add(
      "js-lightbox-trigger"
    );

    trigger.setAttribute("role", "button");
    trigger.setAttribute("tabindex", "0");
    trigger.setAttribute(
      "aria-haspopup",
      "dialog"
    );

    trigger.setAttribute(
      "aria-label",
      `Open larger image: ${
        trigger.alt || "image preview"
      }`
    );

    trigger.addEventListener(
      "click",
      () => openLightbox(trigger)
    );

    trigger.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          openLightbox(trigger);
        }
      }
    );
  });

  closeButton.addEventListener(
    "click",
    closeLightbox
  );

  prevButton.addEventListener(
    "click",
    () => switchImage(activeIndex - 1)
  );

  nextButton.addEventListener(
    "click",
    () => switchImage(activeIndex + 1)
  );

  zoomOutButton.addEventListener(
    "click",
    () => setZoom(zoom - zoomStep)
  );

  zoomInButton.addEventListener(
    "click",
    () => setZoom(zoom + zoomStep)
  );

  zoomResetButton.addEventListener(
    "click",
    resetZoom
  );

  lightboxImage.addEventListener(
    "load",
    () => {
      requestAnimationFrame(() => {
        renderTransform();
      });
    }
  );

  imageShell.addEventListener(
    "dblclick",
    (event) => {
      event.preventDefault();

      if (zoom > 1.001) {
        resetZoom();
      } else {
        setZoom(2);
      }
    }
  );

  stage.addEventListener(
    "wheel",
    (event) => {
      if (
        !lightbox.classList.contains("is-open")
      ) {
        return;
      }

      event.preventDefault();

      const direction =
        event.deltaY < 0 ? 1 : -1;

      setZoom(
        zoom + direction * zoomStep
      );
    },
    { passive: false }
  );

  imageShell.addEventListener(
    "pointerdown",
    (event) => {
      if (zoom <= 1.001) {
        return;
      }

      if (
        event.pointerType === "mouse" &&
        event.button !== 0
      ) {
        return;
      }

      isDragging = true;
      dragPointerId = event.pointerId;

      dragStartX = event.clientX;
      dragStartY = event.clientY;

      dragOriginX = panX;
      dragOriginY = panY;

      imageShell.setPointerCapture(
        event.pointerId
      );

      lightbox.classList.add(
        "is-dragging"
      );

      event.preventDefault();
    }
  );

  imageShell.addEventListener(
    "pointermove",
    (event) => {
      if (
        !isDragging ||
        event.pointerId !== dragPointerId
      ) {
        return;
      }

      panX =
        dragOriginX +
        (event.clientX - dragStartX);

      panY =
        dragOriginY +
        (event.clientY - dragStartY);

      renderTransform();
    }
  );

  function finishDrag(event) {
    if (
      !isDragging ||
      event.pointerId !== dragPointerId
    ) {
      return;
    }

    isDragging = false;
    dragPointerId = null;

    lightbox.classList.remove(
      "is-dragging"
    );

    if (
      imageShell.hasPointerCapture(
        event.pointerId
      )
    ) {
      imageShell.releasePointerCapture(
        event.pointerId
      );
    }
  }

  imageShell.addEventListener(
    "pointerup",
    finishDrag
  );

  imageShell.addEventListener(
    "pointercancel",
    finishDrag
  );

  stage.addEventListener(
    "click",
    (event) => {
      if (event.target === stage) {
        closeLightbox();
      }
    }
  );

  window.addEventListener(
    "resize",
    () => {
      if (
        lightbox.classList.contains("is-open")
      ) {
        renderTransform();
      }
    }
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (
        !lightbox.classList.contains("is-open")
      ) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
        return;
      }

      if (
        event.key === "+" ||
        event.key === "="
      ) {
        event.preventDefault();
        setZoom(zoom + zoomStep);
        return;
      }

      if (event.key === "-") {
        event.preventDefault();
        setZoom(zoom - zoomStep);
        return;
      }

      if (event.key === "0") {
        event.preventDefault();
        resetZoom();
        return;
      }

      if (zoom > 1.001) {
        const keyboardPan = 70;

        if (event.key === "ArrowUp") {
          event.preventDefault();
          panBy(0, keyboardPan);
          return;
        }

        if (event.key === "ArrowDown") {
          event.preventDefault();
          panBy(0, -keyboardPan);
          return;
        }

        if (event.key === "ArrowLeft") {
          event.preventDefault();
          panBy(keyboardPan, 0);
          return;
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          panBy(-keyboardPan, 0);
          return;
        }
      }

      if (
        event.key === "ArrowLeft" &&
        activeGroup.length > 1
      ) {
        event.preventDefault();
        switchImage(activeIndex - 1);
        return;
      }

      if (
        event.key === "ArrowRight" &&
        activeGroup.length > 1
      ) {
        event.preventDefault();
        switchImage(activeIndex + 1);
        return;
      }

      if (event.key === "Tab") {
        const focusableControls =
          getFocusableControls();

        if (!focusableControls.length) {
          event.preventDefault();
          return;
        }

        const firstControl =
          focusableControls[0];

        const lastControl =
          focusableControls[
            focusableControls.length - 1
          ];

        if (
          event.shiftKey &&
          document.activeElement === firstControl
        ) {
          event.preventDefault();
          lastControl.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === lastControl
        ) {
          event.preventDefault();
          firstControl.focus();
        }
      }
    }
  );

  updateZoomControls();
})();
