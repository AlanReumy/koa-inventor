import path from "path";
import fs from 'fs'
import { Command } from "commander";
import { fileURLToPath } from "url";
import { ProgramInfo } from "../type/program";

export function createProgram({ name, version, description }: ProgramInfo) {
  const program = new Command();
  program.name(name).description(description).version(version);
  return program
}

export function getPackageJson() {
  const __dirname = fileURLToPath(import.meta.url)
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../../package.json'), { encoding: 'utf-8' }))
}
