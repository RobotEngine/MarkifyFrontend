modules["editor/realtime"] = class {
  js = async function () {
    let editor = this.parent;

    this.setShortSub = (chunks) => {
      if (editor.parent.parent.signalStrength < 3 || editor.options.cursors == false) {
        chunks = null;
      }
      let filter = { c: "short_" + editor.parent.parent.id, p: chunks };
      if (editor.realtime.observing != null) {
        filter.o = editor.realtime.observing;
      }
      if (this.shortSub != null) {
        this.shortSub.edit(filter);
      } else {
        if (chunks == null) {
          return;
        }
        this.shortSub = subscribe(filter, async (data) => {
          
        });
        editor.realtime.subscribes.push(this.shortSub);
      }
    }

    this.adjustRealtimeHolder = () => {

    }

    editor.realtime.module = this;
    editor.pipeline.publish("realtime_loaded", {});
  }
}