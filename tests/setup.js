import assert from "node:assert/strict";
import fs, { promises as fsPromises } from "node:fs";
import path from "node:path";
import * as prettier from "prettier";
import { test, expect } from "vitest";
import * as prettierPluginMdx2 from "../lib/index.js";
import createSnapshot from "./utilities/create-snapshot.js";
import stringifyOptionsForTitle from "./utilities/stringify-options-for-title.js";

async function format(code, options) {
  return prettier.format(code, {
    parser: "mdx",
    plugins: [prettierPluginMdx2],
    ...options,
  });
}

async function runTest(code, parsers, options) {
  options = { printWidth: 80, ...options };
  const formatted = await format(code, options);

  expect(
    createSnapshot(
      {
        inputWithCursor: code,
        outputWithCursor: formatted,
        options,
      },
      { parsers, formatOptions: options },
    ),
  ).toMatchSnapshot();
}

function runFormatTest(tests, parsers, options) {
  assert.deepEqual(parsers, ["mdx"]);

  let importMeta = tests;
  let snippets = [];
  if (tests.importMeta) {
    importMeta = tests.importMeta;
    snippets = tests.snippets;
  }

  const { dirname } = importMeta;

  for (const dirent of fs.readdirSync(dirname, { withFileTypes: true })) {
    if (dirent.isDirectory() || dirent.name === "format.test.js") {
      continue;
    }
    const { name } = dirent;
    test(getTitle(name, options), async () => {
      const file = path.join(dirname, name);
      const code = await fsPromises.readFile(file, "utf8");
      await runTest(code, parsers, { ...options, filepath: file });
    });
  }

  for (const [index, code] of snippets.entries()) {
    test(getTitle(`snippet: #${index}`, options), async () => {
      await runTest(code, parsers, options);
    });
  }
}

function getTitle(name, options) {
  const stringifiedOptions = stringifyOptionsForTitle(options);
  return `${name}${stringifiedOptions ? ` - ${stringifiedOptions}` : ""} format`;
}

globalThis.runFormatTest = runFormatTest;
export default runFormatTest;
