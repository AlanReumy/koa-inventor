import { execa } from 'execa'
import { Config } from './type/config'

export async function installDependencies(config: Config) {
  const { packageManager, rootPath } = config
  const installStatement = packageManager.includes('npm') ? `${packageManager} install` : 'yarn'
  await (execa(installStatement, {
    cwd: rootPath,
  }))
}