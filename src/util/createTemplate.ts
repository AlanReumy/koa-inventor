import fs from "fs";
import path from "path";
import ejs from "ejs";
import prettier from "prettier";
import { Config, TemplateConfig } from "../type/config.js";
import process from "process";

export function createTemplate(templateConfig: TemplateConfig) {
  const { config, pathString, parser } = templateConfig;
  const template = fs.readFileSync(path.resolve(process.cwd(), pathString));
  const code = ejs.render(template.toString(), config);
  let formatCode;
  try {
    formatCode = prettier.format(code, { parser: parser });
  } catch (e) {
    throw new Error("please install prettier globally");
  }
  return formatCode;
}

export function createBootstrapTemplate(config: Config) {
  return createTemplate({
    config,
    pathString: "./templates/index.ejs",
    parser: "babel",
  });
}

export function createPackageJsonTemplate(config: Config) {
  return createTemplate({
    config,
    pathString: "./templates/package.ejs",
    parser: "json",
  });
}

export function createEsLintTemplate() {
  return createTemplate({
    pathString: "./templates/util/eslint.ejs",
    parser: "json",
  });
}

export function createPrettierTemplate() {
  return createTemplate({
    pathString: "./templates/util/prettier.ejs",
    parser: "json",
  });
}

export function createRouterIndexTemplate(config: Config) {
  return createTemplate({
    config,
    pathString: "./templates/routerIndex.ejs",
    parser: "babel",
  });
}

export function createHelloRouterTemplate(config: Config) {
  return createTemplate({
    config,
    pathString: "./templates/hello.router.ejs",
    parser: "babel",
  });
}

export function createServiceTemplate(moduleName: string) {
  return createTemplate({
    config: { moduleName },
    pathString: "./templates/module/service.ejs",
    parser: "babel",
  });
}

export function createControllerTemplate(moduleName: string) {
  return createTemplate({
    config: { moduleName },
    pathString: "./templates/module/controller.ejs",
    parser: "babel",
  });
}

export function createRouterTemplate(moduleName: string) {
  return createTemplate({
    config: { moduleName },
    pathString: "./templates/module/router.ejs",
    parser: "babel",
  });
}
