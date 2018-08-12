const path = require('path')
const fs = require('fs')
const pump = require('pump')
const { onEnd } = require('./helpers')

const dir = path.join(process.env.HOME, '.dotfiles')

function add (file, cmd) {
	const filePath = path.join(__dirname, `../${file}`)
	addFile()

	function addFile () {
		const reader = fs.createReadStream(filePath)
		const writer = fs.createWriteStream(path.join(dir, file))

		pump(reader, writer, onEnd)
	}
}

module.exports = add
