export class BaseAnnotation {
  cache = {};
  
  getElement() {
    return this.element;
  }

  setID() {
    let element = this.getElement();
    if (element == null) {
      return;
    }
    if (this.properties._id != this.cache.lastSetID) {
      this.cache.lastSetID = this.properties._id;
      element.setAttribute("anno", this.properties._id);
    }
  }
  setParent() {
    let element = this.getElement();
    if (element == null) {
      return;
    }
    if (this.holder != element.parentElement) {
      this.holder.appendChild(element); // Change annotation parent to the new parent
    }
  }
  setZIndex() {
    let element = this.getElement();
    if (element == null) {
      return;
    }
    if (this.properties.l == null) {
      return;
    }
    if (this.properties.l < (this.parent.minLayer ?? (this.properties.l + 1))) {
      this.parent.minLayer = this.properties.l;
      this.parent.annotationHolder.style.setProperty("--minZIndex", this.properties.l);
      this.parent.annotationHolder.style.setProperty("--startZIndex", -Math.min(this.properties.l, 0));
    }
    if (this.properties.l > (this.parent.maxLayer ?? (this.properties.l - 1))) {
      this.parent.maxLayer = this.properties.l;
      this.parent.annotationHolder.style.setProperty("--maxZIndex", this.properties.l);
    }
    if (this.properties.l != this.cache.lastSetLayer) {
      this.cache.lastSetLayer = this.properties.l;
      element.style.setProperty("--zIndex", this.properties.l);
    }
  }
  setTransform() {
    let element = this.getElement();
    if (element == null) {
      return;
    }
    // matrix(scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY())
    // matrix(cos(X), sin(X), -sin(X), cos(X), 0, 0)
    let rotate = this.properties.r ?? 0;
    if (rotate > 180) {
      rotate = -(360 - rotate);
    }
    let radian = rotate * (Math.PI / 180);
    let a = Math.cos(radian);
    let b = Math.sin(radian);
    let c = -Math.sin(radian);
    let d = Math.cos(radian);
    let x = this.properties.p[0];
    let y = this.properties.p[1];
    let size = this.annotation.render.s ?? [];
    if ((size[0] ?? 1) < 0) {
      a *= -1;
      b *= -1;
    }
    if ((size[1] ?? 1) < 0) {
      c *= -1;
      d *= -1;
    }
    let transform = "matrix(" + a + "," + b + "," + c + "," + d + "," + x + "," + y + ")";
    if (transform != this.cache.lastSetTransform) {
      this.cache.lastSetTransform = transform;
      element.style.transform = transform;
    }
    /*let transform = "translate3d(" + this.properties.p[0] + "px," + this.properties.p[1] + "px, 0)";
    let [sizeWidth, sizeHeight] = [(this.annotation.render.s ?? [])[0] ?? 1, (this.annotation.render.s ?? [])[1] ?? 1];
    if (sizeWidth < 0 && sizeHeight < 0) {
      transform += " scale(-1)";
    } else if (sizeWidth < 0) {
      transform += " scale(-1,1)";
    } else if (sizeHeight < 0) {
      transform += " scale(1,-1)";
    }*/
  }
  setAnimate(set) {
    let element = this.getElement();
    if (element == null) {
      return;
    }
    this.animate = set ?? this.animate;
    if (this.animate == this.cache.lastSetAnimate) {
      return;
    }
    this.cache.lastSetAnimate = this.animate;
    if (this.animate != false) {
      element.removeAttribute("notransition");
    } else {
      element.setAttribute("notransition", "");
    }
  }

  subscribe(event, callback, extra) {
    this.cache.originalID = this.cache.originalID ?? this.properties._id;
    this.parent.pipeline.subscribe("annotation_" + this.cache.originalID, event, callback, extra);
  }
  unsubscribe(event) {
    this.parent.pipeline.unsubscribe("annotation_" + (this.cache.originalID ?? this.properties._id), event);
  }

  hide() {
    let element = this.getElement();
    if (element == null) {
      return;
    }
    if (this.cache.hidden != true) {
      this.cache.hidden = true;
      element.setAttribute("hidden", "");
    }
  }
  show() {
    let element = this.getElement();
    if (element == null) {
      return;
    }
    if (this.cache.hidden == true) {
      this.cache.hidden = false;
      element.removeAttribute("hidden");
    }
  }
  remove() {
    let element = this.getElement();
    let subID = this.cache.originalID ?? this.properties._id;
    this.element = null;
    this.cache = {};
    if (element != null) {
      element.remove();
    }
    this.parent.pipeline.unsubscribe("annotation_" + subID);
  }

  getContainer() {
    return this.container;
  }
  setContainer() {
    let element = this.getElement();
    if (element == null) {
      return;
    }
    let holder = this.getContainer();
    let parentRect = this.parent.utils.getRect(this.annotation.render);
    if (holder == null) {
      (element.querySelector("div[annoholdercontainer]") ?? element).insertAdjacentHTML("beforeend", `<div class="eAnnotationHolder"></div>`);
      holder = element.querySelector(".eAnnotationHolder");
      this.container = holder;
      holder.style.width = parentRect.width + "px";
      holder.style.height = parentRect.height + "px";
      holder.style.left = "0px";
      holder.style.top = "0px";
    } else if (this.annotation.render.resizing == null) {
      holder.style.width = parentRect.width + "px";
      holder.style.height = parentRect.height + "px";
      holder.style.left = "0px";
      holder.style.top = "0px";
      holder.style.removeProperty("right");
      holder.style.removeProperty("bottom");
    }
    return holder;
  }
}