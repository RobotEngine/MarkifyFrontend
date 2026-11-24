class VariableWeightWave {
  constructor(target, text, options = {}) {
    if (target == null) {
      return;
    }

    this.element = target;

    this.text = text;
    this.options = {
      minWeight: 350,
      maxWeight: 800,
      radius: 120,
      wakePadding: 60,
      smoothing: 0.14,
      settleEpsilon: 0.2,
      axis: "wght",
      lockWidth: true,
      widthPadding: 0,
      waveOnStart: false,
      waveDelay: 1000,
      waveDuration: 2000,
      waveSpread: 5, // How wide the traveling wave pulse is (in character indices)
      wavePeakWeight: null, // Defaults to maxWeight if not set
      ...options
    };

    this.spans = [];
    this.charMetrics = [];
    this.bounds = { left: 0, right: 0, top: 0, bottom: 0 };
    this.mouse = { x: -9999, y: -9999, clientX: null, clientY: null, inRange: false };
    this.waveState = {
      active: false,
      startTime: 0,
      duration: this.options.waveDuration,
      peakWeight: this.options.wavePeakWeight ?? this.options.maxWeight,
      spread: this.options.waveSpread
    };
    this.waveTimerId = null;
    this.rafId = null;

    this.init();
  }

  init() {
    let {
      minWeight,
      maxWeight,
      axis,
      lockWidth,
      widthPadding,
      waveOnStart,
      waveDelay
    } = this.options;

    this.element.setAttribute("aria-label", this.text);
    this.element.innerHTML = "";

    let fragment = document.createDocumentFragment();
    let tokens = this.text.split(/(\s+)/); // Preserves spaces as separate tokens

    tokens.forEach((token) => {
      if (!token) return;

      // Whitespace token: regular space allows natural word wrapping between words
      if (/^\s+$/.test(token)) {
        fragment.appendChild(document.createTextNode(" "));
        return;
      }

      // Word wrapper prevents mid-word line breaks while keeping per-char spans
      let wordWrap = document.createElement("span");
      wordWrap.style.display = "inline-block";
      wordWrap.style.whiteSpace = "nowrap";
      wordWrap.setAttribute("aria-hidden", "true");

      [...token].forEach((char) => {
        let span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";

        if (lockWidth) {
          span.style.textAlign = "center";
          span.style.fontVariationSettings = `"${axis}" ${maxWeight}`;
        } else {
          span.style.fontVariationSettings = `"${axis}" ${minWeight}`;
        }

        wordWrap.appendChild(span);
        this.spans.push(span);
        this.charMetrics.push({
          x: 0,
          y: 0,
          currentWeight: minWeight,
          targetWeight: minWeight
        });
      });

      fragment.appendChild(wordWrap);
    });

    this.element.appendChild(fragment);

    if (lockWidth == true) {
      this.spans.forEach((span) => {
        let rect = span.getBoundingClientRect();
        span.style.width = `${rect.width + widthPadding}px`;
        span.style.fontVariationSettings = `"${axis}" ${minWeight}`;
      });
    }

    this.onResize();

    if (waveOnStart == true) {
      if (document.fonts != null && document.fonts.ready != null) {
        document.fonts.ready.then(() => {
          this.waveTimerId = window.setTimeout(() => {
            this.doWave();
          }, waveDelay);
        });
      } else {
        this.waveTimerId = window.setTimeout(() => {
          this.doWave();
        }, waveDelay);
      }
    }
  }

  doWave({ duration, peakWeight, spread } = {}) {
    if (this.spans.length < 1) {
      return;
    }

    this.waveState.active = true;
    this.waveState.startTime = performance.now();
    this.waveState.duration = duration ?? this.options.waveDuration;
    this.waveState.peakWeight = peakWeight ?? this.options.wavePeakWeight ?? this.options.maxWeight;
    this.waveState.spread = spread ?? this.options.waveSpread;

    this.wake();
  }

  onPointerMove(pageX, pageY, { fromScroll = false } = {}) {
    let scrollX = window.scrollX || window.pageXOffset || 0;
    let scrollY = window.scrollY || window.pageYOffset || 0;

    this.mouse.x = pageX;
    this.mouse.y = pageY;

    if (fromScroll == false) {
      this.mouse.clientX = pageX - scrollX;
      this.mouse.clientY = pageY - scrollY;
    }

    if (!Number.isFinite(this.bounds.left) || !Number.isFinite(this.bounds.top)) {
      this.onResize();
    }

    let { radius, wakePadding } = this.options;
    let margin = radius + wakePadding;
    let nearElement =
      pageX >= this.bounds.left - margin &&
      pageX <= this.bounds.right + margin &&
      pageY >= this.bounds.top - margin &&
      pageY <= this.bounds.bottom + margin;

    if (nearElement) {
      this.mouse.inRange = true;
      this.wake();
    } else if (this.mouse.inRange) {
      this.mouse.inRange = false;
      this.wake();
    }
  }

  onPointerLeave() {
    this.mouse.clientX = null;
    this.mouse.clientY = null;
    if (this.mouse.inRange) {
      this.mouse.inRange = false;
      this.wake();
    }
  }

  onResize() {
    let {
      minWeight,
      maxWeight,
      axis,
      lockWidth,
      widthPadding
    } = this.options;

    if (lockWidth) {
      this.spans.forEach((span) => {
        span.style.width = "";
        span.style.fontVariationSettings = `"${axis}" ${maxWeight}`;
      });

      this.spans.forEach((span, i) => {
        let rect = span.getBoundingClientRect();
        span.style.width = `${rect.width + widthPadding}px`;
        span.style.fontVariationSettings = `"${axis}" ${this.charMetrics[i].currentWeight.toFixed(1)}`;
      });
    }

    let scrollX = window.scrollX || window.pageXOffset || 0;
    let scrollY = window.scrollY || window.pageYOffset || 0;

    let minLeft = Infinity;
    let maxRight = -Infinity;
    let minTop = Infinity;
    let maxBottom = -Infinity;

    this.spans.forEach((span, i) => {
      let rect = span.getBoundingClientRect();
      let left = rect.left + scrollX;
      let right = rect.right + scrollX;
      let top = rect.top + scrollY;
      let bottom = rect.bottom + scrollY;

      this.charMetrics[i].x = left + rect.width / 2;
      this.charMetrics[i].y = top + rect.height / 2;

      if (left < minLeft) { minLeft = left; };
      if (right > maxRight) { maxRight = right; };
      if (top < minTop) { minTop = top; };
      if (bottom > maxBottom) { maxBottom = bottom; };
    });

    this.bounds = this.spans.length
      ? { left: minLeft, right: maxRight, top: minTop, bottom: maxBottom }
      : { left: 0, right: 0, top: 0, bottom: 0 };

    if (!lockWidth || this.charMetrics[0]?.currentWeight === minWeight) {
      this.spans.forEach((span, i) => {
        let w = lockWidth ? minWeight : this.charMetrics[i].currentWeight;
        span.style.fontVariationSettings = `"${axis}" ${Number(w).toFixed(1)}`;
      });
    }
  }

  onScroll() {
    if (this.mouse.clientX === null || this.mouse.clientY === null) {
      return;
    };
    let pageX = this.mouse.clientX + (window.scrollX || window.pageXOffset || 0);
    let pageY = this.mouse.clientY + (window.scrollY || window.pageYOffset || 0);
    this.onPointerMove(pageX, pageY, { fromScroll: true });
  }

  wake() {
    if (this.rafId === null) {
      this.rafId = requestAnimationFrame((now) => this.animate(now));
    }
  }

  animate(now = performance.now()) {
    let {
      minWeight,
      maxWeight,
      radius,
      smoothing,
      settleEpsilon,
      axis
    } = this.options;
    let count = this.charMetrics.length;
    let stillAnimating = false;

    let waveCenterIndex = -Infinity;
    if (this.waveState.active == true && count > 0) {
      let elapsed = now - this.waveState.startTime;
      let progress = elapsed / this.waveState.duration;

      if (progress >= 1) {
        this.waveState.active = false;
      } else {
        // Sweep slightly past the end so the tail clears the last character cleanly
        let spanReach = count - 1 + this.waveState.spread * 2;
        waveCenterIndex = progress * spanReach - this.waveState.spread;
        stillAnimating = true;
      }
    }

    for (let i = 0; i < count; i++) {
      let metric = this.charMetrics[i];
      let pointerWeight = minWeight;
      let waveWeight = minWeight;

      if (this.mouse.inRange) {
        let dx = this.mouse.x - metric.x;
        let dy = this.mouse.y - metric.y;
        let distance = Math.hypot(dx, dy);

        if (distance < radius) {
          let normalized = 1 - distance / radius;
          let ease = (1 - Math.cos(normalized * Math.PI)) / 2;
          pointerWeight = minWeight + (maxWeight - minWeight) * ease;
        }
      }

      if (this.waveState.active) {
        let distFromWave = Math.abs(i - waveCenterIndex);
        if (distFromWave < this.waveState.spread) {
          let normWave = 1 - distFromWave / this.waveState.spread;
          let waveEase = (1 - Math.cos(normWave * Math.PI)) / 2;
          waveWeight = minWeight + (this.waveState.peakWeight - minWeight) * waveEase;
        }
      }

      metric.targetWeight = Math.max(pointerWeight, waveWeight);

      let delta = metric.targetWeight - metric.currentWeight;
      if (Math.abs(delta) > settleEpsilon) {
        metric.currentWeight += delta * smoothing;
        stillAnimating = true;
      } else if (metric.currentWeight !== metric.targetWeight) {
        metric.currentWeight = metric.targetWeight;
        if (metric.currentWeight !== minWeight) {
          stillAnimating = true;
        }
      }

      this.spans[i].style.fontVariationSettings = `"${axis}" ${metric.currentWeight.toFixed(1)}`;
    }

    if (stillAnimating == true || this.mouse.inRange == true || this.waveState.active == true) {
      this.rafId = requestAnimationFrame((ts) => this.animate(ts));
    } else {
      this.rafId = null;
    }
  }
}

