#!/usr/bin/env node
import fs from 'fs'
import { createConfig } from './config/index.js'
import { createBootstrapTemplate, createPackageJsonTemplate } from './createTemplate.js'
import { execa } from 'execa'
import chalk from 'chalk'

const config = await createConfig()

function getRootPath() {
  return `./${config.projectName}`
}

// 1.创建文件夹
fs.mkdirSync(getRootPath())
config.middleware.includes('koa-static') && fs.mkdirSync(`./${getRootPath()}/static`)
console.log(chalk.blue('create projectFolder successfully'));

// 2.创建入口文件
fs.writeFileSync(`./${getRootPath()}/index.js`, createBootstrapTemplate(config))
console.log(chalk.blue('create index.js successfully'));

// 3.创建package.json
fs.writeFileSync(`./${getRootPath()}/package.json`, createPackageJsonTemplate(config))
console.log(chalk.blue('create package.json successfully'));
console.log(chalk.blue('installing dependencies...'));

// 4.安装依赖
await execa('npm install', {
  cwd: getRootPath(),
  stdio: [2, 2, 2]
})

console.log(chalk.blue('install dependencies successful'));
console.log(chalk.blue('happy hacking~~'));
console.log(chalk.blue('npm run start for opening server'));
