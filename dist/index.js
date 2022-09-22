#!/usr/bin/env node
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import ejs from 'ejs';
import prettier from 'prettier';
import process from 'process';
import { execa } from 'execa';
import { Command } from 'commander';
import { fileURLToPath } from 'url';

function projectNameConfig() {
    return {
        type: "input",
        name: "projectName",
        validate(projectName) {
            if (projectName)
                return true;
            return "please enter your project name!";
        },
    };
}

function middlewareConfig() {
    return {
        type: "checkbox",
        name: "middleware",
        choices: ["koa-static", "koa-router", "koa-bodyparser", '@koa/cors'],
    };
}

function portConfig() {
    return {
        type: "number",
        name: "port",
        default: 8080,
    };
}

function packageManagerConfig() {
    return {
        type: "rawlist",
        name: "packageManager",
        choices: ["npm", "yarn", "pnpm"],
    };
}

async function createConfig() {
    return await inquirer.prompt([
        projectNameConfig(),
        middlewareConfig(),
        portConfig(),
        packageManagerConfig(),
    ]);
}

function createTemplate(templateConfig) {
    const { config, pathString, parser } = templateConfig;
    const template = fs.readFileSync(path.resolve(process.cwd(), pathString));
    const code = ejs.render(template.toString(), config);
    let formatCode;
    try {
        formatCode = prettier.format(code, { parser: parser });
    }
    catch (e) {
        throw new Error("please install prettier globally");
    }
    return formatCode;
}
function createBootstrapTemplate(config) {
    return createTemplate({
        config,
        pathString: "./templates/index.ejs",
        parser: "babel",
    });
}
function createPackageJsonTemplate(config) {
    return createTemplate({
        config,
        pathString: "./templates/package.ejs",
        parser: "json",
    });
}
function createEsLintTemplate() {
    return createTemplate({
        pathString: "./templates/util/eslint.ejs",
        parser: "json",
    });
}
function createPrettierTemplate() {
    return createTemplate({
        pathString: "./templates/util/prettier.ejs",
        parser: "json",
    });
}
function createRouterIndexTemplate(config) {
    return createTemplate({
        config,
        pathString: "./templates/routerIndex.ejs",
        parser: "babel",
    });
}
function createHelloRouterTemplate(config) {
    return createTemplate({
        config,
        pathString: "./templates/hello.router.ejs",
        parser: "babel",
    });
}
function createServiceTemplate(moduleName) {
    return createTemplate({
        config: { moduleName },
        pathString: "./templates/module/service.ejs",
        parser: "babel",
    });
}
function createControllerTemplate(moduleName) {
    return createTemplate({
        config: { moduleName },
        pathString: "./templates/module/controller.ejs",
        parser: "babel",
    });
}
function createRouterTemplate(moduleName) {
    return createTemplate({
        config: { moduleName },
        pathString: "./templates/module/router.ejs",
        parser: "babel",
    });
}

