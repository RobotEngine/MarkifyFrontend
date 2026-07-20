import { getEpoch } from "@/crucial";

import plusIcon from "@assets/lesson/navigation/plus.svg?raw";
import minusIcon from "@assets/lesson/navigation/minus.svg?raw";
import playIcon from "./icons/play.svg?raw";
import pauseIcon from "./icons/pause.svg?raw";
import resetIcon from "./icons/reset.svg?raw";

export class Widget {
  WIDTH = 250;
  HEIGHT = 250;

  OPTIONS = {
    RESIZE_PRESERVE_ASPECT: true,
    RESIZE: false,
    MIN_WIDTH: 250,
    MIN_HEIGHT: 250
  };

  html = `<div class="eWidgetTimer">
    <div class="eWidgetTimerRing">
      <svg viewBox="0 0 300 300"><circle class="eWidgetTimerRingProgress" cx="150" cy="150" r="134" fill="none" stroke="var(--secondary)" stroke-width="16" stroke-linecap="round"></circle></svg>
    </div>
    <div class="eWidgetTimerTop">
      <button class="eWidgetTimerBtn eWidgetTimerMinus">${minusIcon}</button>
      <span class="eWidgetTimerStepText">1 min</span>
      <button class="eWidgetTimerBtn eWidgetTimerPlus">${plusIcon}</button>
    </div>
    <div class="eWidgetTimerDisplay">
      <div class="eWidgetTimerInputGroup">
        <input type="text" class="eWidgetTimerInput eWidgetTimerMins" value="05" maxlength="2" />
        <span class="eWidgetTimerColon">:</span>
        <input type="text" class="eWidgetTimerInput eWidgetTimerSecs" value="00" maxlength="2" />
      </div>
    </div>
    <div class="eWidgetTimerBottom">
      <button class="eWidgetTimerPlayBtn">
        ${playIcon}
        ${pauseIcon}
      </button>
      <button class="eWidgetTimerResetBtn">${resetIcon}</button>
    </div>
  </div>`;

  css = {
    ".eWidgetTimer": `position: relative; box-sizing: border-box; display: flex; flex-direction: column; width: 100%; height: 100%; padding: 50px 0; justify-content: space-around; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 50%; pointer-events: all !important; transition: .4s`,

    ".eWidgetTimerRing": `position: absolute; width: 100%; height: 100%; left: 0; top: 0; pointer-events: none; z-index: 0`,
    ".eWidgetTimerRing:before": `content: ""; position: absolute; width: 96.8%; height: 96.8%; left: 50%; top: 50%; transform: translate(-50%, -50%); border-radius: 50%; box-shadow: inset var(--lightShadow)`,
    ".eWidgetTimerRing:after": `content: ""; position: absolute; width: 81.6%; height: 81.6%; left: 50%; top: 50%; transform: translate(-50%, -50%); border-radius: 50%; box-shadow: var(--lightShadow)`,
    ".eWidgetTimerRing svg": `width: 100%; height: 100%; transform: rotate(-90deg)`,

    ".eWidgetTimerTop": `display: flex; padding: 4px; align-items: center; background: var(--pageColor); box-shadow: inset var(--lightShadow); border-radius: 16px; z-index: 1`,
    ".eWidgetTimerBtn": `display: flex; width: 24px; height: 24px; padding: 0; align-items: center; justify-content: center; border-radius: 12px; transition: .2s`,
    ".eWidgetTimerBtn:hover": `background: var(--hover); transform: scale(1.1)`,
    ".eWidgetTimerBtn:active": `transform: scale(1.05)`,
    ".eWidgetTimerBtn svg": `width: 18px; height: 18px`,
    ".eWidgetTimerStepText": `margin: 0 6px; font-size: 14px; font-weight: 600`,

    ".eWidgetTimerDisplay": `display: flex; flex-direction: column; width: 100%; align-items: center; z-index: 1`,
    ".eWidgetTimerInputGroup": `display: flex; align-items: center; justify-content: center; font-size: 50px; font-weight: 700; letter-spacing: 2px; pointer-events: auto`,
    ".eWidgetTimerInput": `display: inline-block; width: 76px; padding: 0; margin: 0; background: transparent; border: none; outline: none; text-align: center; font-size: inherit; font-weight: inherit; font-family: inherit; letter-spacing: inherit; transition: .4s`,
    ".eWidgetTimerMins": `text-align: right`,
    ".eWidgetTimerSecs": `text-align: left`,
    ".eWidgetTimerInput:focus": `color: var(--theme)`,
    ".eWidgetTimerColon": `display: inline-block; padding-bottom: 8px; margin: 4px; transition: color .3s`,

    ".eWidgetTimerBottom": `display: flex; align-items: center; gap: 16px; z-index: 1`,
    ".eWidgetTimerPlayBtn": `display: flex; width: 48px; height: 48px; border-radius: 50%; background: var(--theme); box-shadow: var(--lightShadow); align-items: center; justify-content: center; transition: .2s`,
    ".eWidgetTimerPlayBtn:hover": `transform: scale(1.1)`,
    ".eWidgetTimerPlayBtn:active": `transform: scale(1.05)`,
    ".eWidgetTimerPlayBtn svg": `width: 28px; height: 28px`,

    ".eWidgetTimerResetBtn": `display: flex; width: 40px; height: 40px; border-radius: 50%; box-shadow: var(--lightShadow); align-items: center; justify-content: center`,
    ".eWidgetTimerResetBtn svg": `width: 32px; height: 32px; transition: .2s`,
    ".eWidgetTimerResetBtn:hover svg": `transform: rotate(-30deg)`,

    "@keyframes widgetTimerEndPulse": `
      0% { transform: scale(1); box-shadow: var(--darkShadow) } 
      20% { transform: scale(1.12); box-shadow: 0 0 40px rgba(var(--redRGB), .5) } 
      100% { transform: scale(1); box-shadow: var(--darkShadow) }
    `,
    ".eWidgetTimer[ended]": `animation: widgetTimerEndPulse .6s cubic-bezier(.2, .8, .2, 1) 3`,
    ".eWidgetTimer[ended] .eWidgetTimerInput": `color: var(--error) !important`,
    ".eWidgetTimer[ended] .eWidgetTimerColon": `color: var(--error) !important`
  };

