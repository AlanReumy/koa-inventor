import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import ejs from 'ejs'
import prettier from 'prettier'


export function createBootstrapTemplate(config) {
  const __dirname = fileURLToPath(import.meta.url)
  const template = fs.readFileSync(path.resolve(__dirname, '../../templates/index.ejs'))
  const code = ejs.render(template.toString(), config)
  return prettier.format(code, { parser: "babel" })
}

export function createPackageJsonTemplate(config) {
  const __dirname = fileURLToPath(import.meta.url)
  const template = fs.readFileSync(path.resolve(__dirname, '../../templates/package.ejs'))
  const code = ejs.render(template.toString(), config)
  return prettier.format(code, { parser: 'json' })
}

export function createRouterIndexTemplate(config) {
  const __dirname = fileURLToPath(import.meta.url)
  const template = fs.readFileSync(path.resolve(__dirname, '../../templates/routerIndex.ejs'))
  const code = ejs.render(template.toString(), config)
  return prettier.format(code, { parser: 'babel' })
}

export function createHelloRouter(config) {
  const __dirname = fileURLToPath(import.meta.url)
  const template = fs.readFileSync(path.resolve(__dirname, '../../templates/hello.router.ejs'))
  const code = ejs.render(template.toString(), config)
  return prettier.format(code, { parser: 'babel' })
}