#! /usr/bin/env node

const cli = require('commander')
const {clone, sync, add, cat, auth} = require('./lib')

cli.version(require('./package.json').version)

cli.command('clone <key>').action(clone)

cli.command('sync').action(sync)

cli.command('add <file>').action(add)

cli.command('cat <file>').action(cat)

cli.command('auth <key>').action(auth)

cli.parse(process.argv)
