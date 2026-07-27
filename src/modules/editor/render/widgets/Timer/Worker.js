import { BaseWorker } from "../../BaseWorker";

import { getEpoch } from "@/crucial";

export class Worker extends BaseWorker {
  static NAME = "widget/timer";

  DEFAULT_DURATION = 5 * 60 * 1000;

  activeTimers = {};

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

  renderTimers() {
    let running = false;
    let timers = {};

    let lowestTime;
    let lowestTimer;

    let activeTimerKeys = Object.keys(this.activeTimers);
    for (let i = 0; i < activeTimerKeys.length; i++) {
      let id = activeTimerKeys[i];
      let timer = this.activeTimers[id];
      let annotation = timer.annotation;

      if (annotation.render.remove == true) {
        continue;
      }

      let duration = annotation.render.duration ?? this.DEFAULT_DURATION;
      let started = annotation.render.started;

      if (started == null) {
        continue;
      }

      if (timer.networkStartSaved != started) {
        timer.networkStartSaved = started;
        
        let ageMs = getEpoch() - started; 
        timer.localStartPerf = performance.now() - ageMs;
      }

      let elapsed = performance.now() - timer.localStartPerf;
      timer.remainingMs = duration - elapsed;
      if (timer.remainingMs > 0 && timer.hasEnded != false) {
        timer.hasEnded = false;
        timer.lastTickSecond = -1;
      }

      if (timer.remainingMs < lowestTime || lowestTime == null) {
        lowestTime = timer.remainingMs;
        lowestTimer = timer;
      }

      if (annotation.component != null && annotation.component.widgetModule != null) {
        annotation.component.widgetModule.updateUI();
      }

      if (started != null && timer.hasEnded == false) {
        let totalSeconds = Math.round(timer.remainingMs / 1000);
        if (totalSeconds < 6 && totalSeconds > 0) {
          if (totalSeconds != timer.lastTickSecond) {
            this.playTickSound();
            timer.lastTickSecond = totalSeconds;
          }
        } else if (timer.remainingMs <= 0 && timer.hasEnded != true) {
          timer.hasEnded = true;
          this.playAlarmSound();
        }
      }

      timers[id] = timer;
      running = true;
    }

    if (running == true) {
      this.activeTimers = timers;

      if (lowestTimer != null && this.canAddWidgetButton() != false) {
        if (this.timerButton == null) {
          this.timerButton = this.addWidgetButton("active_timers");
          this.timerButton.style.letterSpacing = "2px";
          this.timerButton.style.background = "unset";
          this.timerButton.style.boxShadow = "inset 0px 0px 8px 0px rgba(var(--themeRGB), .5)";
          this.timerButton.addEventListener("click", () => {
            let timerID = this.timerButton.getAttribute("timer");
            if (timerID != null) {
              this.editor.utils.scrollToAnnotation(lowestTimer.annotation.render);
            }
          });
        }
        this.timerButton.setAttribute("timer", lowestTimer.annotation.render._id);
        let totalSeconds = Math.max(Math.round(lowestTimer.remainingMs / 1000), 0);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        this.timerButton.textContent = minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
        if (totalSeconds > 5) {
          this.timerButton.style.removeProperty("color");
          this.timerButton.style.boxShadow = "inset 0px 0px 8px 0px rgba(var(--themeRGB), .5)";
        } else {
          this.timerButton.style.color = "var(--red)";
          this.timerButton.style.boxShadow = "inset 0px 0px 8px 0px rgba(var(--redRGB), .5)";
        }
      }

      this.animationFrame = requestAnimationFrame(() => { this.renderTimers(); });
    } else {
      if (this.timerButton != null) {
        this.removeWidgetButton("active_timers");
        this.timerButton = null;
      }

      this.animationFrame = null;
    }
  }
  handleTimer(annotation) {
    let render = annotation.render;
    if (render.started == null) {
      return;
    }
    if (Math.max(0, render.duration - (getEpoch() - render.started)) < 0) {
      return;
    }

    if (this.activeTimers[render._id] == null) {
      this.activeTimers[render._id] = { annotation };
    }
    if (this.animationFrame == null) {
      this.prepareAudio();
      this.animationFrame = requestAnimationFrame(() => { this.renderTimers(); });
    }
  }

  start() {}

  destroy() {
    if (this.animationFrame != null) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.activeTimers = {};
  }

  onAnnotationRender(annotation) {}

  onAnnotationHide(annotation) {}

  onAnnotationAdd(annotation) {
    this.handleTimer(annotation);
  }

  onAnnotationUpdate(annotation, event) {
    this.handleTimer(annotation);
  }

  onAnnotationRemove(annotation) {}
}