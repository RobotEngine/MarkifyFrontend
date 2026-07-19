import { getEpoch, cleanString } from "@/crucial";

import { textColorBackground } from "../../../utils/text-color-background";

export class Widget {
  WIDTH = 300;
  HEIGHT = 300;

  OPTIONS = {
    RESIZE_PRESERVE_ASPECT: true,
  };

  html = `<div class="eWidgetSpinner">
    <div class="eWidgetSpinnerWheel">
      <svg class="eWidgetSpinnerWheelSvg" viewBox="0 0 440 440">
        <g class="eWidgetSpinnerWheelGroup"></g>
        <path d="M 440,198 L 416,217 Q 412,220 416,223 L 440,242 Z" fill="var(--pageColor)" stroke-linejoin="round" stroke-linecap="round"></path>
        <g class="eWidgetConfettiGroup"></g>
      </svg>
      <div class="eWidgetSpinnerWheelButtonHolder">
        <button class="eWidgetSpinnerWheelButton">SPIN</button>
      </div>
      <div class="eWidgetSpinnerWheelWinner" noselect>
        <div class="eWidgetSpinnerWheelWinnerText"></div>
      </div>
    </div>
  </div>`;
  css = {
    ".eWidgetSpinner": `display: flex; width: 100%; height: 100%; justify-content: center; align-items: center`,
    ".eWidgetSpinnerWheel": `position: relative; width: 100%; height: 100%; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 50%; pointer-events: all !important`,
    ".eWidgetSpinnerWheelSvg": `box-sizing: border-box; width: 100%; height: 100%; padding: 4px; overflow: visible !important; pointer-events: none; z-index: 1`,
    ".eWidgetSpinnerWheelGroup": `transform-origin: 50% 50%; transition: opacity .4s`, //; transition: transform 5s cubic-bezier(0.1, 0.8, 0.1, 1)
    ".eWidgetSpinnerWheel[spinning] .eWidgetSpinnerWheelGroup": `will-change: transform`,
    ".eWidgetSpinnerWheel[showwinner]:not([spinning]) .eWidgetSpinnerWheelGroup": `opacity: .5`,
    ".eWidgetSpinnerWheelButtonHolder": `position: absolute; width: 25%; height: 25%; padding: 4px; left: 50%; top: 50%; transform: translate(-50%, -50%); background: var(--pageColor); border-radius: 50%; z-index: 2`,
    ".eWidgetSpinnerWheelButton": `box-sizing: border-box; width: 100%; height: 100%; background: var(--pageColor); box-shadow: inset var(--lightShadow); border-radius: inherit; color: var(--theme); font-weight: 700; font-size: 18px; letter-spacing: 2px; white-space: nowrap; overflow: hidden; transition: .2s`,
    ".eWidgetSpinnerWheel[spinning] .eWidgetSpinnerWheelButton": `opacity: .5 !important; pointer-events: none !important`,
    ".eWidgetSpinnerWheelButton:hover": `box-shadow: inset var(--darkShadow); transform: scale(1.2)`,
    ".eWidgetSpinnerWheelButton:active": `transform: scale(1.12)`,
    ".eWidgetSpinnerWheelWinner": `position: absolute; box-sizing: border-box; display: flex; width: 100%; height: 100%; left: 0px; top: 0px; padding: 8px; justify-content: center; align-items: center; pointer-events: none; z-index: 3`,
    ".eWidgetSpinnerWheel[showwinner]:not([spinning]) .eWidgetSpinnerWheelWinner": `pointer-events: all`,
    ".eWidgetSpinnerWheelWinnerText": `box-sizing: border-box; flex: 1; max-width: fit-content; padding: 6px 14px; transform: scale(.5); background: var(--pageColor); border: solid 4px var(--pageColor); box-shadow: var(--darkShadow); border-radius: 28px; opacity: 0; font-size: 24px; line-height: 1.5; transition: .4s`,
    ".eWidgetSpinnerWheel[showwinner]:not([spinning]) .eWidgetSpinnerWheelWinnerText": `transform: scale(1); opacity: 1`
  };

