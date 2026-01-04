import { locEnd, locStart } from "./loc.js";
import { parseMdx } from "./parse/index.js";
import { hasIgnorePragma, hasPragma } from "./pragma.js";

function createParser(parse) {
  return {
    astFormat: "mdast",
    hasPragma,
    hasIgnorePragma,
    locStart,
    locEnd,
    parse,
  };
}

const mdxParser = /* @__PURE__ */ createParser(parseMdx);

export { mdxParser as mdx };
