const path = require('path')
const clone = require('./clone')

const key = process.argv[2].replace('dat://', '')
const dir = path.join(process.env.HOME, '.dotfiles')

clone(key)



