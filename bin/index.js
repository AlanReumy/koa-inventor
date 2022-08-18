#!/usr/bin/env node
import fs from 'fs'
import chalk from 'chalk'
import { createConfig } from './config/index.js'
import { createBootstrapTemplate, createHelloRouter, createPackageJsonTemplate, createRouterIndexTemplate } from './createTemplate.js'
import { installDependencies } from './installDependencies.js'


const config = await createConfig()
const rootPath = `./${config.projectName}`
config.rootPath = rootPath
const { middleware } = config

// 1.创建文件夹
fs.mkdirSync(rootPath)

if (middleware.includes(`koa-static`)) {
  fs.mkdirSync(`./${rootPath}/static`)
}

if (middleware.includes('koa-router')) {
  fs.mkdirSync(`./${rootPath}/router`)
  fs.writeFileSync(`./${rootPath}/router/index.js`, createRouterIndexTemplate(config))
  fs.writeFileSync(`./${rootPath}/router/hello.router.js`, createHelloRouter(config))
}
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