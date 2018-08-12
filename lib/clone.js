const path = require('path')
const fs = require('fs')
const hyperdrive = require('hyperdrive')
const swarm = require('hyperdiscovery')
const mirror = require('mirror-folder')

const dir = path.join(process.env.HOME, '.dotfiles')

function clone (key, cmd) {
	const drive = hyperdrive(path.join(dir, 'drive'), key)
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

		progress.on('put-end', src => {
			fs.symlink(
				src.name,
				path.join(process.env.HOME, src.name),
				(err) => console.log(err || 'linked')
			)
		})
	}
}

module.exports = clone
