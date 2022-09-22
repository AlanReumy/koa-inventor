import typescript from "@rollup/plugin-typescript";

export default {
  input: "./src/index.ts",
  output: {
    dir: "dist",
    format: "es",
    banner: "#!/usr/bin/env node",
  },
  plugins: [typescript()],
};
