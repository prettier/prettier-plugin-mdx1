/**
 * @import AstPath from "../../common/ast-path.js"
 * @import {Doc} from "../prettier-document/index.js"
 */

import { fill } from "../prettier-document/index.js";

/**
 * @param {AstPath} path
 * @param {*} print
 * @returns {Doc}
 */
function printSentence(path, print) {
  /** @type {Doc[]} */
  const parts = [""];

  path.each(() => {
    const { node } = path;
    const doc = print();
    switch (node.type) {
      case "whitespace":
        if (typeof doc !== "string") {
          parts.push(doc, "");
          break;
        }
      // fallthrough
      default:
        parts.push([parts.pop(), doc]);
    }
  }, "children");

  return fill(parts);
}

export { printSentence };