  DEFAULT_DURATION = 5 * 60 * 1000;
  animationFrame = null;
  circumference = 2 * Math.PI * 142;

  lastTickSecond = -1;
  hasEnded = false;

  prepareAudio() {
    if (this.audioCtx == null) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (this.audioCtx.state == "suspended") {
      this.audioCtx.resume();
    }
  }

  playTickSound() {
    if (this.audioCtx == null || this.audioCtx.state != "running") {
      return;
    }

    let osc = this.audioCtx.createOscillator();
    let gain = this.audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.audioCtx.currentTime + .05);

    gain.gain.setValueAtTime(.3, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, this.audioCtx.currentTime + .05);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + .06);
  }

  playAlarmSound() {
    if (this.audioCtx == null || this.audioCtx.state != "running") {
      return;
    }

    let now = this.audioCtx.currentTime;

    let playDigitalPluck = (freq, time, isLast) => {
      let osc = this.audioCtx.createOscillator();
      let gain = this.audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, time);

      let attackOsc = this.audioCtx.createOscillator();
      let attackGain = this.audioCtx.createGain();
      attackOsc.type = "triangle";
      attackOsc.frequency.setValueAtTime(freq * 2, time);

      let duration = isLast ? 2.5 : .4;

      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(.25, time + .02);
      gain.gain.exponentialRampToValueAtTime(.001, time + duration);

      attackGain.gain.setValueAtTime(0, time);
      attackGain.gain.linearRampToValueAtTime(.08, time + .01);
      attackGain.gain.exponentialRampToValueAtTime(.001, time + .1);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      attackOsc.connect(attackGain);
      attackGain.connect(this.audioCtx.destination);

      osc.start(time);
      osc.stop(time + duration + .1);

      attackOsc.start(time);
      attackOsc.stop(time + .2);

      if (isLast) {
        let bassOsc = this.audioCtx.createOscillator();
        let bassGain = this.audioCtx.createGain();

        bassOsc.type = "sine";
        bassOsc.frequency.setValueAtTime(146.83, time);

        bassGain.gain.setValueAtTime(0, time);
        bassGain.gain.linearRampToValueAtTime(.4, time + .05);
        bassGain.gain.exponentialRampToValueAtTime(.001, time + duration);

        bassOsc.connect(bassGain);
        bassGain.connect(this.audioCtx.destination);

        bassOsc.start(time);
        bassOsc.stop(time + duration + .1);
      }
    };

    playDigitalPluck(293.66, now, false);         
    playDigitalPluck(440.00, now + .15, false);  
    playDigitalPluck(659.25, now + .30, false);  
    playDigitalPluck(739.99, now + .50, true);   
  }

  clearEndState() {
    this.container.removeAttribute("ended");
    this.hasEnded = false;
    this.lastTickSecond = -1;
  }

  async js(frame) {
    this.container = frame.querySelector(".eWidgetTimer");
    this.minsInput = frame.querySelector(".eWidgetTimerMins");
    this.secsInput = frame.querySelector(".eWidgetTimerSecs");
    this.progressCircle = frame.querySelector(".eWidgetTimerRingProgress");

    this.btnMinus = frame.querySelector(".eWidgetTimerMinus");
    this.btnPlus = frame.querySelector(".eWidgetTimerPlus");
    this.btnPlay = frame.querySelector(".eWidgetTimerPlayBtn");
    this.btnReset = frame.querySelector(".eWidgetTimerResetBtn");

    this.iconPlay = this.btnPlay.querySelector("svg[play]");
    this.iconPause = this.btnPlay.querySelector("svg[pause]");

    this.progressCircle.style.strokeDasharray = this.circumference;
    this.progressCircle.style.strokeDashoffset = 0;

    if (this.preview == true) {
      return;
    }

    let setupInput = (inputEl) => {
      inputEl.addEventListener("pointerdown", (e) => {
        e.stopPropagation();
      });
      inputEl.addEventListener("pointerup", () => {
        inputEl.select();
      });
      inputEl.addEventListener("mousedown", (e) => {
        e.stopPropagation();
      });

      inputEl.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
      });

      inputEl.addEventListener("keydown", (e) => {
        if (e.key == "Enter") inputEl.blur();
      });

      inputEl.addEventListener("change", () => {
        this.clearEndState();

        let m = parseInt(this.minsInput.value || "0", 10);
        let s = parseInt(this.secsInput.value || "0", 10);

        m = Math.min(99, Math.max(0, m));
        s = Math.min(99, Math.max(0, s));

        let ms = (m * 60 + s) * 1000;

        this.minsInput.value = m.toString().padStart(2, "0");
        this.secsInput.value = s.toString().padStart(2, "0");

        this.editor.saveAnnotation({
          _id: this.parent.properties._id,
          duration: ms,
          originalDuration: ms,
          started: null
        });
      });
    };

    setupInput(this.minsInput);
    setupInput(this.secsInput);

    this.btnPlus.addEventListener("click", () => {
      this.clearEndState();
      let currentDuration = this.parent.properties.duration ?? this.DEFAULT_DURATION;
      let originalDuration = this.parent.properties.originalDuration ?? currentDuration;
      let started = this.parent.properties.started;

      // Calculate the real remaining time right now
      let elapsed = started != null ? (getEpoch() - started) : 0;
      let remainingMs = Math.max(0, currentDuration - elapsed);

      let payload = { _id: this.parent.properties._id };

      if (started != null && remainingMs == 0) {
        payload.started = getEpoch();
        payload.duration = 60 * 1000;
        payload.originalDuration = 60 * 1000;
      } else {
        payload.duration = currentDuration + (60 * 1000);
        payload.originalDuration = originalDuration + (60 * 1000);
      }
      
      this.editor.saveAnnotation(payload);
    });

    this.btnMinus.addEventListener("click", () => {
      this.clearEndState();
      let currentDuration = this.parent.properties.duration ?? this.DEFAULT_DURATION;
      let originalDuration = this.parent.properties.originalDuration ?? currentDuration;
      let started = this.parent.properties.started;

      let elapsed = started != null ? (getEpoch() - started) : 0;
      let remainingMs = Math.max(0, currentDuration - elapsed);

      let payload = { _id: this.parent.properties._id };

      if (started != null && remainingMs == 0) {
        payload.started = null;
        payload.duration = 60 * 1000;
        payload.originalDuration = 60 * 1000;
      } else {
        payload.duration = Math.max(60 * 1000, currentDuration - (60 * 1000));
        payload.originalDuration = Math.max(60 * 1000, originalDuration - (60 * 1000));
      }

      this.editor.saveAnnotation(payload);
    });

    this.btnPlay.addEventListener("click", () => {
      this.prepareAudio();
      let isPlaying = this.parent.properties.started != null;

      if (isPlaying == true) {
        let elapsed = getEpoch() - this.parent.properties.started;
        let currentDuration = this.parent.properties.duration ?? this.DEFAULT_DURATION;
        let remaining = Math.max(0, currentDuration - elapsed);

        if (remaining > 500) {
          this.editor.saveAnnotation({
            _id: this.parent.properties._id,
            started: null,
            duration: remaining
          });
        }
      } else {
        let original = this.parent.properties.originalDuration ?? this.parent.properties.duration ?? this.DEFAULT_DURATION;
        this.clearEndState();
          
        this.editor.saveAnnotation({
          _id: this.parent.properties._id,
          started: getEpoch(),
          originalDuration: original
        });
      }
    });

    this.btnReset.addEventListener("click", () => {
      this.clearEndState();
      this.editor.saveAnnotation({
        _id: this.parent.properties._id,
        started: null,
        duration: this.DEFAULT_DURATION,
        originalDuration: this.DEFAULT_DURATION
      });
    });
  }

  updateUI() {
    let duration = this.parent.properties.duration ?? this.DEFAULT_DURATION;
    let started = this.parent.properties.started;
    let remainingMs = duration;

    if (started != null) {
      // If the network 'started' timestamp is new, lock in a local reference
      if (this.networkStartSaved != started) {
        this.networkStartSaved = started;
        
        // Find out how long ago the server thinks it started, then translate that to local time
        let ageMs = getEpoch() - started; 
        this.localStartPerf = performance.now() - ageMs; 
      }

      // Calculate elapsed purely using the smooth, drift-free local performance timer
      let elapsed = performance.now() - this.localStartPerf;
      remainingMs = Math.max(0, duration - elapsed);
    } else {
      // Reset our local anchors when paused or stopped
      this.networkStartSaved = null;
      this.localStartPerf = null;
    }

    if (remainingMs > 0 && this.hasEnded == true) {
      this.clearEndState();
    }

    let totalSeconds = Math.round(remainingMs / 1000);

    if (started != null) {
      if (totalSeconds < 6 && totalSeconds > 0) {
        if (totalSeconds != this.lastTickSecond) {
          this.playTickSound();
          this.lastTickSecond = totalSeconds;
        }
      } else if (remainingMs <= 0 && this.hasEnded != true) {
        this.hasEnded = true;
        this.playAlarmSound();
        this.container.setAttribute("ended", "");
      }
    }

    if (document.activeElement != this.minsInput && document.activeElement != this.secsInput) {
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;

      minutes = Math.min(99, minutes);

      this.minsInput.value = minutes.toString().padStart(2, "0");
      this.secsInput.value = seconds.toString().padStart(2, "0");
    }

    let totalAssumedDuration = this.parent.properties.originalDuration ?? duration;
    if (totalAssumedDuration < remainingMs) totalAssumedDuration = remainingMs;

    let progressRatio = totalAssumedDuration > 0 ? (remainingMs / totalAssumedDuration) : 0;
    let dashOffset = this.circumference * (1 - progressRatio);
    this.progressCircle.style.strokeDashoffset = dashOffset;

    if (started != null && remainingMs > 0) {
      this.iconPlay.style.display = "none";
      this.iconPause.style.display = "block";
    } else {
      this.iconPlay.style.display = "block";
      this.iconPause.style.display = "none";
    }

    if (started != null && remainingMs > 0) {
      this.animationFrame = requestAnimationFrame(() => { this.updateUI(); });
    }
  }

  render() {
    if (this.animationFrame != null) {
      cancelAnimationFrame(this.animationFrame);
    }

    this.updateUI();
  }

  renderPreview() {
    this.iconPause.style.display = "none";
  }
}