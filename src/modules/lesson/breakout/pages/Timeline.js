import { Frame as Timeline } from "@modules/lesson/subpages/Timeline";

export class Page {
  html = `<div class="brtTimelineHolder"></div>`;
  css = {
    ".brtTimelineHolder": `position: absolute; display: block; width: 100%; height: 100%; left: 0px; top: 0px`
  };
  async js(frame, extra) {
    let construct = {
      close: () => {
        this.parent.closePage("timeline");
        this.parent.openPage(extra.exitPage[0], extra.exitPage[1]);
      },

      lesson: this.parent.parent,
      self: this.parent.parent.self,
      session: this.parent.parent.session,
      sessionID: this.parent.parent.sessionID,
      sources: this.parent.parent.sources,
      collaborators: this.parent.parent.collaborators,

      preferenceState: this.parent.parent.preferences.state,

      //reactions: tileData.editor.reactions,

      ...(extra.configuration ?? {})
    };

    this.timeline = await this.setFrame(
      Timeline,
      frame.querySelector(".brtTimelineHolder"),
      {
        showLoading: false,
        construct
      }
    );
    this.pipeline = this.timeline.pipeline;
  }
}