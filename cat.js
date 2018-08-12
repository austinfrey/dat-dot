const path = require('path')
const fs = require('fs')
const hyperdrive = require('hyperdrive')
const pump = require('pump')

const dir = path.join(process.env.HOME, '.dotfiles')

function cat (file, cmd) {
	const drive = hyperdrive(path.join(dir, 'drive'))

	drive.on('ready', catFile)

	function catFile () {
		const a = drive.createReadStream(file)

		pump(a, process.stdout, onEnd)
	}
}

function onEnd (err) {
	if (err) throw err
}

module.exports = cat