  cx = 220;
  cy = 220;
  r = 220;

  members = {};

  currentMembers = [];
  wheelUpToDate = true;

  getCoordinatesForPercent(percent) {
    return [
      this.cx + this.r * Math.cos(2 * Math.PI * percent),
      this.cy + this.r * Math.sin(2 * Math.PI * percent)
    ];
  }
  
  createWheel(names) {
    if (this.spinning == true) {
      this.wheelUpToDate = false;
      return;
    }

    if ((names ?? []).length < 1) {
      return;
    }

    while (names.length < 4) {
      names = [...names, ...names];
    }

    names.sort((a, b) => {
      return (a.name + (a.color ?? "")).localeCompare(b.name + (b.color ?? ""));
    });

    this.currentMembers = names;
    
    this.wheelGroup.innerHTML = "";

    let slicePercent = 1 / names.length;
    let accumulatedPercent = 0;

    // --- DYNAMIC SCALING MATH ---
    let sliceAngleRad = (2 * Math.PI) / names.length;
    let textRadius = this.r * 0.5; 
    let availableWidth = names.length == 1 ? 60 : 2 * textRadius * Math.sin(sliceAngleRad / 2);    
    let dynamicFontSize = Math.max(12, Math.min(24, availableWidth * 0.4));

    // Available radial length for text before hitting the center hole (~160 SVG pixels):
    let maxAvailableLength = this.r - 80; 
    
    // Estimate average character width based on bold font size (approx 60% of font size):
    let avgCharWidth = dynamicFontSize * .6;
    let maxCharsAllowed = Math.floor(maxAvailableLength / avgCharWidth);
    // ---------------------------

    let buffer = [];
    for (let i = 0; i < names.length; i++) {
      let { name, color } = names[i] ?? {};

      // If the name is too long for the slice depth, slice it and add an ellipsis:
      if (name.length > maxCharsAllowed && maxCharsAllowed > 3) {
        name = name.substring(0, maxCharsAllowed - 3) + "...";
      }

      let [startX, startY] = this.getCoordinatesForPercent(accumulatedPercent);
      accumulatedPercent += slicePercent;
      let [endX, endY] = this.getCoordinatesForPercent(accumulatedPercent);

      let pathData
      ;
      if (names.length > 1) { // If there's more than 1 item, draw a standard wedge slice:
        let largeArcFlag = slicePercent > 0.5 ? 1 : 0;
        pathData = `
          M ${this.cx} ${this.cy}
          L ${startX} ${startY}
          A ${this.r} ${this.r} 0 ${largeArcFlag} 1 ${endX} ${endY}
          Z
        `;
      } else { // Otherwise, draw a full circle using two 180-degree SVG arcs:
        pathData = `
          M ${this.cx - this.r} ${this.cy}
          A ${this.r} ${this.r} 0 1 0 ${this.cx + this.r} ${this.cy}
          A ${this.r} ${this.r} 0 1 0 ${this.cx - this.r} ${this.cy}
          Z
        `;
      }

      let angleInDegrees = names.length == 1 ? 0 : (accumulatedPercent - (slicePercent / 2)) * 360;

      buffer.push(`
        <path d="${pathData}" fill="${color}" opacity=".5" stroke="var(--pageColor)" stroke-width="4"></path>
        <text x="${this.cx + this.r - 36}" 
          y="${this.cy + (dynamicFontSize * 0.35)}" 
          transform="rotate(${angleInDegrees}, ${this.cx}, ${this.cy})" 
          text-anchor="end" 
          fill="var(--textColor)" 
          font-weight="600" 
          font-size="${dynamicFontSize}px">${cleanString(name)}</text>
      `);
    }

    this.wheelGroup.insertAdjacentHTML("beforeend", buffer.join(""));

    this.wheelUpToDate = true;
  }

