export class LinkService {
  externalLinkEnabled = true;
  constructor({
    sourceID,
    editor,
    pdfDocument,
    externalLinkTarget = 2, //null
  }) {
    this.sourceID = sourceID;
    this.editor = editor;
    this.externalLinkTarget = externalLinkTarget;
    this.externalLinkRel = null;
    this._ignoreDestinationZoom = false;
    this.baseUrl = null;
    this.pdfDocument = pdfDocument;
    //this.pdfViewer = null;
    //this.pdfHistory = null;
  }
  //setDocument(pdfDocument, baseUrl = null) {}
  //setViewer(pdfViewer) {}
  //setHistory(pdfHistory) {}
  get pagesCount() {
    return this.pdfDocument ? this.pdfDocument.numPages : 0;
  }
  //get page() {}
  //set page(value) {}
  //get rotation() {}
  //set rotation(value) {}
  //get isInPresentationMode() {}
  async getPDFDestination(dest) {
    //let namedDest;
    let explicitDest;
    let pageNumber;
    if (typeof dest === "string") {
      //namedDest = dest;
      explicitDest = await this.pdfDocument.getDestination(dest);
    } else {
      //namedDest = null;
      explicitDest = dest;
    }
    if (!Array.isArray(explicitDest)) {
      return;
    }
    let [destRef] = explicitDest;
    if (destRef && typeof destRef === "object") {
      pageNumber = this.pdfDocument.cachedPageNumber(destRef);
      if (!pageNumber) {
        try {
          pageNumber = (await this.pdfDocument.getPageIndex(destRef)) + 1;
        } catch {
          return;
        }
      }
    } else if (Number.isInteger(destRef)) {
      pageNumber = destRef + 1;
    }
    return pageNumber;
  }
  async getLessonDestination(dest) {
    let pageNumber = await this.getPDFDestination(dest);
    if (!pageNumber || pageNumber < 1 || pageNumber > this.pagesCount) {
      return;
    }
    let foundPage;
    for (let i = 0; i < this.editor.annotationPages.length; i++) {
      let page = this.editor.annotationPages[i] ?? [];
      let pdfData = page[3] ?? [];
      if (pdfData[0] == this.sourceID && pdfData[1] == pageNumber) {
        foundPage = {
          number: i + 1,
          id: page[0]
        };
        break;
      }
    }
    return foundPage;
  }
  async goToDestination(dest) {
    if (!this.pdfDocument) {
      return;
    }
    let foundPage = await this.getLessonDestination(dest);
    if (foundPage == null) {
      return;
    }
    this.editor.setPage(foundPage.number, false);
  }
  goToPage(val) {
    if (!this.pdfDocument) {
      return;
    }
    let pageNumber = typeof val === "string" && parseInt(val) || val | 0;
    let foundPage;
    for (let i = 0; i < this.editor.annotationPages.length; i++) {
      let page = (this.editor.annotationPages[i] ?? [])[3] ?? [];
      if (page[0] == this.sourceID && page[1] == pageNumber) {
        foundPage = i + 1;
        break;
      }
    }
    if (foundPage == null) {
      return;
    }
    this.editor.setPage(foundPage, false);
  }
  addLinkAttributes(link, url, newWindow = false) {
    if (!url || typeof url !== "string") {
      return;
    }
    let target = newWindow ? LinkTarget.BLANK : this.externalLinkTarget;
    let rel = this.externalLinkRel;
    if (this.externalLinkEnabled == true) {
      link.href = link.title = url;
    } else {
      link.href = "";
      link.title = `Disabled: ${url}`;
      link.onclick = () => false;
    }
    let targetStr = "";
    switch (target) {
      case LinkTarget.NONE:
        break;
      case LinkTarget.SELF:
        targetStr = "_self";
        break;
      case LinkTarget.BLANK:
        targetStr = "_blank";
        break;
      case LinkTarget.PARENT:
        targetStr = "_parent";
        break;
      case LinkTarget.TOP:
        targetStr = "_top";
        break;
    }
    link.target = targetStr;
    link.rel = typeof rel === "string" ? rel : DEFAULT_LINK_REL;
  }
  async getDestinationHash(dest) {
    // PLEASE NOTE: Had to modify pdf.mjs to allow for async with promise
    if (!this.pdfDocument) {
      return;
    }
    let foundPage = await this.getLessonDestination(dest);
    if (foundPage == null) {
      return;
    }
    return "?lesson=" + this.editor.lesson.id + "&page=" + foundPage.id + "#lesson";
  }
  //getAnchorUrl(anchor) {}
  //setHash() {}
  executeNamedAction(action) {
    if (this.editor.annotationPages.length < 1) {
      return;
    }
    let setPage;
    let animate = true;
    switch (action) {
      case "NextPage":
        setPage = this.editor.currentPage + 1;
        break;
      case "PrevPage":
        setPage = this.editor.currentPage - 1;
        break;
      case "LastPage":
        setPage = editor.annotationPages.length;
        animate = false;
        break;
      case "FirstPage":
        setPage = 1;
        animate = false;
        break;
      default:
        return;
    }
    if (setPage != null) {
      this.editor.setPage(setPage, animate);
    }
  }
}