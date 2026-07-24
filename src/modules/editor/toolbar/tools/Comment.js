import { sleep, getEpoch, timeSince, formatFullDate, copyClipboardText, account } from "@/crucial";

import { round } from "../../math";

import commentCursor from "../../icons/cursors/comment.svg?raw";
import sendIcon from "../../icons/actions/send.svg?raw";
import resolveIcon from "../../icons/actions/resolve.svg?raw";
import {
  more as moreIcon,
  copy as copyIcon,
  trash as trashIcon
} from "../../../utility/core-icons";

import editIcon from "../../icons/actions/edit.svg?raw";

class MoreDropdown {
  html = `
  <button class="eToolbarCommentMoreAction" option="edit" close title="Edit the comment."><div>${editIcon}</div>Edit Comment</button>
  <button class="eToolbarCommentMoreAction" option="copylink" close title="Copy a share link to the comment thread." style="--themeColor: var(--secondary)"><div>${copyIcon}</div>Copy Link</button>
  <button class="eToolbarCommentMoreAction" option="delete" close style="--themeColor: var(--red)"></button>
  `;
  css = {
    ".eToolbarCommentMoreAction": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".eToolbarCommentMoreAction:not(:last-child)": `margin-bottom: 4px`,
    ".eToolbarCommentMoreAction div": `width: 24px; height: 24px; padding: 2px; margin-right: 8px; background: var(--pageColor); border-radius: 4px`,
    ".eToolbarCommentMoreAction div svg": `width: 100%; height: 100%`,
    ".eToolbarCommentMoreAction:hover": `background: var(--themeColor); color: #fff`
  };
  js(frame, { parent, comment, root }) {
    let commentID = comment.getAttribute("comment");
    let render = (parent.editor.annotations[commentID] ?? {}).render ?? {};

    let editButton = frame.querySelector('.eToolbarCommentMoreAction[option="edit"]');
    editButton.addEventListener("click", async (event) => {
      let commentContent = comment.querySelector(".eCommentContainer > div[content]");
      let commentTx = commentContent.querySelector("div[text]");

      if (parent.lastEditQuill != null) {
        parent.lastEditQuill.disable();
        parent.lastEditQuill = null;
      }
      if (parent.lastEditComment != null) {
        parent.lastEditComment.querySelector("div[text]").removeAttribute("active");
        let actions = parent.lastEditComment.querySelector(".eCommentEditActions");
        if (actions != null) {
          actions.remove();
        }
        parent.updateComment((parent.editor.annotations[parent.lastEditComment.getAttribute("comment")] ?? {}).render);
        parent.lastEditComment = null;
      }

      parent.lastEditQuill = new (await parent.editor.text.getQuill())(commentTx, {
        formats: ["bold", "italic", "underline", "strike", "link"]
      });
      parent.lastEditComment = comment;

      commentContent.insertAdjacentHTML("beforeend", `<div class="eCommentEditActions"><button save>Save</button><button cancel>Cancel</button></div>`);
      commentContent.querySelector(".eCommentEditActions button[save]").addEventListener("click", async () => {
        let save = { _id: commentID, d: parent.lastEditQuill.getContents().ops };
        parent.lastEditQuill.disable();
        parent.lastEditQuill = null;
        commentTx.removeAttribute("active");
        let actions = comment.querySelector(".eCommentEditActions");
        if (actions != null) {
          actions.remove();
        }
        if (commentTx.textContent == "") {
          return parent.updateComment((parent.editor.annotations[commentID] ?? {}).render);
        }
        await parent.editor.save.push(save);
        parent.editor.realtimeSelect[save._id] = save;
        await parent.editor.forceShort();
      });
      commentContent.querySelector(".eCommentEditActions button[cancel]").addEventListener("click", () => {
        parent.lastEditQuill.disable();
        parent.lastEditQuill = null;
        commentTx.removeAttribute("active");
        let actions = comment.querySelector(".eCommentEditActions");
        if (actions != null) {
          actions.remove();
        }
        parent.updateComment((parent.editor.annotations[commentID] ?? {}).render);
      });
      
      parent.lastEditQuill.focus();
      parent.lastEditQuill.setSelection(0, parent.lastEditQuill.getLength());
      commentTx.setAttribute("active", "");

      parent.updateCommentFrame();
    });
    if (parent.editor.self.access < parent.editor.minimumEditingAccess || render.a != parent.editor.self.modify) {
      editButton.remove();
    }

    let copyButton = frame.querySelector('.eToolbarCommentMoreAction[option="copylink"]');
    copyButton.addEventListener("click", () => {
      /*if ((parent.editor.annotations[commentID] ?? {}).pending == true) {
        return;
      }*/
      copyClipboardText("https://markify.app/join?lesson=" + parent.editor.lesson.id + "&annotation=" + commentID, "link");
    });
    if (root == false) {
      copyButton.remove();
    }

    let deleteButton = frame.querySelector('.eToolbarCommentMoreAction[option="delete"]');
    if (root == true) {
      deleteButton.title = "Delete the entire comment thread.";
      deleteButton.innerHTML = `<div>${trashIcon}</div>Delete Thread`;
    } else {
      deleteButton.title = "Delete this comment.";
      deleteButton.innerHTML = `<div>${trashIcon}</div>Delete Comment`;
    }
    deleteButton.addEventListener("click", async () => {
      let save = { _id: commentID, remove: true };
      await parent.editor.save.push(save);
      parent.editor.realtimeSelect[save._id] = save;
      await parent.editor.forceShort();
    });
    if (parent.editor.utils.canMemberModify(render) != true) {
      deleteButton.remove();
    }
  }
}