function createEditorConfig(rootPath) {
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
  `;
    fs.writeFileSync(`./${rootPath}/.editorconfig`, editorconfig);
}
function createMiddleWareFile(config) {
    const { middleware, rootPath } = config;
    if (middleware.includes("koa-static")) {
        fs.mkdirSync(`./${rootPath}/static`);
    }
    if (middleware.includes("koa-router")) {
        fs.mkdirSync(`./${rootPath}/router`);
        fs.writeFileSync(`./${rootPath}/router/index.js`, createRouterIndexTemplate(config));
        fs.writeFileSync(`./${rootPath}/router/hello.router.js`, createHelloRouterTemplate(config));
    }
}
function createEsLintConfig(rootPath) {
    fs.writeFileSync(`./${rootPath}/.eslintrc.json`, createEsLintTemplate());
}
function createPrettierConfig(rootPath) {
    fs.writeFileSync(`./${rootPath}/.prettierrc.json`, createPrettierTemplate());
}

async function installDependencies(config) {
    const { packageManager, rootPath } = config;
    const installStatement = packageManager.includes("npm")
        ? `${packageManager} install`
        : "yarn";
    await execa(installStatement, undefined, {
        cwd: rootPath,
    });
}

async function create() {
    const config = await createConfig();
    const rootPath = `./${config.projectName}`;
    config.rootPath = rootPath;
    createRootFolder(rootPath);
    createEditorConfig(rootPath);
    createEsLintConfig(rootPath);
    createPrettierConfig(rootPath);
    createMiddleWareFile(config);
    createIndexJs(config);
    createOtherFolder(config);
    createPackageJson(config);
    createGitIgnoreFile(rootPath);
    await installDependenciesProcess(config);
}
function createRootFolder(rootPath) {
    try {
        fs.mkdirSync(rootPath);
    }
    catch (e) {
        throw new Error("this directory existed!");
    }
    console.log(chalk.blue("create projectFolder successfully"));
}
function createIndexJs(config) {
    const { rootPath } = config;
    fs.writeFileSync(`./${rootPath}/index.js`, createBootstrapTemplate(config));
    console.log(chalk.blue("create index.js successfully"));
}
function createPackageJson(config) {
    const { rootPath } = config;
    fs.writeFileSync(`./${rootPath}/package.json`, createPackageJsonTemplate(config));
    console.log(chalk.blue("create package.json successfully"));
}
async function installDependenciesProcess(config) {
    console.log(chalk.blue("installing dependencies..."));
    await installDependencies(config);
    console.log(chalk.blue("install dependencies successful"));
    console.log(chalk.blue("happy coding~~"));
}
function createOtherFolder(config) {
    const { rootPath, middleware } = config;
    if (middleware.includes("koa-router")) {
        fs.mkdirSync(path.resolve(rootPath, "service"));
        fs.mkdirSync(path.resolve(rootPath, "controller"));
        fs.mkdirSync(path.resolve(rootPath, "util"));
        fs.mkdirSync(path.resolve(rootPath, "middleware"));
        fs.mkdirSync(path.resolve(rootPath, "constant"));
    }
}
function createGitIgnoreFile(rootPath) {
    fs.writeFileSync(`./${rootPath}/.gitignore`, `
.idea
!.gitignore
!.gitkeep
*/node_modules
**/node_modules
xx/xx/node_modules/node_modules/
**/npm-debug.log
npm-debug.log
.DS_Store
**/.DS_Store
*/.DS_Store
.vscode
*.log
**/*.log
npmlist.json
`);
}

function generateModule(moduleName) {
    createService(moduleName);
    createController(moduleName);
    createRouter(moduleName);
}
function createRouter(moduleName) {
    fs.writeFileSync(`router/${moduleName}.router.js`, createRouterTemplate(moduleName));
}
function createController(moduleName) {
    fs.writeFileSync(`controller/${moduleName}.controller.js`, createControllerTemplate(moduleName));
}
function createService(moduleName) {
    fs.writeFileSync(`service/${moduleName}.service.js`, createServiceTemplate(moduleName));
}

function getPackageJson() {
    fileURLToPath(import.meta.url);
    return JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "./package.json"), {
        encoding: "utf-8",
    }));
}
function createProgram({ name, version, description }) {
    const program = new Command();
    program.name(name).description(description).version(version);
    return program;
}
function registerCommands(program, commandArr) {
    commandArr.forEach((cmd) => {
        const { command, description, action } = cmd;
        program.command(command).description(description).action(action);
    });
}

const programInfo = getPackageJson();
const program = createProgram(programInfo);
const commands = [
    {
        command: 'create',
        description: 'create a koa project',
        action: create
    },
    {
        command: 'gm <module>',
        description: 'create a module',
        action: (moduleName) => {
            generateModule(moduleName);
        }
    },
];
registerCommands(program, commands);
program.parse();
