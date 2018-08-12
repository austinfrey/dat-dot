const path = require('path')
const hyperdrive = require('hyperdrive')
const swarm = require('hyperdiscovery')
const mirror = require('mirror-folder')
const { onFileAdd, ignore, onEnd } = require('./helpers')

const dir = path.join(process.env.HOME, '.dotfiles')

function sync (cmd) {
	const drive = hyperdrive(path.join(dir, 'drive'))
	drive.on('ready', syncDotFiles)

	function syncDotFiles() {
		console.log(`dat://${drive.key.toString('hex')}`)
		swarm(drive)

		const progress = mirror(dir, {
			name: '/', fs: drive
		}, {
			ignore, watch: true,
		}, onEnd)

		progress.on('put-end', onFileAdd)
	}
}


module.exports = sync
