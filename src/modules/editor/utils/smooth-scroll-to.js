export const smoothScrollTo = (element, x, y, duration = 500) => {
  if (element == null) {
    return;
  }
  
  let startX = element.scrollLeft;
  let startY = element.scrollTop;
  let dx = x - startX;
  let dy = y - startY;
  let startTime = performance.now();

  let easeInOutQuad = (t) => {
    return t < 0.5
      ? 2 * t * t
      : -1 + (4 - 2 * t) * t;
  }

  let scroll = () => {
    if (element == null || element.getAttribute("scrollanimateid") != startTime) {
      return;
    }

    let now = performance.now();
    let elapsed = now - startTime;
    let progress = Math.min(elapsed / duration, 1);
    let easedProgress = easeInOutQuad(progress);

    element.scrollTo(
      startX + dx * easedProgress,
      startY + dy * easedProgress
    );

    if (progress < 1) {
      requestAnimationFrame(scroll);
    } else {
      element.removeAttribute("scrollanimateid");
    }
  }

  element.setAttribute("scrollanimateid", startTime);
  requestAnimationFrame(scroll);
}