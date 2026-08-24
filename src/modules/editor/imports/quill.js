import Quill from "quill/core";

//import Keyboard from "quill/modules/keyboard";

import Bold from "quill/formats/bold";
import Italic from "quill/formats/italic";
import Underline from "quill/formats/underline";
import Strike from "quill/formats/strike";
import Link from "quill/formats/link";
import List from "quill/formats/list";
import Indent from "quill/formats/indent";

export { Quill };
export const formats = [
  Bold,
  Italic,
  Underline,
  Strike,
  Link,
  List,
  Indent
];