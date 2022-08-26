import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { createConfig } from "../config/index.js"
import { createEditorConfig, createEsLint, createMiddleWareFile } from '../util/createStaticFile.js'
import { createBootstrapTemplate, createPackageJsonTemplate } from '../util/createTemplate.js'
import { installDependencies } from '../util/installDependencies.js'

export async function create() {
    const config = await createConfig()
    const rootPath = `./${config.projectName}`
    config.rootPath = rootPath

    // create folder
    fs.mkdirSync(rootPath)


    createEditorConfig(config)
    createEsLint(config)
    createMiddleWareFile(config)

    console.log(chalk.blue('create projectFolder successfully'));

    // create index.js
    fs.writeFileSync(`./${rootPath}/index.js`, createBootstrapTemplate(config))
    console.log(chalk.blue('create index.js successfully'));

    // create other folder
    createOtherFolder(rootPath)

    // create package.json
    fs.writeFileSync(`./${rootPath}/package.json`, createPackageJsonTemplate(config))
    console.log(chalk.blue('create package.json successfully'));

    // install dependencies
    console.log(chalk.blue('installing dependencies...'));

    await installDependencies(config)

    console.log(chalk.blue('install dependencies successful'));
    console.log(chalk.blue('happy coding~~'));
}

export function createOtherFolder(rootPath: string) {
    fs.mkdirSync(path.resolve(rootPath, "service"))
    fs.mkdirSync(path.resolve(rootPath, "controller"))
    fs.mkdirSync(path.resolve(rootPath, "util"))
    fs.mkdirSync(path.resolve(rootPath, "middleware"))
    fs.mkdirSync(path.resolve(rootPath, "constant"))
}