
/*
start() {}
destroy() {}
onAnnotationAdd(annotation) {}
onAnnotationUpdate(annotation, event) {}
onAnnotationRemove(annotation) {}
*/

export class BaseWorker {
  subscribe(event, callback, extra) {
    this.parent.pipeline.subscribe("worker_" + this.id, event, callback, extra);
  }
  unsubscribe(event) {
    this.parent.pipeline.unsubscribe("worker_" + this.id, event);
  }

  remove() {
    if (this.destroy != null) {
      this.destroy();
    }
    this.parent.pipeline.unsubscribe("worker_" + this.id);
  }
}