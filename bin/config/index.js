import inquirer from 'inquirer'
import { projectNameConfig } from './projectName.js'
import { middlewareConfig } from './middleware.js'
import { portConfig } from './port.js'
import { packageManagerConfig } from './packageManager.js'

export async function createConfig() {
  return await inquirer
    .prompt([
      projectNameConfig(),
      middlewareConfig(),
      portConfig(),
      packageManagerConfig(),
    ])
}