  prepareAudio() { // Create a procedural browser audio context so you don't need external asset files:
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  playTickSound() {
    if (this.audioCtx == null || this.audioCtx.state != "running") {
      return;
    }

    // Fast procedural synthetic high-pitched wooden click sound
    let osc = this.audioCtx.createOscillator();
    let gain = this.audioCtx.createGain();
    
    osc.type = "triangle";
    osc.frequency.setValueAtTime(1200, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.audioCtx.currentTime + 0.04);
    
    gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.04);
    
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.05);
  }

  playWinSound() {
    if (this.audioCtx == null || this.audioCtx.state != "running") {
      return;
    }

    let now = this.audioCtx.currentTime;

    // ==========================================
    // 1. THE TACTILE POPOP THUMP & SHOWER
    // ==========================================
    // Low-pass filtered thump for the popper bursting
    let popOsc = this.audioCtx.createOscillator();
    let popGain = this.audioCtx.createGain();
    let popFilter = this.audioCtx.createBiquadFilter();

    popOsc.type = "triangle";
    popOsc.frequency.setValueAtTime(400, now);
    popOsc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

    popFilter.type = "lowpass";
    popFilter.frequency.setValueAtTime(800, now);

    popGain.gain.setValueAtTime(0.3, now); // Blended slightly down to make room for notes
    popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    popOsc.connect(popFilter);
    popFilter.connect(popGain);
    popGain.connect(this.audioCtx.destination);

    popOsc.start(now);
    popOsc.stop(now + 0.12);

    // Procedural white noise for the fluttering paper confetti shower
    let bufferSize = this.audioCtx.sampleRate * 1.5;
    let noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    let outputChannel = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      outputChannel[i] = Math.random() * 2 - 1;
    }

    let noiseNode = this.audioCtx.createBufferSource();
    noiseNode.buffer = noiseBuffer;

    let noiseFilter = this.audioCtx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(3500, now); 
    noiseFilter.frequency.exponentialRampToValueAtTime(1200, now + 1.2);

    let noiseGain = this.audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.12, now); 
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4); 

    noiseNode.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.audioCtx.destination);

    noiseNode.start(now);
    noiseNode.stop(now + 1.5);

    // ==========================================
    // 2. THE CELEBRATORY ARCADE ARPEGGIO
    // ==========================================
    // Staggered major arpeggio (C4 -> E4 -> G4 -> C5) layering over the hiss
    let notes = [261.63, 329.63, 392.00, 523.25]; 
    let noteDurations = [0.08, 0.08, 0.08, 0.5]; // Slightly faster stagger to feel urgent and energetic
    let timeOffset = 0;

    notes.forEach((freq, index) => {
      let osc = this.audioCtx.createOscillator();
      let gain = this.audioCtx.createGain();
      
      // Use a clean sine wave for the celebratory notes so they cut through the white noise perfectly
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + timeOffset);
      
      if (index === notes.length - 1) {
        // High winning note vibrato effect
        osc.frequency.exponentialRampToValueAtTime(freq * 1.05, now + timeOffset + noteDurations[index]);
      }

      gain.gain.setValueAtTime(0, now + timeOffset);
      gain.gain.linearRampToValueAtTime(0.15, now + timeOffset + 0.01); 
      gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + noteDurations[index]);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      
      osc.start(now + timeOffset);
      osc.stop(now + timeOffset + noteDurations[index]);
      
      timeOffset += noteDurations[index] - 0.02;
    });
  }

  setWinnerText() {
    let winner = this.parent.properties.winner;
    if (winner == null) {
      return;
    }
    let winnerText = this.winnerContent.querySelector(".eWidgetSpinnerWheelWinnerText");
    winnerText.innerHTML = "<b></b> Won!";
    let nameText = winnerText.querySelector("b");
    nameText.textContent = winner[1];
    let color = winner[2];
    if (color != null) {
      winnerText.style.background = winner[2];
      winnerText.style.color = textColorBackground(color);
    }
  }

  triggerConfetti() {
    let colors = ["#3b82f6", "#ef4444", "#eab308", "#22c55e", "#a855f7", "#ff70a6", "#ff9770", "#ffd670", "#e9ff70", "#70d6ff"];
    let particleCount = 100; 
    let originX = 220;
    let originY = 220;

    let htmlBuffer = [];
    let physicsSpecs = [];

    for (let i = 0; i < particleCount; i++) {
      let size = (Math.random() * 10) + 6; 
      let color = colors[Math.floor(Math.random() * colors.length)];
      
      htmlBuffer.push(`
        <rect class="confetti-p" 
          width="${size}" 
          height="${size}" 
          fill="${color}" 
          opacity="1" 
          transform="translate(${originX}, ${originY})">
        </rect>
      `);

      let isLeft = i % 2 == 0;
      let minAngle = isLeft ? 195 : 285;
      let maxAngle = isLeft ? 255 : 345;
      
      let angleRad = ((Math.random() * (maxAngle - minAngle)) + minAngle) * Math.PI / 180;
      let speed = (Math.random() * 5) + 8;

      physicsSpecs.push({
        x: originX,
        y: originY,
        vx: Math.cos(angleRad) * speed,
        vy: Math.sin(angleRad) * speed,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 5,
        drag: 0.975
      });
    }

    this.confettiGroup.insertAdjacentHTML("beforeend", htmlBuffer.join(""));

    let DOMElements = this.confettiGroup.querySelectorAll(".confetti-p");
    let particles = physicsSpecs.map((spec, index) => ({
      ...spec,
      element: DOMElements[index]
    }));

    // The boundary y-coordinate where fade out initiates
    let fadeStartBound = 500;
    // The distance past the boundary a particle has to travel to reach 0 opacity
    let fadeZoneHeight = 200;

    // Track the timestamp of the last executed frame
    let lastTime;

    let animateSVGConfetti = (currentTimeMs) => {
      if (lastTime == null) {
        lastTime = currentTimeMs;
      }

      // Calculate time passed since last frame. Target is 60fps (~16.67ms per frame)
      // If dt = 1.0, the app is running at a perfect 60fps. If throttled to 30fps, dt = 2.0.
      let elapsed = currentTimeMs - lastTime;
      let dt = elapsed > 0 ? Math.min(elapsed / 16.667, 4) : 1; // Cap dt at 4 to prevent massive teleportation jumps during heavy lag spikes
      lastTime = currentTimeMs;

      let activeParticles = false;

      particles.forEach(p => {
        // Scale movement, gravity, and rotation updates directly by delta time multiplier
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 0.2 * dt;     
        p.rotation += p.rotationSpeed * dt;
        
        // Exponential decay for air resistance drag handling across varying frame durations
        p.vx *= Math.pow(p.drag, dt);

        // Spatial Opacity Calculation
        let currentOpacity = 1;
        if (p.y > fadeStartBound) {
          // Linear decrease based entirely on how deep it is into the fade zone
          let distanceIntoZone = p.y - fadeStartBound;
          currentOpacity = 1 - (distanceIntoZone / fadeZoneHeight);
        }

        // Keep running as long as it hasn't faded out completely or drifted completely wild horizontally
        if (currentOpacity > 0 && p.x > -200 && p.x < 640) {
          activeParticles = true;
          
          p.element.setAttribute(
            "transform", 
            `translate(${p.x}, ${p.y}) rotate(${p.rotation}) scale(${currentOpacity})`
          );
          p.element.setAttribute("opacity", currentOpacity.toFixed(3));
        } else if (p.element.style.display !== "none") {
          p.element.style.display = "none";
        }
      });

      if (activeParticles) {
        requestAnimationFrame(animateSVGConfetti);
      } else {
        this.confettiGroup.innerHTML = "";
      }
    };

    animateSVGConfetti();
  }

  spinWheel(winner, startTimestamp, duration) {
    /*if (this.spinning == true) {
      return;
    }*/
    this.spinning = true;

    this.wheel.setAttribute("spinning", "");

    let [winnerIndex, winnerName, winnerColor] = winner;

    let numSlices = this.currentMembers.length;
    let sliceAngle = 360 / numSlices;
    
    // Base target: spin around 5 times completely
    let baseRotations = 360 * 5; 
    
    // In your SVG layout, slices append clockwise starting from 0 deg (right side where arrow is).
    // To position a slice directly under the right arrow, we calculate its midpoint:
    let winnerMidAngle = numSlices > 1 ? (Math.min(winnerIndex, numSlices) * sliceAngle) + (sliceAngle / 2) : 0;
    
    // Spin counter-clockwise to bring names to the right-hand arrow indicator
    let targetRotation = baseRotations + (360 - winnerMidAngle);
    
    // Track audio ticks across frames
    let lastSliceIndex = -1;

    let animStartTime = null;

    let animate = (currentTimeMs) => {
      if (startTimestamp != this.parent.properties.started) {
        return;
      }
      if (this.parent.element == null) {
        this.spinning = false;
        return;
      }

      if (getEpoch() < startTimestamp) { // Waiting for synchronized network countdown:
        return requestAnimationFrame(animate);
      }

      // Initialize our high-res timer on the very first frame the wheel actually moves
      if (animStartTime === null) {
        animStartTime = currentTimeMs;
      }

      let elapsed = currentTimeMs - animStartTime;
      let t = Math.min(elapsed / duration, 1);

      // --- SATISFYING PHYSICS MATH ---
      // 1. Core Cubic Ease Out Deceleration
      let ease = 1 - Math.pow(1 - t, 3);
      let currentRotation = targetRotation * ease;

      // 2. Elastic Snap Back Framework (during the final 12% of the timeline)
      if (t > 0.88) {
        let correctionProgress = (t - 0.88) / 0.12; // 0 to 1
        // Subtle sine wave that creates an intentional overshoot and elastic settling pull
        let bounce = Math.sin(correctionProgress * Math.PI) * (sliceAngle * 0.2); 
        currentRotation += bounce * (1 - correctionProgress);
      }

      // Apply the raw transformation to the DOM group
      this.wheelGroup.style.transform = `rotate(${currentRotation}deg)`;

      // --- REAL-TIME TICK AUDIO TRIGGER ---
      // Figure out what slice index is currently hitting the 0-degree point pointer
      let pointerNormalizedAngle = (360 - (currentRotation % 360)) % 360;
      let currentSliceIndex = Math.floor(pointerNormalizedAngle / sliceAngle);

      if (currentSliceIndex !== lastSliceIndex && t < 0.98) {
        this.playTickSound();
        lastSliceIndex = currentSliceIndex;
      }

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensure exact target alignment precision at finish line
        this.wheelGroup.style.transform = `rotate(${360 - winnerMidAngle}deg)`;

        this.setWinnerText();

        this.triggerConfetti();
        this.playWinSound();

        this.wheel.removeAttribute("spinning");
        this.spinning = false;

        if (this.wheelUpToDate == false) {
          this.createWheel(Object.values(this.members));
        }
      }
    };

    requestAnimationFrame(animate);
  }

  updateSpinButton() {
    if (this.editor.utils.canMemberModify(this.parent.properties) == false) {
      this.spinButton.setAttribute("disabled", "");
      this.winnerContent.style.pointerEvents = "none";
    } else {
      this.spinButton.removeAttribute("disabled");
      this.winnerContent.style.removeProperty("pointer-events");
    }
  }

  async js(frame) {
    this.wheel = frame.querySelector(".eWidgetSpinnerWheel");
    this.wheelGroup = this.wheel.querySelector(".eWidgetSpinnerWheelGroup");
    this.confettiGroup = this.wheel.querySelector(".eWidgetConfettiGroup");
    this.spinButton = this.wheel.querySelector(".eWidgetSpinnerWheelButton");
    this.winnerContent = this.wheel.querySelector(".eWidgetSpinnerWheelWinner");

    if (this.preview == true) {
      return;
    }

    this.lastRunTimestamp = this.parent.properties.started ?? this.parent.properties.sync;
    
    this.spinButton.addEventListener("click", () => {
      if (this.spinning == true) {
        return;
      }

      let winnerIndex = Math.floor(Math.random() * this.currentMembers.length);
      let winnerMember = this.currentMembers[winnerIndex] ?? {};
      let winner = [winnerIndex, winnerMember.name, winnerMember.color];
      let started = getEpoch(); 
      let duration = 6000; // 6 seconds of spinning

      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }

      this.editor.saveAnnotation({ _id: this.parent.properties._id, winner, started, duration }, { saveImmediately: true });
    });
    this.updateSpinButton();

    this.winnerContent.addEventListener("click", (event) => {
      this.editor.saveAnnotation({ _id: this.parent.properties._id, winner: null }, { saveImmediately: true });
    });

    this.prepareAudio();

    this.parent.subscribe("join", (data) => {
      let member = this.members[data.modify];
      if (member == null) {
        this.members[data.modify] = { sessions: [] };
        member = this.members[data.modify];
      }
      if (member.sessions.includes(data._id) == false) {
        member.sessions.push(data._id);
      }
      member.name = data.name;
      member.color = data.color;
      this.createWheel(Object.values(this.members));
    });
    this.parent.subscribe("update", (data) => {
      let member = this.editor.lesson.members[data._id];
      if (member == null) {
        return;
      }
      let updateWheel = false;
      if (data.hasOwnProperty("name") == true) {
        member.name = data.name;
        updateWheel = true;
      }
      if (data.hasOwnProperty("color") == true) {
        member.color = data.color;
        updateWheel = true;
      }
      if (updateWheel == true) {
        this.createWheel(Object.values(this.members));
      }
      if (this.editor.self._id == data._id && data.hasOwnProperty("access") == true) {
        this.updateSpinButton();
      }
    });
    this.parent.subscribe("leave", (data) => {
      if (data.member != null) {
        let member = this.members[data.member.modify];
        if (member != null) {
          let index = member.sessions.indexOf(data.member._id);
          if (index > -1) {
            member.sessions.splice(index, 1);
          }
          if (member.sessions.length < 1) {
            delete this.members[data.member.modify];
            this.createWheel(Object.values(this.members));
          }
        }
      }
    });
    this.parent.subscribe("set", (data) => {
      if (data.hasOwnProperty("settings") == true) {
        this.updateSpinButton();
      }
    });

    let memberKeys = Object.keys(this.editor.lesson.members);
    for (let i = 0; i < memberKeys.length; i++) {
      let memberID = memberKeys[i];
      let lessonMember = this.editor.lesson.members[memberID];
      let member = this.members[lessonMember.modify];
      if (member == null) {
        this.members[lessonMember.modify] = { sessions: [] };
        member = this.members[lessonMember.modify];
      }
      member.sessions.push(memberID);
      let collaborator = this.editor.lesson.collaborators[lessonMember.modify] ?? lessonMember;
      member.name = collaborator.name;
      member.color = collaborator.color;
    }
    this.createWheel(Object.values(this.members));
  }

  render() {
    let winner = this.parent.properties.winner;
    if (winner == null) {
      this.wheel.removeAttribute("showwinner");
    } else {
      this.setWinnerText();
      this.wheel.setAttribute("showwinner", "");
    }

    let lastStarted = this.parent.properties.started ?? this.parent.properties.sync;
    if (this.lastRunTimestamp < lastStarted) {
      this.lastRunTimestamp = lastStarted;
      if (winner != null) {
        this.spinWheel(winner, lastStarted, this.parent.properties.duration ?? 6000);
      }
    }

    this.updateSpinButton();
  }

  renderPreview() {
    this.createWheel([
      { name: "Bob", color: "var(--blue)" },
      { name: "Emma", color: "var(--red)" },
      { name: "Jacob", color: "var(--yellow)" },
      { name: "Nathan", color: "var(--green)" },
      { name: "Olivia", color: "var(--purple)" }
    ]);
  }
}