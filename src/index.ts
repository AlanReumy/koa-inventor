import { create } from "../bin/create.js";
import { generateModule } from "../bin/gm.js";
import { ProgramCommand, ProgramInfo } from "./type/program.js";
import { createProgram, getPackageJson, registerCommands } from "./util/programUtil.js";

const programInfo: ProgramInfo = getPackageJson()
const program = createProgram(programInfo)
const commands: ProgramCommand[] = [
  {
    command: 'create',
    description: 'create a koa project',
    action: create
  },
  {
    command: 'gm <module>',
    description: 'create a module',
    action: (moduleName: string) => {
      generateModule(moduleName);
    }
  },
]

registerCommands(program, commands)

program.parse();
