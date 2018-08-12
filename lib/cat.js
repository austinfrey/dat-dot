const path = require('path')
const hyperdrive = require('hyperdrive')
const pump = require('pump')
const {onEnd} = require('./helpers')

const dir = path.join(process.env.HOME, '.dotfiles')

function cat(file) {
	const drive = hyperdrive(path.join(dir, 'drive'))

	drive.on('ready', catFile)

	function catFile() {
		const reader = drive.createReadStream(file)

		pump(reader, process.stdout, onEnd)
	}
}

module.exports = cat
