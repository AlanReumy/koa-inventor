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

  createFolder(rootPath)
  createEditorConfig(config);
  createEsLintConfig(config);
  createPrettierConfig(config);
  createMiddleWareFile(config);

  // create index.js
  fs.writeFileSync(`./${rootPath}/index.js`, createBootstrapTemplate(config));
  console.log(chalk.blue("create index.js successfully"));

  // create other folder
  createOtherFolder(config);

  // create package.json
  fs.writeFileSync(
    `./${rootPath}/package.json`,
    createPackageJsonTemplate(config)
  );
  console.log(chalk.blue("create package.json successfully"));

  // install dependencies
  console.log(chalk.blue("installing dependencies..."));

  await installDependencies(config);

  console.log(chalk.blue("install dependencies successful"));
  console.log(chalk.blue("happy coding~~"));


  function createFolder(rootPath: string) {
    fs.mkdirSync(rootPath);
    console.log(chalk.blue("create projectFolder successfully"));
  }
}

export function createOtherFolder(config: Config) {
  const { rootPath, middleware } = config;
  if (middleware.includes("koa-router")) {
    fs.mkdirSync(path.resolve(rootPath, "service"));
    fs.mkdirSync(path.resolve(rootPath, "controller"));
    fs.mkdirSync(path.resolve(rootPath, "util"));
    fs.mkdirSync(path.resolve(rootPath, "middleware"));
    fs.mkdirSync(path.resolve(rootPath, "constant"));
  }
}
