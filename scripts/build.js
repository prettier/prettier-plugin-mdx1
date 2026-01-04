import path from "node:path";
import fs from "node:fs/promises";
import url from "node:url";
import esbuild from "esbuild";
import esbuildPluginAddDefaultExport from "./esbuild-plugin-add-default-export.js";
import esbuildPluginReplaceModule from "./esbuild-plugin-replace-module.js";
import esbuildPluginUmd from "./esbuild-plugin-umd.js";
import packageJson from "../package.json" with { type: "json" };
import esbuildPluginEvaluate from "./esbuild-plugin-evaluate.js";

const minify = !process.argv.includes("--no-minify");
const moduleReplacements = [
  {
    module: url.fileURLToPath(
      import.meta.resolve("parse-entities/decode-entity.browser.js"),
    ),
    path: url.fileURLToPath(
      import.meta.resolve("parse-entities/decode-entity.js"),
    ),
  },
];

function bundle(format) {
  const options = {
    entryPoints: [path.join(import.meta.dirname, "../lib/index.js")],
    bundle: true,
    external: ["prettier"],
    tsconfigRaw: JSON.stringify({}),
    target: ["node14"],
    format,
    minify,
    outfile: path.join(
      import.meta.dirname,
      `../dist/index.${format === "esm" ? "mjs" : "js"}`,
    ),
    plugins: [
      esbuildPluginEvaluate(),
      esbuildPluginReplaceModule({ replacements: moduleReplacements }),
      format === "esm" ? esbuildPluginAddDefaultExport() : undefined,
      format === "umd"
        ? esbuildPluginUmd({ name: "prettierPlugins.mdx2" })
        : undefined,
    ].filter(Boolean),
    legalComments: "none",
    supported: {
      // https://github.com/evanw/esbuild/issues/3471
      "regexp-unicode-property-escapes": true,
      // Maybe because Node.js v14 doesn't support "spread parameters after optional chaining" https://node.green/
      "optional-chain": true,
      // Maybe because https://github.com/evanw/esbuild/pull/3167?
      "class-field": true,
      "class-private-field": true,
      "class-private-method": true,
    },
  };

  return esbuild.build(options);
}

await bundle("esm");
await bundle("umd");
await fs.copyFile(
  new URL("../readme.md", import.meta.url),
  new URL("../dist/readme.md", import.meta.url),
);
await fs.copyFile(
  new URL("../license", import.meta.url),
  new URL("../dist/license", import.meta.url),
);
await fs.writeFile(
  new URL("../dist/package.json", import.meta.url),
  JSON.stringify(
    {
      ...packageJson,
      files: undefined,
      scripts: undefined,
      dependencies: undefined,
      devDependencies: undefined,
      type: "commonjs",
      exports: {
        require: "./index.js",
        default: "./index.mjs",
      },
    },
    undefined,
    minify ? undefined : "\t",
  ),
);