class SideMenu {
  title = "Comment Threads";
  padding = 0;

  html = `<div class="eSideMenuCommentHolder">
    <div class="eSideMenuCommentOptions">
      <div class="eSideMenuCommentOptionsSwitcher" sort>
        <button filter="all" selected title="Show comment threads from everyone.">All</button>
        <button filter="mine" title="Show only comment threads you created.">Mine</button>
      </div>
      <div class="eSideMenuCommentOptionsSwitcher" resolve>
        <button filter="resolved" title="Include resolved comments in the list.">Resolved</button>
      </div>
    </div>
    <div class="eSideMenuCommentContainer" sort="all"></div>
  </div>`;
  css = {
    ".eSideMenuCommentOptions": `position: sticky; box-sizing: border-box; display: flex; flex-wrap: wrap; width: 278px; max-width: 100%; padding: 8px 8px; gap: 8px; left: 0px; top: 0px; background: rgba(var(--background), .8); backdrop-filter: blur(4px); z-index: 2; justify-content: space-between`,
    ".eSideMenuCommentOptionsSwitcher": `box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 4px; flex-shrink: 0; width: fit-content; max-width: 100%; padding: 4px; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 20px; justify-content: center`,
    ".eSideMenuCommentOptionsSwitcher button": `flex: auto; padding: 6px 10px; border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".eSideMenuCommentOptionsSwitcher button:hover": `background: var(--hover)`,
    ".eSideMenuCommentOptionsSwitcher button[selected]": `background: var(--theme); color: #fff`,
    ".eSideMenuCommentContainer": `position: relative; box-sizing: border-box; display: flex; flex-direction: column; width: 100%; min-height: 200px; padding: 10px; gap: 10px; z-index: 1; align-items: center`,

    ".eSideMenuCommentItem": `position: relative; width: 100%; border-radius: 16px 16px 16px 16px`, //6px
    '.eSideMenuCommentContainer[sort="mine"] .eSideMenuCommentItem:not([mine])': `display: none`,
    ".eSideMenuCommentContainer:not([resolved]) .eSideMenuCommentItem[resolved]": `display: none`,
    ".eSideMenuCommentItem:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; opacity: .2; z-index: 1; pointer-events: none; transition: .2s`,
    ".eSideMenuCommentItem[selected]:before": `background: var(--themeColor)`,
    ".eSideMenuCommentItem:after": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; opacity: .6; z-index: 1; pointer-events: none; transition: .2s`,
    ".eSideMenuCommentItem:hover:after": `box-shadow: 0px 0px 6px var(--themeColor)`,
    ".eSideMenuCommentItem div[container]": `position: relative; box-sizing: border-box; display: flex; width: 100%; height: 100%; padding: 4px; border-radius: inherit; overflow: hidden; z-index: 2`,
    ".eSideMenuCommentItem div[profileholder]": `flex-shrink: 0; width: 24px; height: 24px; background: var(--themeColor); border-radius: 12px; overflow: hidden`,
    ".eSideMenuCommentItem div[profileholder] > div[dots]": `display: flex; gap: 2px; width: 100%; height: 100%; justify-content: center; align-items: center`,
    ".eSideMenuCommentItem div[profileholder] > div[dots] > div": `width: 4px; height: 4px; background: var(--pageColor); border-radius: 2px`,
    ".eSideMenuCommentItem div[profileholder] > img": `width: 100%; height: 100%; border-radius: 12px; object-fit: cover`,
    ".eSideMenuCommentItem div[content]": `width: 100%; height: fit-content; margin-left: 6px; text-align: left`,
    ".eSideMenuCommentItem div[memberholder]": `display: flex; width: 100%; max-width: 220px; height: 24px; align-items: center`,
    ".eSideMenuCommentItem div[member]": `flex: 1; min-width: 0; max-width: fit-content; font-size: 14px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eSideMenuCommentItem div[time]": `margin: 0 6px; color: var(--darkGray); font-size: 12px; font-weight: 500; white-space: nowrap`,
    ".eSideMenuCommentItem button": `pointer-events: none; position: relative; display: flex; width: 24px; height: 24px; padding: 0; margin-left: auto; border-radius: 16px; justify-content: center; align-items: center`,
    ".eSideMenuCommentItem button:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: var(--secondary); opacity: 0; border-radius: inherit; transition: .2s`,
    ".eSideMenuCommentItem button:hover:before": `opacity: .4`,
    ".eSideMenuCommentItem button > svg": `width: 18px; height: 18px; z-index: 2`,
    ".eSideMenuCommentItem button[selected]:before": `opacity: 1 !important`,
    ".eSideMenuCommentItem button[selected] > svg": `filter: brightness(0) invert(1)`,
    ".eSideMenuCommentItem div[text]": `box-sizing: border-box; width: 100%; max-width: 220px; height: fit-content; font-size: 12px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden`,
    ".eSideMenuCommentItem div[text] .ql-editor": `padding: 0 !important; overflow-y: unset !important; font-family: var(--font); font-size: inherit; line-height: inherit; pointer-events: none`,
    ".eSideMenuCommentItem div[replycount]": `display: none; width: 100%; max-width: 220px; margin-top: 4px; color: var(--theme); font-size: 12px; font-weight: 600`
  };
  js(frame) {
    let sideMenu = frame.closest(".eSideMenu");
    let holder = frame.querySelector(".eSideMenuCommentContainer");

    this.updateComment = async (render, options = {}) => {
      let comment;
      if (options.new != true) {
        comment = holder.querySelector('.eSideMenuCommentItem[comment="' + render._id + '"]');
        if (comment == null && render.pending != null) {
          comment = holder.querySelector('.eSideMenuCommentItem[comment="' + render.pending + '"]');
        }
      }
      if (comment == null) {
        let insertPosition = "afterbegin";
        if (options.new == true) {
          insertPosition = "beforeend";
        }
        holder.insertAdjacentHTML(insertPosition, `<a class="eSideMenuCommentItem" new>
          <div container>
            <div profileholder></div>
            <div content>
              <div memberholder>
                <div member></div>
                <div time></div>
                <button resolve>${resolveIcon}</button>
              </div>
              <div text></div>
              <div replycount></div>
            </div>
          </div>
        </a>`);
        comment = holder.querySelector(".eSideMenuCommentItem[new]");
        comment.removeAttribute("new");
        if (options.new != true) {
          let holderChildren = holder.children;
          for (let i = 0; i < holderChildren.length; i++) {
            let child = holderChildren[i];
            if (parseInt(child.getAttribute("time")) > (render.time ?? render.sync)) {
              holder.insertBefore(comment, child);
            } else {
              break;
            }
          }
          sideMenu.removeAttribute("hidden");
        }
      }
      comment.setAttribute("comment", render._id);

      let setTime = render.time ?? render.sync;
      if (setTime != null) {
        comment.setAttribute("time", setTime);
        let timeTx = comment.querySelector("div[time]");
        timeTx.textContent = timeSince(setTime);
        timeTx.title = formatFullDate(setTime);
      }

      let commentTx = comment.querySelector("div[text]");
      let quill = new (await this.editor.text.getQuill())(commentTx, {
        formats: ["bold", "italic", "underline", "strike", "link"],
        readOnly: true
      });
      quill.setContents(this.editor.text.uncleanQuill(render.d ?? []));

      let replyTx = comment.querySelector("div[replycount]");
      let replyCount = Object.keys((this.editor.comments[render._id] ?? {}).replies ?? {}).length;
      if (replyCount > 0) {
        if (replyCount > 1) {
          replyTx.textContent = replyCount + " Replies";
        } else {
          replyTx.textContent = "1 Reply";
        }
        replyTx.style.display = "unset";
      } else {
        replyTx.style.removeProperty("display");
      }

      let modify = render.a ?? render.m;
      comment.setAttribute("modify", modify);
      if (modify == this.editor.self.modify) {
        comment.setAttribute("mine", "");
      }
      this.editor.utils.getCollaborator(modify, (collaborator) => {
        if (comment == null) {
          return;
        }

        comment.style.setProperty("--themeColor", collaborator.color);
        let profileHolder = comment.querySelector("div[profileholder]");
        if (collaborator.image != null) {
          profileHolder.innerHTML = `<img src="../images/profiles/default.svg" />`;
          profileHolder.querySelector("img").src = collaborator.image;
        } else {
          profileHolder.innerHTML = `<div dots><div></div><div></div><div></div></div>`;
        }
        let memberTx = comment.querySelector("div[member]");
        memberTx.textContent = collaborator.name;
        memberTx.title = collaborator.name;
      });

      let resolveButton = comment.querySelector("button[resolve]");
      if (render.resolved != true) {
        resolveButton.style.display = "none";
        comment.removeAttribute("resolved");
      } else {
        resolveButton.style.removeProperty("display");
        comment.setAttribute("resolved", "");
      }

      if (this.editor.selecting[render._id] == null) {
        comment.removeAttribute("selected");
      } else {
        comment.setAttribute("selected", "");
      }

      if (render.remove == true) {
        comment.remove();
        if (holder.childElementCount < 1) {
          sideMenu.setAttribute("hidden", "");
        }
      }
    }

    frame.addEventListener("click", async (event) => {
      let target = event.target;
      let comment = target.closest(".eSideMenuCommentItem");
      if (comment != null) {
        if ((this.toolbar.currentToolModule ?? {}).closeCommentFrame != null) {
          this.toolbar.currentToolModule.closeCommentFrame();
        }
        let annotation = this.editor.annotations[comment.getAttribute("comment")] ?? {};
        let render = annotation.render ?? {};
        if (render._id != null) {
          await this.editor.render.create(annotation);
          this.editor.selecting = {};
          this.editor.selecting[render._id] = {};
          this.toolbar.selection.updateBox();
          this.editor.utils.scrollToAnnotation(render, { animation: false });
        }
        return;
      }
      let filterHolder = target.closest(".eSideMenuCommentOptionsSwitcher");
      if (filterHolder != null) {
        let filterButton = target.closest("button");
        if (filterButton != null) {
          let currentSelected = filterHolder.querySelector("button[selected]");
          if (currentSelected != null) {
            currentSelected.removeAttribute("selected");
          }
          if (filterButton != currentSelected || filterHolder.childElementCount > 1) {
            filterButton.setAttribute("selected", "");
            if (filterHolder.hasAttribute("sort") == true) {
              holder.setAttribute("sort", filterButton.getAttribute("filter"));
            }
          }
          if (filterHolder.hasAttribute("resolve") == true) {
            if (filterButton.hasAttribute("selected") == true) {
              holder.setAttribute("resolved", "");
            } else {
              holder.removeAttribute("resolved");
            }
          }
        }
        return;
      }
    });
    
    let comments = Object.values(this.editor.comments).sort((a, b) => {
      return (b.render.time ?? b.render.sync) - (a.render.time ?? a.render.sync);
    });
    for (let i = 0; i < comments.length; i++) {
      this.updateComment(comments[i].render, { new: true });
    }
    let handleCommentChange = (render) => {
      let rootComment;
      if (render.parent != null) {
        let parent = (this.editor.annotations[render.parent] ?? {}).render;
        if (parent != null) {
          if (parent.f == "comment") {
            rootComment = parent;
          }
        } else {
          return;
        }
      }
      if (rootComment == null) {
        this.updateComment(render);
      } else {
        this.updateComment(rootComment);
      }
    } 
    this.toolbar.sidemenu.subscribe("comment_update", handleCommentChange);
    this.toolbar.sidemenu.subscribe("comment_select_start", handleCommentChange);
    this.toolbar.sidemenu.subscribe("comment_select_end", handleCommentChange);
    this.toolbar.sidemenu.subscribe("collaborator_update", (collaborator) => {
      let updateComments = holder.querySelectorAll('.eSideMenuCommentItem[modify="' + collaborator._id + '"]');
      for (let i = 0; i < updateComments.length; i++) {
        let comment = updateComments[i];
        comment.style.setProperty("--themeColor", collaborator.color);
        let profileHolder = comment.querySelector("div[profileholder]");
        if (collaborator.image != null) {
          profileHolder.innerHTML = `<img src="../images/profiles/default.svg" />`;
          profileHolder.querySelector("img").src = collaborator.image;
        } else {
          profileHolder.innerHTML = `<div dots><div></div><div></div><div></div></div>`;
        }
        let memberTx = comment.querySelector("div[member]");
        memberTx.textContent = collaborator.name;
        memberTx.title = collaborator.name;
      }
    });

    if (holder.childElementCount < 1) {
      sideMenu.setAttribute("hidden", "");
    }
  }
}

