import { PageFrame, setPage, userID, account } from "@/crucial";

export class Page extends PageFrame {
  title = "Board";
  theme = "light";
  html = ``;
  css = {};
  async js() {
    return setPage("pages/app/lesson", { params: { type: "board" } });
  }
}