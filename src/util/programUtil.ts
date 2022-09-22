import path from "path";
import fs from "fs";
import { Command } from "commander";
import { fileURLToPath } from "url";
import { ProgramCommand, ProgramInfo } from "../type/program";

export function getPackageJson() {
  const __dirname = fileURLToPath(import.meta.url);
  return JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../../package.json"), {
      encoding: "utf-8",
    })
  );
}

export function createProgram({ name, version, description }: ProgramInfo) {
  const program = new Command();
  program.name(name).description(description).version(version);
  return program;
}

export function registerCommands(
  program: Command,
  commandArr: ProgramCommand[]
) {
  commandArr.forEach((cmd) => {
    const { command, description, action } = cmd;
    program.command(command).description(description).action(action);
  });
}
