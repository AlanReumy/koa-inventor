import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import ejs from 'ejs'
import prettier from 'prettier'
import { Config, TemplateConfig } from '../type/config.js'

export function createTemplate(templateConfig: TemplateConfig) {
  const { config, pathString, parser } = templateConfig
  const __dirname = fileURLToPath(import.meta.url)
  const template = fs.readFileSync(path.resolve(__dirname, pathString))
  const code = ejs.render(template.toString(), config)
  return prettier.format(code, { parser: parser })
}

export function createBootstrapTemplate(config: Config) {
  return createTemplate({ config, pathString: '../../../../templates/index.ejs', parser: "babel" })
}

export function createPackageJsonTemplate(config: Config) {
  return createTemplate({ config, pathString: '../../../../templates/package.ejs', parser: 'json' })
}

export function createEsLintTemplate() {
  return createTemplate({ pathString: '../../../../templates/util/eslint.ejs', parser: 'json' })
}

export function createPrettierTemplate() {
  return createTemplate({ pathString: '../../../../templates/util/prettier.ejs', parser: 'json' })
}

export function createRouterIndexTemplate(config: Config) {
  return createTemplate({ config, pathString: '../../../../templates/routerIndex.ejs', parser: 'babel' })
}

export function createHelloRouterTemplate(config: Config) {
  return createTemplate({ config, pathString: '../../../../templates/hello.router.ejs', parser: 'babel' })
}

export function createServiceTemplate(moduleName: string) {
  return createTemplate({ config: { moduleName }, pathString: '../../../../templates/module/service.ejs', parser: 'babel' })
}

export function createControllerTemplate(moduleName: string) {
  return createTemplate({ config: { moduleName }, pathString: '../../../../templates/module/controller.ejs', parser: 'babel' })
}

export function createRouterTemplate(moduleName: string) {
  return createTemplate({ config: { moduleName }, pathString: '../../../../templates/module/router.ejs', parser: 'babel' })
}