export class VariableFontWeightWave {
  /**
   * @param {Object} pipeline - Pipeline exposing subscribe(eventName, handler)
   * @param {Object} [events] - Map of pipeline event names if different from defaults
   */
  constructor(pipeline) {
    if (pipeline == null || typeof pipeline.subscribe != "function") {
      throw new Error("A pipeline with a subscribe() method is required.");
    }

    this.pipeline = pipeline;

    this.items = new Set();

    this.pipeline.subscribe(null, "pointermove", ({ event }) => {
      this.pointerMove(event.pageX, event.pageY);
    });
    this.pipeline.subscribe(null, "pointerleave", () => {
      this.pointerLeave();
    });
    this.pipeline.subscribe(null, "resize", () => {
      this.resize();
    });
    this.pipeline.subscribe(null, "scroll", () => {
      this.scroll();
    });

    if (document.fonts != null && document.fonts.ready != null) {
      document.fonts.ready.then(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            this.resize();
          });
        });
      });
    }
  }

  add(target, text, options = {}) {
    let instance = new VariableWeightWave(target, text, options);
    this.items.add(instance);
    return instance;
  }

  remove(instance) {
    if (instance.rafId !== null) {
      cancelAnimationFrame(instance.rafId);
      instance.rafId = null;
    }
    this.items.delete(instance);
  }

  doWaveAll(waveOptions) {
    this.items.forEach((item) => item.doWave(waveOptions));
  }

  pointerMove(pageX, pageY) {
    this.items.forEach((item) => item.onPointerMove(pageX, pageY));
  }

  pointerLeave() {
    this.items.forEach((item) => item.onPointerLeave());
  }

  resize() {
    this.items.forEach((item) => item.onResize());
  }

  scroll() {
    this.items.forEach((item) => item.onScroll());
  }
}