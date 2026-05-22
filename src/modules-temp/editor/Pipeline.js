// PIPELINE : Used to distribute events across various modules and services:

export class Pipeline {
  pipeline = {}; // All active events
  pipelineSubs = {}; // All active subscribes

  constructor(nesting) {
    this.nesting = nesting; // Pass events down to subpage pipelines
  }

  async publish(event, data) {
    let listeners = this.pipeline[event] ?? [];
    for (let i = 0; i < listeners.length; i++) {
      let subscribe = (this.pipelineSubs[listeners[i]] ?? {})[event] ?? {};
      if (subscribe.callback != null) {
        await subscribe.callback(data);
      }
    }
    if (this.nesting != null) {
      let children = Object.keys(this.nesting);
      for (let i = 0; i < children.length; i++) {
        let child = this.nesting[children[i]] ?? {};
        if (child.pipeline != null && child.pipeline.publish != null) {
          child.pipeline.publish(event, data);
        }
      }
    }
  }

  subscribe(id, event, callback, extra) {
    extra = extra ?? {};

    if (extra.unsubscribe != true) {
      this.unsubscribe(id, event);
    } else {
      this.unsubscribe(id);
    }

    let pipelineSubs = this.pipelineSubs[id];
    if (pipelineSubs == null) {
      this.pipelineSubs[id] = {};
      pipelineSubs = this.pipelineSubs[id];
    }
    let subData = { callback: callback };
    pipelineSubs[event] = subData;

    let pipelineEvent = this.pipeline[event];
    if (pipelineEvent == null) {
      this.pipeline[event] = [];
      pipelineEvent = this.pipeline[event];
    }
    pipelineEvent.push(id);
    if (extra.sort != null) {
      subData.sort = extra.sort;
      pipelineEvent.sort((a, b) => {
        return (((this.pipelineSubs[a] ?? {})[event] ?? {}).sort ?? 0) - (((this.pipelineSubs[b] ?? {})[event] ?? {}).sort ?? 0);
      });
    }
  }
  
  unsubscribe(id, event) {
    let pipelineSubs = this.pipelineSubs[id];
    if (pipelineSubs == null) {
      return;
    }
    let checkEvents;
    if (event != null) {
      checkEvents = [event];
    } else {
      checkEvents = Object.keys(pipelineSubs);
    }
    for (let i = 0; i < checkEvents.length; i++) {
      let check = checkEvents[i];
      let pipelineEvents = this.pipeline[check] ?? [];
      let index = pipelineEvents.indexOf(id);
      if (index > -1) {
        pipelineEvents.splice(index, 1);
      }
      if (pipelineEvents.length < 1) {
        delete this.pipeline[check];
      }
      delete this.pipelineSubs[id][check];
    }
    if (Object.keys(pipelineSubs).length < 1) {
      delete this.pipelineSubs[id];
    }
  }
}