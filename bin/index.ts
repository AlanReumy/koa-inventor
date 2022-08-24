#!/usr/bin/env node
import { Command } from 'commander'
import { create } from './command/create.js'

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

program.parse();
