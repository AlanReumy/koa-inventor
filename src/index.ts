#!/usr/bin/env node
import { create } from "../bin/create.js";
import { generateModule } from "../bin/gm.js";
import { ProgramInfo } from "./type/program.js";
import { createProgram, getPackageJson } from "./util/createProgram.js";

const programInfo: ProgramInfo = getPackageJson()
const program = createProgram(programInfo)

program
  .command("create")
  .description("create a koa project")
  .action(() => {
    create();
  });

program
  .command("gm <module>")
  .description("create a module")
  .action((moduleName) => {
    generateModule(moduleName);
  });

program.parse();
