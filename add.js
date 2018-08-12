const path = require('path')
const fs = require('fs')
const hyperdrive = require('hyperdrive')
const pump = require('pump')

const dir = path.join(process.env.HOME, '.dotfiles')

function add (file, cmd) {
	const filePath = path.join(__dirname, file)
	const drive = hyperdrive(path.join(dir, 'drive'))

	drive.on('ready', addFile)

	function addFile () {
		const f = fs.createReadStream(filePath)
		const a = drive.createWriteStream(file)

		pump(f, a, onEnd)
	}
}

function onEnd (err) {
	if (err) throw err
}

module.exports = add