export class Tool {
  USER_SELECT = "none";
  TOUCH_ACTION = "none";
  REALTIME_TOOL = 5;
  MOUSE = { type: "svg", svg: commentCursor, translate: { x: 12, y: 32 } };

  commentWidth = 32;
  commentHeight = 32;
  offsetX = 24;
  offsetY = 23;

  css = {
    ".eCommentFrame": `position: absolute; width: 300px; min-height: 48px; left: 0px; top: 0px; opacity: 0; transform: scale(0); z-index: 101; border-radius: 24px; transition: transform .2s, opacity .2s; background: var(--pageColor); user-select: text`,
    ".eCommentFrame:after": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; box-shadow: 0px 0px 6px var(--theme); opacity: .6; pointer-events: none`,
    ".eCommentFrame .ql-editor": `padding: 0 !important; overflow-y: unset !important; font-family: var(--font); font-size: inherit; line-height: inherit`,
    ".eCommentFrame .ql-editor.ql-blank::before": `color: var(--textColor) !important; opacity: .6 !important`,
    ".eCommentScrollContainer": `width: 100%; height: fit-content; overflow: hidden; border-radius: inherit`,
    ".eCommentScroll": `width: 100%; height: fit-content; max-height: min(var(--maxToolbarHeight), 500px); overflow-y: auto`,
    ".eCommentHolder": `display: flex; flex-direction: column; box-sizing: border-box; width: 100%; height: fit-content; padding: 0 8px; gap: 16px`,
    ".eCommentItem": `position: relative; box-sizing: border-box; display: flex; width: 100%; z-index: 1`,
    ".eCommentItem:not([new]):first-child": `padding-top: 8px`,
    ".eCommentItem:not([new]):last-child": `padding-bottom: 8px`,
    ".eCommentItem div[threadindicator]": `position: absolute; width: 36px; height: 100%`,
    ".eCommentItem:first-child div[threadindicator]": `display: none`,
    ".eCommentItem div[threadindicator] div[passthrough]": `position: absolute; width: 4px; height: calc(100% + 18px); left: 14px; top: -18px; background: var(--hover); border-radius: 2px`,
    ".eCommentItem:last-child div[threadindicator] div[passthrough]": `height: 22px`,
    ".eCommentItem div[threadindicator] div[dash]": `position: absolute; width: 12px; height: 4px; left: 14px; top: 10px; border-style: solid; border-width: 0 0 4px 4px; border-color: var(--hover); border-bottom-left-radius: 12px`,
    ".eCommentItem:last-child div[threadindicator] div[dash]": `height: 12px; top: 2px`,
    ".eCommentItem div[threadindicator] div[ending]": `position: absolute; width: 4px; height: 4px; left: 28px; top: 14px; background: var(--hover); border-radius: 2px`,
    ".eCommentContainer": `box-sizing: border-box; display: flex; flex: 1; min-width: 0`,
    ".eCommentItem:not(:first-child) .eCommentContainer": `margin-left: 36px`,
    ".eCommentContainer div[profileholder]": `display: flex; flex-direction: column; width: 32px; min-height: 32px; align-items: center`,
    ".eCommentContainer div[profileholder] div[cursor]": `position: relative; width: 22px; height: 22px; margin: 2px; background: var(--themeColor); border: solid 3px var(--pageColor); border-radius: 8px 14px 14px`,
    ".eCommentContainer div[profileholder] div[cursor]:after": `content: ""; position: absolute; width: 100%; height: 100%; padding: 3px; left: -3px; top: -3px; border-radius: inherit; box-shadow: 0 0 6px var(--themeColor); opacity: .6`,
    ".eCommentContainer div[profileholder] div[profile]": `position: relative; width: 26px; height: 26px; border: solid 3px var(--pageColor); border-radius: 16px`,
    ".eCommentContainer div[profileholder] div[profile] img": `width: 100%; height: 100%; object-fit: cover; border-radius: inherit`,
    ".eCommentContainer div[profileholder] div[profile]:after": `content: ""; position: absolute; width: 100%; height: 100%; padding: 3px; left: -3px; top: -3px; border-radius: inherit; box-shadow: 0 0 4px var(--themeColor); opacity: .6`,
    ".eCommentItem:not(:only-child):first-child .eCommentContainer div[profileholder]:after": `content: ""; flex: 1; width: 4px; margin-top: 4px; background: var(--hover); border-radius: 2px 2px 0`,
    ".eCommentContainer div[content]": `flex: 1; min-width: 0; height: 100%; margin-left: 6px; text-align: left; align-content: center`,
    ".eCommentContainer div[content] div[header]": `display: flex; width: 100%; height: 32px; align-items: center`,
    ".eCommentContainer div[content] div[header] div[member]": `flex: 1; min-width: 0; max-width: fit-content; font-size: 16px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eCommentContainer div[content] div[header] div[time]": `margin: 0 6px; color: var(--darkGray); font-size: 14px; font-weight: 500; white-space: nowrap`,
    ".eCommentContainer div[content] div[header] div[actions]": `display: flex; gap: 4px; margin-left: auto`,
    ".eCommentContainer div[content] div[header] div[actions] button": `position: relative; display: flex; width: 32px; height: 32px; padding: 0; border-radius: 16px; justify-content: center; align-items: center`,
    ".eCommentContainer div[content] div[header] div[actions] button:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: var(--secondary); opacity: 0; border-radius: inherit; transition: .2s`,
    ".eCommentContainer div[content] div[header] div[actions] button:hover:before": `opacity: .4`,
    ".eCommentContainer div[content] div[header] div[actions] button > svg": `width: 24px; height: 24px; z-index: 2`,
    ".eCommentContainer div[content] div[header] div[actions] button[selected]:before": `opacity: 1 !important`,
    ".eCommentContainer div[content] div[header] div[actions] button[selected] > svg": `filter: brightness(0) invert(1)`,
    ".eCommentContainer div[content] div[text]": `box-sizing: border-box; width: 100%; height: fit-content; font-size: 14px; outline: none`,
    ".eCommentItem[new] .eCommentContainer div[content] div[text]": `padding: 6px`,
    ".eCommentItem:not([new]) .eCommentContainer div[content] div[text][active]": `padding: 4px; border: solid 3px var(--secondary); border-radius: 8px`,
    ".eCommentItem > button": `position: sticky; display: flex; width: 36px; height: 36px; top: 6px; margin: 6px 6px 6px 0; justify-content: center; align-items: center; background: var(--theme); border-radius: 18px`,
    ".eCommentItem > button div[image]": `--themeColor: #fff; flex-shrink: 0; width: 28px; height: 28px`,
    ".eCommentItem > button div[image] svg": `width: 100%; height: 100%`,
    ".eCommentItem .eCommentEditActions": `display: flex; margin-top: 4px; justify-content: space-between`,
    ".eCommentItem .eCommentEditActions button[save]": `font-weight: 700; font-size: 14px; color: var(--theme)`,
    ".eCommentItem .eCommentEditActions button[cancel]": `font-weight: 500; font-size: 14px; color: var(--darkGray)`,
    ".eCommentReply": `position: sticky; box-sizing: border-box; display: flex; width: 100%; padding: 8px; bottom: 0px; background: var(--pageColor); z-index: 2; transition: .2s`,
    ".eCommentReply > div[profileholder]": `display: flex; height: fit-content; margin-right: 6px`,
    ".eCommentReply > div[profileholder] div[cursor]": `position: relative; width: 22px; height: 22px; margin: 2px; background: var(--themeColor); border: solid 3px var(--pageColor); border-radius: 8px 14px 14px`,
    ".eCommentReply > div[profileholder] div[cursor]:after": `content: ""; position: absolute; width: 100%; height: 100%; padding: 3px; left: -3px; top: -3px; border-radius: inherit; box-shadow: 0 0 6px var(--themeColor); opacity: .6`,
    ".eCommentReply > div[profileholder] div[profile]": `position: relative; width: 26px; height: 26px; border: solid 3px var(--pageColor); border-radius: 16px`,
    ".eCommentReply > div[profileholder] div[profile] img": `width: 100%; height: 100%; object-fit: cover; border-radius: inherit`,
    ".eCommentReply > div[profileholder] div[profile]:after": `content: ""; position: absolute; width: 100%; height: 100%; padding: 3px; left: -3px; top: -3px; border-radius: inherit; box-shadow: 0 0 4px var(--themeColor); opacity: .6`,
    ".eCommentReply > div[text]": `box-sizing: border-box; flex: 1; padding: 6px 10px; min-height: 32px; max-height: 120px; background: rgba(var(--hoverRGB), .3); outline: none; border-radius: 16px; font-size: 14px; text-align: left; align-content: center; overflow: auto`,
    ".eCommentReply > button": `display: flex; width: 32px; height: 32px; margin: auto 0 0 6px; justify-content: center; align-items: center; background: var(--theme); border-radius: 16px`,
    ".eCommentReply > button div[image]": `--themeColor: #fff; flex-shrink: 0; width: 26px; height: 26px`,
    ".eCommentReply > button div[image] svg": `width: 100%; height: 100%`
  };
  updateCommentFrame() {
    if (this.frame == null) {
      return;
    }
    if (this.annotation == null) {
      return this.closeCommentFrame();
    }

    let annotationRect = this.editor.utils.localBoundingRect(this.editor.annotationHolder);
    let { x, y } = this.editor.utils.getRect(this.annotation.render);
    let zoom = 1 / this.editor.zoom;
    let centerX = x + ((this.commentWidth / 2) * zoom);
    let centerY = y - ((this.commentHeight / 2) * zoom);

    let frameWidth = this.frame.offsetWidth;
    let setLeft = annotationRect.left + (centerX * this.editor.zoom) + this.offsetX + this.editor.scrollLeft;
    let setRight = annotationRect.left + (centerX * this.editor.zoom) - this.offsetX - frameWidth + this.editor.scrollLeft;
    let setTransformOrigin = "";
    let sidemenuLeftOffset = this.editor.scrollOffset;
    let sidemenuRightOffset = 8;
    if (this.toolbar.sidemenu.frame != null && this.toolbar.sidemenu.frame.hasAttribute("hidden") == false) {
      sidemenuRightOffset = this.toolbar.sidemenu.frame.offsetWidth + 8;
    }
    if ((account.settings ?? {}).toolbar == "right") {
      [sidemenuLeftOffset, sidemenuRightOffset] = [sidemenuRightOffset, sidemenuLeftOffset];
    }
    let leftPageOffset = (this.editor.scrollLeft + this.editor.contentHolder.clientWidth) - (setLeft + frameWidth + sidemenuRightOffset);
    let rightPageOffset = (setRight - sidemenuLeftOffset) - (this.editor.scrollLeft);
    if (leftPageOffset > 0) {
      this.frame.style.left = setLeft + "px";
      setTransformOrigin += "left";
    } else {
      if (leftPageOffset < 0 && rightPageOffset > leftPageOffset) {
        this.frame.style.left = setRight + "px";
        setTransformOrigin += "right";
      } else {
        this.frame.style.left = setLeft + "px";
        setTransformOrigin += "left";
      }
    }
    let frameHeight = this.frame.offsetHeight;
    let annoY = annotationRect.top + (centerY * this.editor.zoom);
    let setTop;
    if (annoY + this.offsetY < this.editor.contentHolder.clientHeight - this.editor.scrollOffset) {
      setTop = annoY + this.editor.scrollTop - this.offsetY;
      setTop += Math.min(this.editor.scrollTop + this.editor.contentHolder.clientHeight - this.editor.scrollOffset - setTop - frameHeight, 0);
    } else {
      setTop = annoY - frameHeight + this.editor.scrollTop + this.offsetY;
    }
    this.frame.style.top = setTop + "px";
    this.frame.style.transformOrigin = setTransformOrigin + " " + (this.editor.scrollTop + annoY - setTop) + "px";

    if (this.updateReplyShadow != null) {
      this.updateReplyShadow();
    }
  }
  async openCommentFrame(annotation, thread = []) {
    this.closeCommentFrame();
    if (annotation == null) {
      return;
    }
    this.annotation = annotation;

    this.editor.content.parentElement.insertAdjacentHTML("beforeend", `<div class="eCommentFrame" new><div class="eCommentScrollContainer"><div class="eCommentScroll customScroll"><div class="eCommentHolder"></div></div></div></div>`);
    this.frame = this.editor.content.parentElement.querySelector(".eCommentFrame[new]");
    this.frame.removeAttribute("new");

    let scrollHolder = this.frame.querySelector(".eCommentScroll");
    let holder = scrollHolder.querySelector(".eCommentHolder");

    if (annotation.new == true) {
      holder.style.padding = "0px";
      holder.innerHTML = `<div class="eCommentItem" new>
        <div class="eCommentContainer">
          <div content>
            <div text></div>
          </div>
        </div>
        <button disabled><div image>${sendIcon}</div></button>
      </div>`;
      let commentItem = holder.querySelector(".eCommentItem");
      let commentText = commentItem.querySelector("div[text]");
      let commentSendButton = commentItem.querySelector("button");
      let quill = new (await this.editor.text.getQuill())(commentText, {
        formats: ["bold", "italic", "underline", "strike", "link"],
        placeholder: "Write your Comment"
      });
      quill.on("text-change", () => {
        if (commentText.textContent.length > 0) {
          commentSendButton.removeAttribute("disabled");
        } else {
          commentSendButton.setAttribute("disabled", "");
        }
        this.updateCommentFrame();
      });
      commentSendButton.addEventListener("click", async () => {
        if (commentText.textContent == "") {
          return this.closeCommentFrame();
        }
        annotation.render.d = quill.getContents().ops;
        annotation.render.time = getEpoch();
        await this.editor.save.push(annotation.render);

        this.editor.realtimeSelect[annotation.render._id] = { ...annotation.render, done: true };
        await this.editor.forceShort();
        
        this.closeCommentFrame();
      });

      this.updateCommentFrame();

      quill.focus();

      this.frame.style.transform = "scale(1)";
      this.frame.style.opacity = 1;

      return;
    }

    this.frame.style.width = "350px";

    this.updateComment = async (render, options = {}) => {
      let comment;
      if (options.new != true) {
        comment = holder.querySelector('.eCommentItem[comment="' + render._id + '"]');
        if (comment == null && render.pending != null) {
          comment = holder.querySelector('.eCommentItem[comment="' + render.pending + '"]');
        }
      }
      let newComment = comment == null;
      if (newComment == true) {
        holder.insertAdjacentHTML("beforeend", `<div class="eCommentItem" new>
          <div threadindicator>
            <div passthrough></div>
            <div dash></div>
            <div ending></div>
          </div>
          <div class="eCommentContainer">
            <div profileholder>
              <div cursor style="display: none"></div>
              <div profile style="display: none"><img src="../images/profiles/default.svg" /></div>
            </div>
            <div content>
              <div header>
                <div member></div>
                <div time></div>
                <div actions>
                  <button more>${moreIcon}</button>
                </div>
              </div>
              <div text></div>
            </div>
          </div>
        </div>`);
        comment = holder.querySelector(".eCommentItem[new]");
        comment.removeAttribute("new");
        if (options.new != true) {
          let holderChildren = holder.children;
          for (let i = holderChildren.length - 1; i >= 0; i--) {
            let child = holderChildren[i];
            if (parseInt(child.getAttribute("time")) > (render.time ?? render.sync)) {
              holder.insertBefore(comment, child);
            } else {
              break;
            }
          }
        }

        let actionsHolder = comment.querySelector("div[actions]");
        if (options.root == true) {
          actionsHolder.insertAdjacentHTML("afterbegin", `<button resolve title="Resolve the comment thread.">${resolveIcon}</button>`);
        }
      }
      comment.setAttribute("comment", render._id);

      let setTime = render.time ?? render.sync;
      comment.setAttribute("time", setTime);

      let commentTx = comment.querySelector("div[text]");
      if (commentTx.querySelector('.ql-editor[contenteditable="true"]') == null) {
        let quill = new (await this.editor.text.getQuill())(commentTx, {
          formats: ["bold", "italic", "underline", "strike", "link"],
          readOnly: true
        });
        quill.setContents(this.editor.text.uncleanQuill(render.d ?? []));
      }

      let modify = render.a ?? render.m;
      comment.setAttribute("modify", modify);
      this.editor.utils.getCollaborator(modify, (collaborator) => {
        if (comment == null) {
          return;
        }

        let profileHolder = comment.querySelector("div[profileholder]");
        profileHolder.style.setProperty("--themeColor", collaborator.color);
        if (collaborator.image == null) {
          profileHolder.querySelector("div[cursor]").style.removeProperty("display");
          profileHolder.querySelector("div[profile]").style.display = "none";
        } else {
          profileHolder.querySelector("div[profile] img").src = collaborator.image;
          profileHolder.querySelector("div[profile]").style.removeProperty("display");
          profileHolder.querySelector("div[cursor]").style.display = "none";
        }
        let memberTx = comment.querySelector("div[member]");
        memberTx.textContent = collaborator.name;
        memberTx.title = collaborator.name;
      });

      let canModify = this.editor.utils.canMemberModify(render) == true;
      let resolveButton = comment.querySelector("button[resolve]");
      let moreButton = comment.querySelector("button[more]");
      if (resolveButton != null) {
        if (render.resolved != true) {
          resolveButton.removeAttribute("selected");
        } else {
          resolveButton.setAttribute("selected", "");
        }
        if (canModify == true) {
          resolveButton.removeAttribute("disabled");
        } else {
          resolveButton.setAttribute("disabled", "");
        }
      } else {
        if (canModify == true) {
          moreButton.removeAttribute("hidden");
        } else {
          moreButton.setAttribute("hidden", "");
        }
      }

      if (render.remove == true) {
        comment.remove();
      }
      if (options.new != true) {
        this.updateCommentFrame();
        if (newComment == true && holder.lastElementChild != null && scrollHolder.scrollTop + scrollHolder.clientHeight + holder.lastElementChild.clientHeight + 50 > scrollHolder.scrollHeight) {
          let scrollToParams = { top: scrollHolder.scrollHeight };
          if (this.editor.parent.parent.active != false) {
            scrollToParams.behavior = "smooth";
          }
          scrollHolder.scrollTo(scrollToParams);
        }
      }
    }

    await this.updateComment(this.annotation.render, { root: true, new: true });
    for (let i = 0; i < thread.length; i++) {
      await this.updateComment(thread[i], { new: true });
    }

    holder.addEventListener("click", (event) => {
      let button = event.target.closest("button");
      if (button == null) {
        return;
      }
      let comment = button.closest(".eCommentItem");
      if (comment != null && button.hasAttribute("more") == true) {
        button.setAttribute("dropdowntitle", "Options");
        return this.editor.openDropdown(button, MoreDropdown, { parent: this, comment: comment, root: holder.firstElementChild == comment });
      }
      if (comment != null && button.hasAttribute("resolve") == true) {
        return this.toolbar.saveSelecting(() => { return { resolved: !button.hasAttribute("selected") }; });
      }
    });

    let replyTx;
    if (this.editor.self.access >= this.editor.minimumEditingAccess && this.editor.viewer != true && this.toolbar.checkToolEnabled("comment") == true) {
      scrollHolder.insertAdjacentHTML("beforeend", `<div class="eCommentReply">
        <div profileholder>
          <div cursor></div>
        </div>
        <div class="customScroll" text></div>
        <button style="display: none"><div image>${sendIcon}</div></button>
      </div>`);
      let commentReply = scrollHolder.querySelector(".eCommentReply");
      let profileHolder = commentReply.querySelector("div[profileholder]");
      replyTx = commentReply.querySelector("div[text]");
      let replySendButton = commentReply.querySelector("button");
      let selfCollaborator = await this.editor.utils.getCollaborator(this.editor.self.modify);
      profileHolder.style.setProperty("--themeColor", selfCollaborator.color);
      if (selfCollaborator.image != null) {
        profileHolder.innerHTML = `<div profile><img src="../images/profiles/default.svg" /></div>`;
        profileHolder.querySelector("div[profile] img").src = selfCollaborator.image;
      }
      let replyQuill = new (await this.editor.text.getQuill())(replyTx, {
        formats: ["bold", "italic", "underline", "strike", "link"],
        placeholder: "Write a Reply"
      });
      replyQuill.on("text-change", () => {
        if (replyTx.textContent.length > 0) {
          replySendButton.style.removeProperty("display");
        } else {
          replySendButton.style.display = "none";
        }
      });
      replySendButton.addEventListener("click", async () => {
        if (replyTx.textContent == "") {
          return;
        }
        let newComment = {
          _id: this.editor.render.generateID(),
          pending: true,
          f: "comment",
          parent: this.annotation.render._id,
          d: replyQuill.getContents().ops, //{ b: addText },
          a: this.editor.self.modify,
          time: getEpoch()
        };

        replyQuill.setContents([]);
        replyQuill.focus();
        replySendButton.style.display = "none";
        
        await this.editor.save.push(newComment);

        this.editor.realtimeSelect[newComment._id] = { ...newComment, done: true };
        await this.editor.forceShort();
      });

      this.updateReplyShadow = () => {
        if (scrollHolder == null || commentReply == null) {
          return;
        }
        if (Math.round(scrollHolder.scrollTop) < Math.round(scrollHolder.scrollHeight - scrollHolder.offsetHeight)) {
          commentReply.style.boxShadow = "var(--lightShadow)";
        } else {
          commentReply.style.removeProperty("box-shadow");
        }
      }
      scrollHolder.addEventListener("scroll", this.updateReplyShadow);
    }

    this.updateCommentFrame();

    this.editor.pipeline.subscribe("toolbarCommentCollaboratorUpdate", "collaborator_update", (data) => {
      if (this.frame == null) {
        return;
      }
      let updateComments = holder.querySelectorAll('.eCommentItem[modify="' + data._id + '"]');
      for (let i = 0; i < updateComments.length; i++) {
        let comment = updateComments[i];
        let profileHolder = comment.querySelector("div[profileholder]");
        profileHolder.style.setProperty("--themeColor", data.color);
        if (data.image == null) {
          profileHolder.querySelector("div[cursor]").style.removeProperty("display");
          profileHolder.querySelector("div[profile]").style.display = "none";
        } else {
          profileHolder.querySelector("div[profile] img").src = data.image;
          profileHolder.querySelector("div[profile]").style.removeProperty("display");
          profileHolder.querySelector("div[cursor]").style.display = "none";
        }
        let memberTx = comment.querySelector("div[member]");
        memberTx.textContent = data.name;
        memberTx.title = data.name;
      }
    });
    this.editor.pipeline.subscribe("toolbarCommentMemberUpdate", "set", (data) => {
      if (this.frame == null) {
        return;
      }
      if (data.settings != null && this.editor.selecting[(this.annotation.render ?? {})._id] != null) {
        this.openCommentFrame(this.annotation, thread);
      }
    });

    (async () => {
      await sleep(1);
      if (replyTx != null) {
        replyTx.focus();
      }
      scrollHolder.scrollTo(0, scrollHolder.scrollHeight);
    })();
    
    this.frame.style.transform = "scale(1)";
    this.frame.style.opacity = 1;
  }
  closeCommentFrame() {
    if (this.frame == null) {
      return;
    }
    if (this.annotation != null) {
      if (this.annotation.new == true) {
        this.editor.render.remove(this.annotation);
      }
      this.annotation = null;
    }
    let remFrame = this.frame;
    this.frame = null;
    (async () => {
      remFrame.style.opacity = 0;
      remFrame.style.transform = "scale(0)";
      await sleep(300);
      remFrame.remove();
    })();
  }

