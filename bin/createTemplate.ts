import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import ejs from 'ejs'
import prettier from 'prettier'
import { Config } from './types/config'


export function createBootstrapTemplate(config: Config) {
  const __dirname = fileURLToPath(import.meta.url)
  const template = fs.readFileSync(path.resolve(__dirname, '../../templates/index.ejs'))
  const code = ejs.render(template.toString(), config)
  return prettier.format(code, { parser: "babel" })
}

export function createPackageJsonTemplate(config: Config) {
  const __dirname = fileURLToPath(import.meta.url)
  const template = fs.readFileSync(path.resolve(__dirname, '../../templates/package.ejs'))
  const code = ejs.render(template.toString(), config)
  return prettier.format(code, { parser: 'json' })
}

export function createRouterIndexTemplate(config: Config) {
  const __dirname = fileURLToPath(import.meta.url)
  const template = fs.readFileSync(path.resolve(__dirname, '../../templates/routerIndex.ejs'))
  const code = ejs.render(template.toString(), config)
  return prettier.format(code, { parser: 'babel' })
}

export function createHelloRouter(config: Config) {
  const __dirname = fileURLToPath(import.meta.url)
  const template = fs.readFileSync(path.resolve(__dirname, '../../templates/hello.router.ejs'))
  const code = ejs.render(template.toString(), config)
  return prettier.format(code, { parser: 'babel' })
}

export function createEditorConfig(config: Config) {
  const editorconfig = `
    root = true
    [*]
    indent_style = space
    indent_size = 2
    end_of_line = lf
    charset = utf-8
    trim_trailing_whitespace = true
    insert_final_newline = true

    [*.md]
    trim_trailing_whitespace = false

    [Makefile]
    indent_style = tab
  `
  fs.writeFileSync(`./${config.rootPath}/.editorconfig`, editorconfig)
}