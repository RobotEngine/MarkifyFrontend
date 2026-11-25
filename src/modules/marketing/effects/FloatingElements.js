class FloatingElement {
  constructor(container, config = {}) {
    this.container = container;

    // Position is defined by the element's center point (% of container)
    this.baseX = config.x ?? 50;
    this.baseY = config.y ?? 50;

    // Size & base orientation
    this.width = config.width ?? 120;
    this.height = config.height ?? 'auto';
    this.baseScale = config.scale ?? 1;
    this.baseRotateX = config.rotateX ?? 0;
    this.baseRotateY = config.rotateY ?? 0;
    this.baseRotateZ = config.baseRotateZ ?? config.rotateZ ?? 0;
    this.basePerspective = config.perspective ?? 900;

    // Resting vs. near-cursor vibrancy/effects
    this.baseOpacity = config.opacity ?? 0.5;
    this.hoverOpacity = config.hoverOpacity ?? 1;
    this.idleSaturate = config.idleSaturate ?? 0.8;
    this.idleBrightness = config.idleBrightness ?? 1;
    this.idleBlur = config.idleBlur ?? 2;

    // Barely-noticeable default float motion
    this.floatAmplitude = config.floatAmplitude ?? 2.2;
    this.floatSpeed = config.floatSpeed ?? 0.00075;
    this.idleRotAmplitude = config.idleRotAmplitude ?? 0.8;
    this.phase = config.phase ?? Math.random() * Math.PI * 2;

    // Gentle cursor glide & tilt (no aggressive shoving)
    this.proximityRadius = config.proximityRadius ?? 400;
    this.swayStrength = config.swayStrength ?? 12;
    this.maxTiltDelta = config.maxTiltDelta ?? 9;
    this.maxSpinDelta = config.maxSpinDelta ?? 3;
    this.stiffness = config.stiffness ?? 0.045;
    this.damping = config.damping ?? 0.86;

    // How much scrolling since last pointermove attenuates proximity effect (px of scroll to zero out)
    this.scrollProximityDecayPx = config.scrollProximityDecayPx ?? 140;

    // Scroll flight, shrink & fade
    this.flyToCenter = config.flyToCenter ?? true;
    this.scrollFade = config.scrollFade ?? true;
    this.scrollShrink = config.scrollShrink ?? true;
    this.fadeOutEnd = config.fadeOutEnd ?? 0.5;
    this.pullStrength = config.pullStrength ?? 1;
    this.minFlightScale = config.minFlightScale ?? 0.1;
    this.scrollLerp = config.scrollLerp ?? 0.14;

    // Runtime state
    this.scrollProgress = 0;
    this.renderedScrollProgress = 0;
    this.pointerX = null;
    this.pointerY = null;
    this.pointerScrollY = 0;
    this.currentScrollY = 0;

    this.offsetX = 0;
    this.offsetY = 0;
    this.velX = 0;
    this.velY = 0;

    this.tiltX = 0;
    this.tiltY = 0;
    this.tiltZ = 0;
    this.velTiltX = 0;
    this.velTiltY = 0;
    this.velTiltZ = 0;

    this.currentPerspective = this.basePerspective;
    this.currentFocus = 0;

    this.el = this.#buildElement(config.svg ?? '');
    this.container.appendChild(this.el);
  }

  #buildElement(svgMarkup) {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'absolute';
    wrapper.style.left = '0';
    wrapper.style.top = '0';
    wrapper.style.width = typeof this.width === 'number' ? `${this.width}px` : this.width;
    if (this.height !== 'auto') {
      wrapper.style.height = typeof this.height === 'number' ? `${this.height}px` : this.height;
    }
    wrapper.style.pointerEvents = 'none';
    wrapper.style.willChange = 'transform, opacity, filter';
    wrapper.innerHTML = svgMarkup;

    const svg = wrapper.querySelector('svg');
    if (svg) {
      svg.style.width = '100%';
      svg.style.height = '100%';
    }

    return wrapper;
  }

  setScrollProgress(progress, scrollY = 0) {
    this.scrollProgress = Math.min(1, Math.max(0, progress));
    this.currentScrollY = scrollY;
  }

  setPointer(clientX, clientY, scrollY = this.currentScrollY) {
    this.pointerX = clientX;
    this.pointerY = clientY;
    this.pointerScrollY = scrollY;
  }

  clearPointer() {
    this.pointerX = null;
    this.pointerY = null;
  }

  #stepSpring(current, velocity, target) {
    const force = (target - current) * this.stiffness;
    const nextVel = (velocity + force) * this.damping;
    return { value: current + nextVel, velocity: nextVel };
  }

  hasActiveMotion() {
    return (
      Math.abs(this.renderedScrollProgress - this.scrollProgress) > 0.0005 ||
      Math.abs(this.velX) > 0.01 ||
      Math.abs(this.velY) > 0.01 ||
      Math.abs(this.velTiltX) > 0.01 ||
      Math.abs(this.velTiltY) > 0.01 ||
      Math.abs(this.velTiltZ) > 0.01 ||
      Math.abs(this.offsetX) > 0.05 ||
      Math.abs(this.offsetY) > 0.05
    );
  }

  update(now, bounds) {
    if (!bounds.width || !bounds.height) return;

    this.renderedScrollProgress += (this.scrollProgress - this.renderedScrollProgress) * this.scrollLerp;
    const p = this.renderedScrollProgress;

    // 1. Subtle, slow idle drift
    const idleOffsetY = Math.sin(now * this.floatSpeed + this.phase) * this.floatAmplitude;
    const idleOffsetX = Math.cos(now * this.floatSpeed * 0.65 + this.phase) * (this.floatAmplitude * 0.55);
    const idleRotZ = Math.sin(now * this.floatSpeed * 0.8 + this.phase) * this.idleRotAmplitude;

    // 2. Base center before scroll pull
    const baseCenterX = (this.baseX / 100) * bounds.width + idleOffsetX;
    const baseCenterY = (this.baseY / 100) * bounds.height + idleOffsetY;

    // 3. Optional scroll pull toward container center
    let restX = baseCenterX;
    let restY = baseCenterY;

    if (this.flyToCenter) {
      const targetCenterX = bounds.width * 0.5;
      const targetCenterY = bounds.height * 0.5;
      const pull = p * this.pullStrength;
      restX = baseCenterX + (targetCenterX - baseCenterX) * pull;
      restY = baseCenterY + (targetCenterY - baseCenterY) * pull;
    }

    // 4. Gentle cursor glide, tilt, and vibrancy target (attenuated by scroll delta since last pointer move)
    let targetOffsetX = 0;
    let targetOffsetY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let targetTiltZ = 0;
    let targetPerspective = this.basePerspective;
    let targetFocus = 0;

    if (this.pointerX !== null && this.pointerY !== null) {
      const deltaScrollY = Math.abs(this.currentScrollY - this.pointerScrollY);
      const scrollRetention =
        this.scrollProximityDecayPx > 0
          ? Math.max(0, 1 - deltaScrollY / this.scrollProximityDecayPx)
          : 1;

      if (scrollRetention > 0) {
        const screenCenterX = bounds.left + restX;
        const screenCenterY = bounds.top + restY;
        const dx = this.pointerX - screenCenterX;
        const dy = this.pointerY - screenCenterY;
        const dist = Math.hypot(dx, dy);

        if (dist < this.proximityRadius) {
          const rawCloseness = 1 - dist / this.proximityRadius;
          const closeness =
            rawCloseness * rawCloseness * (3 - 2 * rawCloseness) * scrollRetention;

          const normX = dx / this.proximityRadius;
          const normY = dy / this.proximityRadius;

          targetOffsetX = normX * this.swayStrength * closeness;
          targetOffsetY = normY * this.swayStrength * closeness;

          targetTiltY = normX * this.maxTiltDelta * closeness;
          targetTiltX = -normY * this.maxTiltDelta * closeness;
          targetTiltZ = normX * this.maxSpinDelta * closeness;

          targetPerspective = this.basePerspective - closeness * 200;
          targetFocus = closeness;
        }
      }
    }

    const posX = this.#stepSpring(this.offsetX, this.velX, targetOffsetX);
    const posY = this.#stepSpring(this.offsetY, this.velY, targetOffsetY);
    this.offsetX = posX.value;
    this.velX = posX.velocity;
    this.offsetY = posY.value;
    this.velY = posY.velocity;

    const rotX = this.#stepSpring(this.tiltX, this.velTiltX, targetTiltX);
    const rotY = this.#stepSpring(this.tiltY, this.velTiltY, targetTiltY);
    const rotZ = this.#stepSpring(this.tiltZ, this.velTiltZ, targetTiltZ);
    this.tiltX = rotX.value;
    this.velTiltX = rotX.velocity;
    this.tiltY = rotY.value;
    this.velTiltY = rotY.velocity;
    this.tiltZ = rotZ.value;
    this.velTiltZ = rotZ.velocity;

    this.currentPerspective += (targetPerspective - this.currentPerspective) * 0.12;
    this.currentFocus += (targetFocus - this.currentFocus) * 0.1;

    const finalX = restX + this.offsetX;
    const finalY = restY + this.offsetY;

    const activeOpacity =
      this.baseOpacity + (this.hoverOpacity - this.baseOpacity) * this.currentFocus;
    const fadeRatio = this.scrollFade ? Math.min(1, p / Math.max(0.001, this.fadeOutEnd)) : 0;
    const opacity = activeOpacity * (1 - fadeRatio);

    const saturate = this.idleSaturate + (1 - this.idleSaturate) * this.currentFocus;
    const brightness = this.idleBrightness + (1 - this.idleBrightness) * this.currentFocus;
    const blur = this.idleBlur * (1 - this.currentFocus);

    const shrinkFactor = this.scrollShrink ? 1 - p * (1 - this.minFlightScale) : 1;
    const finalScale = this.baseScale * shrinkFactor;

    this.el.style.opacity = opacity.toFixed(3);
    this.el.style.filter = `saturate(${saturate.toFixed(2)}) brightness(${brightness.toFixed(2)}) blur(${blur.toFixed(2)}px)`;
    this.el.style.transform = [
      `translate3d(${finalX.toFixed(1)}px, ${finalY.toFixed(1)}px, 0)`,
      'translate(-50%, -50%)',
      `perspective(${Math.round(this.currentPerspective)}px)`,
      `scale(${finalScale.toFixed(3)})`,
      `rotateX(${(this.baseRotateX + this.tiltX).toFixed(2)}deg)`,
      `rotateY(${(this.baseRotateY + this.tiltY).toFixed(2)}deg)`,
      `rotateZ(${(this.baseRotateZ + idleRotZ + this.tiltZ).toFixed(2)}deg)`,
    ].join(' ');
  }

  destroy() {
    this.el.remove();
  }
}

