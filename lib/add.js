const path = require('path')
const fs = require('fs')
const pump = require('pump')
const {onEnd} = require('./helpers')

const dir = path.join(process.env.HOME, '.dotfiles')

function add(file) {
	addFile()

	function addFile() {
		const reader = fs.createReadStream(file)
		const writer = fs.createWriteStream(path.join(dir, file))

		pump(reader, writer, onEnd)
	}
}

module.exports = add
