const options = {
  proseWrap: {
    category: "Common",
    type: "choice",
    default: "preserve",
    description: "How to wrap prose.",
    choices: [
      {
        value: "always",
        description: "Wrap prose if it exceeds the print width.",
      },
      {
        value: "never",
        description: "Do not wrap prose.",
      },
      {
        value: "preserve",
        description: "Wrap prose as-is.",
      },
    ],
  },
  singleQuote: {
    category: "Common",
    type: "boolean",
    default: false,
    description: "Use single quotes instead of double quotes.",
  },
};

export default options;
