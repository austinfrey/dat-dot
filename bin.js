const path = require('path')
const cli = require('commander')
const { clone, sync, add, cat, auth } = require('./lib')

cli.version('0.0.1')

cli.command('clone <key>').action(clone)

cli.command('sync').action(sync)

cli.command('add <file>').action(add)

cli.command('cat <file>').action(cat)

cli.command('auth <key>').action(auth)

cli.parse(process.argv)
