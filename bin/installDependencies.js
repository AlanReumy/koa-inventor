import { execa } from 'execa'

export async function installDependencies(config) {
  const { packageManager, rootPath } = config
  const installStatement = packageManager.includes('npm') ? `${packageManager} install` : 'yarn'
  await (execa(installStatement, {
    cwd: rootPath,
  }))
}