export class FloatingElements {
  constructor(id, pipeline, options = {}) {
    this.id = id;
    this.pipeline = pipeline;
    this.container =
      typeof options.container === 'string'
        ? document.querySelector(options.container)
        : options.container;

    // Small-viewport visibility (width AND height) & fade transition settings
    this.hideOnSmallScreens = options.hideOnSmallScreens ?? true;
    this.hideBelowWidth = options.hideBelowWidth ?? options.minBreakpoint ?? 1000;
    this.hideBelowHeight = options.hideBelowHeight ?? options.minHeight ?? 700;
    this.visibilityFadeDuration = options.visibilityFadeDuration ?? 250; // ms

    // scrollDistance as a multiplier of window.innerHeight (e.g., 0.5 = 50vh, 1 = 100vh)
    this.scrollDistanceVh = options.scrollDistanceVh ?? options.scrollDistance ?? 1;
    this.flyToCenter = options.flyToCenter ?? true;
    this.scrollFade = options.scrollFade ?? true;
    this.scrollShrink = options.scrollShrink ?? true;
    this.offscreenMargin = options.offscreenMargin ?? 120;

    this.items = [];
    this.isVisible = true;
    this.isInViewport = true;
    this.bounds = { left: 0, top: 0, width: 0, height: 0 };
    this.rafId = null;
    this.sleepTimeoutId = null;
    this.isAwake = false;

    if (this.container) {
      this.#initContainer();
      this.#measure();
      this.#updateVisibility(true);
      this.#updateScrollProgress();
      this.#subscribeEvents();
      this.wake();
    }
  }

