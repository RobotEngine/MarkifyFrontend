import { assetURL, sendRequest, addTempListener, sleep } from "@/crucial";

import { LinkService } from "./LinkService";

export const renderPage = async (renderer, sourcePageId) => {
  if (renderer.editor.running == false) {
    return;
  }
  if (sourcePageId == null) {
    return await sleep(100);
  }
  let [sourceID, pageNumber] = renderer.pdfPageStorage[sourcePageId] ?? [];
  delete renderer.pdfPageStorage[sourcePageId];

  let source = renderer.editor.sources[sourceID] ?? {};
  if (source.error == true) {
    return;
  }
  if (source.pdf == null) {
    if (renderer.pdfFileLoading[sourceID] == null) {
      renderer.pdfFileLoading[sourceID] = {};
      (async () => {
        if (source.source == null) {
          let [code, body] = await sendRequest("GET", "lessons/join/source?source=" + sourceID, null, { session: renderer.editor.session });
          if (code == 200) {
            renderer.editor.sources[sourceID] = { source: body.source };
          } else {
            renderer.editor.sources[sourceID] = { error: true };
          }
        }
        source = renderer.editor.sources[sourceID] ?? {};
        if (source.source != null) {
          if (source.loadingTask == null) {
            source.loadingTask = pdfjsLib.getDocument(assetURL + source.source);
            addTempListener({ type: "pdf", document: source.loadingTask });
          }
          source.loadingTask.promise.then(async (pdf) => {
            source.pdf = pdf;
            let loadingPageKeys = Object.keys(renderer.pdfFileLoading[sourceID])
            for (let b = 0; b < loadingPageKeys.length; b++) {
              let pageAdd = renderer.pdfFileLoading[sourceID][loadingPageKeys[b]];
              renderer.addPageToQueue(pageAdd[0], pageAdd[1], true);
            }
            delete renderer.pdfFileLoading[sourceID];
          });
        }
      })();
    }
    renderer.pdfFileLoading[sourceID][sourcePageId] = [sourceID, pageNumber];
    return;
  }

  let pageRender = renderer.editor.sourceRenders[sourcePageId];
  if (pageRender == null) {
    pageRender = await new Promise(async (resolve) => {
      source.pdf.getPage(pageNumber).then(async (pageRender) => {
        resolve(pageRender);
      });
    });
    renderer.editor.sourceRenders[sourcePageId] = pageRender;
  }

  let loadDocumentFrames = renderer.editor.annotationHolder.querySelectorAll('.eAnnotation[page] div[content] div[document][sourcepage="' + sourcePageId + '"]');
  for (let e = 0; e < loadDocumentFrames.length; e++) {
    let element = loadDocumentFrames[e];
    if (element == null) {
      continue;
    }
    if (element.childElementCount > 0) {
      continue;
    }

    let viewport = pageRender.getViewport({ scale: 2 });
    //let outputScale = window.devicePixelRatio ?? 1;

    element.insertAdjacentHTML("beforeend", `<canvas></canvas><div textlayer></div><div annotationlayer></div>`);

    let canvas = element.querySelector("canvas");
    let context = canvas.getContext("2d", { alpha: false, willReadFrequently: true });

    let setWidth = viewport.width;// * outputScale;
    let setHeight = viewport.height;// * outputScale;
    canvas.width = setWidth;
    canvas.height = setHeight;
    let annoWidth = parseFloat(element.getAttribute("width"));
    let annoHeight = parseFloat(element.getAttribute("height"));
    let annoRotation = parseInt(element.getAttribute("rotation"));
    if (annoRotation == 90 || annoRotation == 270) {
      let prevAnnoWidth = annoWidth;
      annoWidth = annoHeight;
      annoHeight = prevAnnoWidth;
    }
    element.style.setProperty("--fullWidth", setWidth + "px");
    element.style.setProperty("--fullHeight", setHeight + "px");
    element.style.transform = "rotate(" + annoRotation + "deg)";
    let ratio = setWidth / setHeight;
    let ratioedWidth = (annoHeight - 8) * ratio;
    let ratioedHeight = (annoWidth - 8) / ratio;
    if (ratioedWidth < annoWidth - 8) {
      element.style.width = (ratioedWidth + 8) + "px";
      element.style.height = annoHeight + "px";
      element.style.setProperty("--fullScale", "scale(" + ((annoHeight - 8) / setHeight) + ")");
    } else {
      element.style.width = annoWidth + "px";
      element.style.height = (ratioedHeight + 8) + "px";
      element.style.setProperty("--fullScale", "scale(" + ((annoWidth - 8) / setWidth) + ")");
    }

    //let transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

    await new Promise(async (resolve) => {
      pageRender.render({
        canvasContext: context,
        //transform: transform,
        viewport: viewport
      }).promise.then(() => {
        element.style.opacity = "1";

        if (renderer.editor.skipPDFTextAnnotationLayer == true) {
          return resolve();
        }

        let textHolder = element.querySelector("div[textlayer]");
        if (textHolder != null) {
          pageRender.getTextContent().then((textContent) => {
            (new pdfjsLib.TextLayer({
              textContentSource: textContent,
              container: textHolder,
              viewport: viewport
            })).render();
            resolve();
          });
        }
        
        let annotationHolder = element.querySelector("div[annotationlayer]");
        if (annotationHolder != null) {
          pageRender.getAnnotations().then((annotationsData) => {
            annotationsData = annotationsData.filter((value) => { return (value ?? {}).subtype == "Link"; });

            const DEFAULT_LINK_REL = "noopener noreferrer nofollow";
            const LinkTarget = {
              NONE: 0,
              SELF: 1,
              BLANK: 2,
              PARENT: 3,
              TOP: 4
            };

            (new pdfjsLib.AnnotationLayer({
              div: annotationHolder,
              page: pageRender,
              viewport: viewport
            })).render({
              annotations: annotationsData,
              linkService: new LinkService({
                sourceID: sourceID,
                editor: renderer.editor,
                pdfDocument: source.pdf
              })
              //async executeSetOCGState(action) {}
            });
          });
        }
      });
    });
    await sleep(10);
  }
}