import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

import { parse } from "acorn";
import { simple as walk } from "acorn-walk";
import MagicString from "magic-string";

export default function resilientImportsPlugin() {
  return {
    name: "resilient-imports",
    //enforce: "post",
    apply: "build",

    writeBundle(options, bundle) {
      for (let chunk of Object.values(bundle)) {
        if (chunk.type !== "chunk") continue;
        
        const filePath = join(options.dir, chunk.fileName);
        let code = readFileSync(filePath, "utf-8");

        if (!code.includes("import")) continue;

        let ast;
        try {
          ast = parse(code, {
            ecmaVersion: "latest",
            sourceType: "module",
          });
        } catch {
          continue;
        }

        const ms = new MagicString(code);
        let changed = false;

        walk(ast, {
          ImportExpression(node) {
            //if (node.source.type !== "Literal") return;

            const raw = code.slice(node.source.start, node.source.end);
            
            ms.overwrite(node.start, node.end, `window.resilientImport(${raw})`);

            changed = true;
          },
        });

        if (changed) {
          code = ms.toString();
        }

        if (code.includes("__import__")) {
          code = code.replaceAll("__import__", "import");
          changed = true;
        }

        if (!changed) continue;

        writeFileSync(filePath, code, "utf-8");
      }
    }
  };
}