import { modal as modalModule } from "@modules/utility/Modal";
import { Frame as Tutorial } from "@modules/modals/BreakoutTutorial";

export class Page {
  html = ``;
  css = {};
  js(frame) {
    modalModule.open(Tutorial, null, { parentElement: frame, parent: this, title: "Welcome to Markify Breakout" });
  }
}