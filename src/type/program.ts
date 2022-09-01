import { Command } from "commander"

export type ProgramInfo = Record<'name' | 'version' | 'description', string>

export type ProgramCommand = {
  command: string
  description: string
  action: Parameters<Command['action']>[0]
} 
