modules["editor/toolbar"] = class {
  css = {

  };
  js = async (editor) => {
    let contentHolder = editor.contentHolder;
    let content = editor.contentHolder.querySelector(".eContent");
    let realtimeHolder = content.querySelector(".eRealtime");
    let annotations = content.querySelector(".eAnnotations");
    
  }
}