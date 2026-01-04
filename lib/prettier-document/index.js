import * as prettierDoc from "prettier/doc";

export const {
  addAlignmentToDoc,
  align,
  breakParent,
  conditionalGroup,
  cursor,
  dedent,
  dedentToRoot,
  fill,
  group,
  hardline,
  hardlineWithoutBreakParent,
  ifBreak,
  indent,
  indentIfBreak,
  join,
  label,
  line,
  lineSuffix,
  lineSuffixBoundary,
  literalline,
  literallineWithoutBreakParent,
  markAsRoot,
  softline,
  trim,
} = prettierDoc.builders;
export const { printDocToString } = prettierDoc.printer;
export const {
  canBreak,
  findInDoc,
  mapDoc,
  removeLines,
  replaceEndOfLine,
  stripTrailingHardline,
  traverseDoc,
  willBreak,
} = prettierDoc.utils;
