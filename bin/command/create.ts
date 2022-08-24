import chalk from 'chalk'
import fs from 'fs'
import { createConfig } from "../config/index.js"
import { createEditorConfig, createMiddleWareFile } from '../util/createStaticFile.js'
import { createBootstrapTemplate, createPackageJsonTemplate } from '../util/createTemplate.js'
import { installDependencies } from '../util/installDependencies.js'

export async function create() {
    const config = await createConfig()
    const rootPath = `./${config.projectName}`
    config.rootPath = rootPath

    // 1.创建文件夹
    fs.mkdirSync(rootPath)

    createEditorConfig(config)
    createMiddleWareFile(config)

    console.log(chalk.blue('create projectFolder successfully'));

    // 2.创建入口文件
    fs.writeFileSync(`./${rootPath}/index.js`, createBootstrapTemplate(config))
    console.log(chalk.blue('create index.js successfully'));

    // 3.创建package.json
    fs.writeFileSync(`./${rootPath}/package.json`, createPackageJsonTemplate(config))
    console.log(chalk.blue('create package.json successfully'));

    // 4.安装依赖
    console.log(chalk.blue('installing dependencies...'));

    await installDependencies(config)

    console.log(chalk.blue('install dependencies successful'));
    console.log(chalk.blue('happy coding~~'));
}