#!/usr/bin/env node
import { Command } from 'commander'
import { create } from '../bin/create.js'
import { generateModule } from '../bin/gm.js';

const program = new Command();

program
    .name("koa-inventor")
    .description("a cli for koa")
    .version("1.0.4");

program.command('create')
    .description('create a koa project')
    .action(() => {
        create()
    })

program.command('gm <module>')
    .description('create a module')
    .action((moduleName) => {
        generateModule(moduleName)
    })


program.parse();
