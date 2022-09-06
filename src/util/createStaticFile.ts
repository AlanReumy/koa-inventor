import fs from "fs";
import { Config } from "../type/config.js";
import {
  createEsLintTemplate,
  createHelloRouterTemplate,
  createRouterIndexTemplate,
  createPrettierTemplate,
} from "./createTemplate.js";

export function createEditorConfig(rootPath: string) {
  const editorconfig = `
root = true
[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
  `;
  fs.writeFileSync(`./${rootPath}/.editorconfig`, editorconfig);
}

export function createMiddleWareFile(config: Config) {
  const { middleware, rootPath } = config;

  if (middleware.includes("koa-static")) {
    fs.mkdirSync(`./${rootPath}/static`);
  }

  if (middleware.includes("koa-router")) {
    fs.mkdirSync(`./${rootPath}/router`);
    fs.writeFileSync(
      `./${rootPath}/router/index.js`,
      createRouterIndexTemplate(config)
    );
    fs.writeFileSync(
      `./${rootPath}/router/hello.router.js`,
      createHelloRouterTemplate(config)
    );
  }
}

export function createEsLintConfig(rootPath: string) {
  fs.writeFileSync(`./${rootPath}/.eslintrc.json`, createEsLintTemplate());
}

export function createPrettierConfig(rootPath: string) {
  fs.writeFileSync(`./${rootPath}/.prettierrc.json`, createPrettierTemplate());
}

