const path = require('path')
const hyperdrive = require('hyperdrive')
const ram = require('random-access-memory')
const swarm = require('hyperdiscovery')
const mirror = require('mirror-folder')

const dir = path.join(process.env.HOME, '.dotfiles')

function clone (key) {
	const drive = hyperdrive(ram, key)
	drive.on('ready', joinSwarm)

	function joinSwarm () {
		const sw = swarm(drive)
		sw.on('peer', mirrorFolders)
	}

	function mirrorFolders () {
		const progress = mirror({
			name: '/', fs: drive
		}, dir, err => {
			if (err) throw err
			console.log('Folders synced')
		})
	}
}

module.exports = clone
