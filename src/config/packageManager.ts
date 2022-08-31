export function packageManagerConfig() {
  return {
    type: "rawlist",
    name: "packageManager",
    choices: ["npm", "yarn", "pnpm"],
  };
}
