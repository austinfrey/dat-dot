const path = require('path')
const cli = require('commander')
const clone = require('./clone')
const sync = require('./sync')
const add = require('./add')
const cat = require('./cat')

cli.version('0.0.1')

cli.command('clone <key>').action(clone)

cli.command('sync').action(sync)

cli.command('add <file>').action(add)

cli.command('cat <file>').action(cat)

cli.parse(process.argv)
