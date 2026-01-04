import { defineConfig } from "vitest/config";

export default {
  test: {
    include: ["tests/**/format.test.js"],
    setupFiles: ["./tests/setup.js"],
    snapshotSerializers: ["jest-snapshot-serializer-raw"],
  },
};