  async clickEnd(event) {
    if (this.editor.isEditorContent(event.target) == false) {
      return;
    }

    let commentTarget = event.target.closest(".eAnnotation[comment]");
    if (commentTarget != null) {
      let annotation = this.editor.annotations[commentTarget.getAttribute("anno")];
      if (annotation == null) {
        return;
      }
      this.closeCommentFrame();
      this.editor.selecting = {};
      this.editor.selecting[annotation.render._id] = {};
      this.toolbar.selection.updateBox();
      return;
    }

    this.disable();

    let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
    let position = this.editor.utils.scaleToDoc(mouseX, mouseY);

    this.annotation = {
      render: {
        _id: this.editor.render.generateID(),
        pending: true,
        f: "comment",
        p: [round(position.x) - (1 / this.editor.zoom), round(position.y) - (1 / this.editor.zoom)],
        s: [0, 0],
        d: [],
        a: this.editor.self.modify
      },
      new: true
    };

    await this.editor.render.create(this.annotation);
    let commentElement = this.annotation.component.getElement();
    let commentHead = commentElement.querySelector("div[commentholder] > div[comment]");
    commentHead.style.transition = "0s";
    commentHead.style.transform = "scale(0)";
    commentHead.offsetHeight;

    this.editor.selecting = {};
    this.toolbar.selection.updateBox();

    this.editor.pipeline.subscribe("toolbarCommentSidemenuOpen", "sidemenu_open", (data) => {
      this.updateCommentFrame();
    });
    this.editor.pipeline.subscribe("toolbarCommentSidemenuClose", "sidemenu_close", (data) => {
      this.updateCommentFrame();
    });

    this.openCommentFrame(this.annotation);

    commentElement.setAttribute("selected", "");
    commentHead.style.removeProperty("transition");
    commentHead.style.transform = "scale(1)";
  }
  scroll() { this.updateCommentFrame(); }
  enable() {
    this.toolbar.sidemenu.open(SideMenu);
    this.editor.annotationHolder.removeAttribute("hidecomments");
  }
  disable() {
    this.closeCommentFrame();

    this.editor.pipeline.unsubscribe("toolbarCommentSidemenuOpen");
    this.editor.pipeline.unsubscribe("toolbarCommentSidemenuClose");

    if (this.annotation != null) {
      this.editor.render.remove(this.annotation);
      this.annotation = null;
    }

    if (this.editor.options.comments == false) {
      this.editor.annotationHolder.setAttribute("hidecomments", "");
    }
  };
}