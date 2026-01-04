import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/format.test.js"],
    setupFiles: ["./tests/setup.js"],
    snapshotSerializers: ["jest-snapshot-serializer-raw"],
    coverage: {
      enabled: true,
      reporter: ["lcov", "text"],
    },
  },
});
