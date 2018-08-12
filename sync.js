const path = require('path')
const hyperdrive = require('hyperdrive')
const swarm = require('hyperdiscovery')
const mirror = require('mirror-folder')

const dir = path.join(process.env.HOME, '.dotfiles')

function sync (cmd) {
	const drive = hyperdrive(path.join(dir, 'drive'))
	drive.ready(syncDotFiles)

	function syncDotFiles() {
		console.log(`dat://${drive.key.toString('hex')}`)
		swarm(drive)

		const progress = mirror(__dirname, {
			name: '/', fs: drive
		}, {
			watch: true,
		}, onEnd)
	}
}

function onEnd (err) {
	if (err) throw err
	console.log('syncing files...')
}


module.exports = sync
