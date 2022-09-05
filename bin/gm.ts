import fs from "fs";
import {
  createControllerTemplate,
  createRouterTemplate,
  createServiceTemplate,
} from "../src/util/createTemplate.js";

export function generateModule(moduleName: string) {
  createService(moduleName);
  createController(moduleName);
  createRouter(moduleName);
}

function createRouter(moduleName: string) {
  fs.writeFileSync(
    `router/${moduleName}.router.js`,
    createRouterTemplate(moduleName)
  );
}

function createController(moduleName: string) {
  fs.writeFileSync(
    `controller/${moduleName}.controller.js`,
    createControllerTemplate(moduleName)
  );
}

function createService(moduleName: string) {
  fs.writeFileSync(
    `service/${moduleName}.service.js`,
    createServiceTemplate(moduleName)
  );
}