  #initContainer() {
    const computed = getComputedStyle(this.container);
    if (computed.position === 'static') {
      this.container.style.position = 'relative';
    }
    this.container.style.pointerEvents = 'none';
    this.container.style.transition = `opacity ${this.visibilityFadeDuration}ms ease, visibility ${this.visibilityFadeDuration}ms ease`;
  }

  #getScrollY() {
    return window.scrollY ?? window.pageYOffset ?? 0;
  }

  #subscribeEvents() {
    if (!this.pipeline || typeof this.pipeline.subscribe !== 'function') return;

    this.pipeline.subscribe(this.id, 'pointermove', ({ event }) => {
      if (!this.isVisible || !this.isInViewport) return;
      const x = event?.clientX;
      const y = event?.clientY;
      if (typeof x !== 'number' || typeof y !== 'number') return;

      const scrollY = this.#getScrollY();
      for (const item of this.items) {
        item.setPointer(x, y, scrollY);
      }
      this.wake();
    });

    this.pipeline.subscribe(this.id, 'bounds_change', () => {
      this.#measure();
      this.#updateScrollProgress();
      this.wake();
    });

    this.pipeline.subscribe(this.id, 'resize', () => {
      this.#measure();
      this.#updateVisibility(false);
      this.#updateScrollProgress();
      this.wake();
    });
  }

  #measure() {
    if (!this.container) return;
    const rect = this.container.getBoundingClientRect();
    const vh = window.innerHeight || 0;
    const vw = window.innerWidth || 0;
    const pad = this.offscreenMargin;

    this.bounds = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };

    this.isInViewport =
      rect.bottom > -pad &&
      rect.top < vh + pad &&
      rect.right > -pad &&
      rect.left < vw + pad;
  }

  #applyContainerVisibilityStyles(shouldShow, instant = false) {
    if (!this.container) return;

    if (this.sleepTimeoutId !== null) {
      clearTimeout(this.sleepTimeoutId);
      this.sleepTimeoutId = null;
    }

    if (instant) {
      this.container.style.transition = 'none';
      this.container.style.opacity = shouldShow ? '1' : '0';
      this.container.style.visibility = shouldShow ? 'visible' : 'hidden';
      void this.container.offsetWidth;
      this.container.style.transition = `opacity ${this.visibilityFadeDuration}ms ease, visibility ${this.visibilityFadeDuration}ms ease`;
    } else {
      this.container.style.opacity = shouldShow ? '1' : '0';
      this.container.style.visibility = shouldShow ? 'visible' : 'hidden';
    }

    if (!shouldShow) {
      this.sleepTimeoutId = setTimeout(() => {
        this.sleepTimeoutId = null;
        if (!this.isVisible) {
          this.sleep();
        }
      }, instant ? 0 : this.visibilityFadeDuration);
    }
  }

  #updateVisibility(instant = false) {
    if (!this.container) return;

    const tooNarrow = window.innerWidth < this.hideBelowWidth;
    const tooShort = window.innerHeight < this.hideBelowHeight;
    const shouldShow = !this.hideOnSmallScreens || (!tooNarrow && !tooShort);

    const changed = shouldShow !== this.isVisible;
    this.isVisible = shouldShow;

    if (changed || instant) {
      this.#applyContainerVisibilityStyles(shouldShow, instant);
    }
  }

  setHideOnSmallScreens(
    enabled,
    belowWidth = this.hideBelowWidth,
    belowHeight = this.hideBelowHeight
  ) {
    this.hideOnSmallScreens = Boolean(enabled);
    this.hideBelowWidth = belowWidth;
    this.hideBelowHeight = belowHeight;
    this.#updateVisibility(false);
    if (this.isVisible) {
      this.#measure();
      this.#updateScrollProgress();
      this.wake();
    }
  }

  setFlyToCenter(enabled) {
    this.flyToCenter = Boolean(enabled);
    for (const item of this.items) {
      item.flyToCenter = this.flyToCenter;
    }
    this.wake();
  }

  #getScrollDistancePx() {
    const vh = window.innerHeight || 1;
    return Math.max(1, this.scrollDistanceVh * vh);
  }

  #updateScrollProgress() {
    if (!this.isVisible) return;
    const scrollY = this.#getScrollY();
    const distancePx = this.#getScrollDistancePx();
    const progress = scrollY / distancePx;

    for (const item of this.items) {
      item.setScrollProgress(progress, scrollY);
    }
  }

  createElement(config = {}) {
    if (!this.container) return null;

    const itemConfig = {
      flyToCenter: this.flyToCenter,
      scrollFade: this.scrollFade,
      scrollShrink: this.scrollShrink,
      ...config,
    };

    const item = new FloatingElement(this.container, itemConfig);
    this.items.push(item);

    this.#measure();
    this.#updateScrollProgress();
    item.update(performance.now(), this.bounds);
    if (this.isVisible) {
      this.wake();
    }

    return item;
  }

  wake() {
    if (!this.isVisible || !this.isInViewport || this.items.length === 0) {
      return;
    }
    if (this.isAwake) return;

    this.isAwake = true;
    this.rafId = requestAnimationFrame(this.#tick);
  }

  sleep() {
    this.isAwake = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  #tick = (now) => {
    if (!this.isVisible) {
      this.sleep();
      return;
    }

    this.#measure();
    this.#updateScrollProgress();

    if (!this.isInViewport) {
      this.sleep();
      return;
    }

    let anyMoving = false;
    for (const item of this.items) {
      item.update(now, this.bounds);
      if (item.hasActiveMotion()) {
        anyMoving = true;
      }
    }

    if (this.isInViewport && (this.items.length > 0 || anyMoving)) {
      this.rafId = requestAnimationFrame(this.#tick);
    } else {
      this.sleep();
    }
  };

  clear() {
    for (const item of this.items) {
      item.destroy();
    }
    this.items = [];
    this.sleep();
  }

  destroy() {
    if (this.sleepTimeoutId !== null) {
      clearTimeout(this.sleepTimeoutId);
      this.sleepTimeoutId = null;
    }
    this.clear();
  }
}