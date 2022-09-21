import chalk from "chalk";
import fs from "fs";
import path from "path";
import { createConfig } from "../src/config/index.js";
import { Config } from "../src/type/config.js";
import {
  createEditorConfig,
  createEsLintConfig,
  createMiddleWareFile,
  createPrettierConfig,
} from "../src/util/createStaticFile.js";
import {
  createBootstrapTemplate,
  createPackageJsonTemplate,
} from "../src/util/createTemplate.js";
import { installDependencies } from "../src/util/installDependencies.js";

export async function create() {
  const config = await createConfig();
  const rootPath = `./${config.projectName}`;
  config.rootPath = rootPath;

  createRootFolder(rootPath)

  createEditorConfig(rootPath);
  createEsLintConfig(rootPath);
  createPrettierConfig(rootPath);
  createMiddleWareFile(config);

  createIndexJs(config)
  createOtherFolder(config);
  createPackageJson(config)
  createGitIgnoreFile(rootPath)

  await installDependenciesProcess(config)
}

function createRootFolder(rootPath: string) {
  try{
    fs.mkdirSync(rootPath);
  } catch(e) {
    throw new Error("this directory existed!")
  }
  console.log(chalk.blue("create projectFolder successfully"));
}

function createIndexJs(config: Config) {
  const { rootPath } = config
  fs.writeFileSync(`./${rootPath}/index.js`, createBootstrapTemplate(config));
  console.log(chalk.blue("create index.js successfully"));
}

function createPackageJson(config: Config) {
  const { rootPath } = config
  fs.writeFileSync(
    `./${rootPath}/package.json`,
    createPackageJsonTemplate(config)
  );
  console.log(chalk.blue("create package.json successfully"));
}

async function installDependenciesProcess(config: Config) {
  console.log(chalk.blue("installing dependencies..."));
  await installDependencies(config);
  console.log(chalk.blue("install dependencies successful"));
  console.log(chalk.blue("happy coding~~"));
}

function createOtherFolder(config: Config) {
  const { rootPath, middleware } = config;
  if (middleware.includes("koa-router")) {
    fs.mkdirSync(path.resolve(rootPath, "service"));
    fs.mkdirSync(path.resolve(rootPath, "controller"));
    fs.mkdirSync(path.resolve(rootPath, "util"));
    fs.mkdirSync(path.resolve(rootPath, "middleware"));
    fs.mkdirSync(path.resolve(rootPath, "constant"));
  }
}

function createGitIgnoreFile(rootPath: string) {
  fs.writeFileSync(`./${rootPath}/.gitignore`, `
.idea
!.gitignore
!.gitkeep
*/node_modules
**/node_modules
xx/xx/node_modules/node_modules/
**/npm-debug.log
npm-debug.log
.DS_Store
**/.DS_Store
*/.DS_Store
.vscode
*.log
**/*.log
npmlist.json
`)
}
