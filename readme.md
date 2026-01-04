# @prettier/plugin-mdx1

[![Npm Version](https://img.shields.io/npm/v/@prettier/plugin-mdx1.svg?style=flat-square)](https://www.npmjs.com/package/@prettier/plugin-mdx1)
[![MIT License](https://img.shields.io/npm/l/@prettier/plugin-mdx1.svg?style=flat-square)](https://github.com/prettier/prettier-plugin-mdx1/blob/main/license)

> Prettier plugin for MDX1.

> [!IMPORTANT]
> This plugin extracted for MDX1 users from prettier v3.7.
>
> Please migrate to MDX3, and use the builtin parser if possible.
>
> This plugin only change if bugs found, won't add any new features.

## Install

```bash
yarn add --dev --exact prettier @prettier/plugin-mdx1
```

## Usage

Create or modify your [prettier configuration file](https://prettier.io/docs/en/configuration) to use the plugin:

```js
// prettier.config.mjs
import * as prettierPluginMdx1 from "@prettier/plugin-mdx1";

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  plugins: [prettierPluginMdx1],
};

export default config;
```

