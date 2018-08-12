const hyperdrive = require('hyperdrive')
const ram = require('random-access-memory')
const swarm = require('hyperdiscovery')
const mirror = require('mirror-folder')

const drive = hyperdrive(ram)

function syncDotFiles() {
	console.log('[ KEY ]', `dat://${drive.key.toString('hex')}`)
	swarm(drive)

	const progress = mirror(__dirname, {
		name: '/', fs: drive
	}, onEnd)
}

function onEnd (err) {
	if (err) throw err
	console.log('files synced')
}

drive.ready(syncDotFiles)
