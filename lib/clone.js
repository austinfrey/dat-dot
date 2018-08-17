const path = require('path')
const hyperdrive = require('hyperdrive')
const swarm = require('hyperdiscovery')
const mirror = require('mirror-folder')
const {onFileAdd, onEnd} = require('./helpers')

const dir = path.join(process.env.HOME, '.dotfiles')

/*
 * Currently creates an endless loop when cloning
 * ENOENT: no such file or directory, symlink '/.vimrc' -> '/home/pi/home/pi/.dotfiles/.vimrc'
 * ENOENT: no such file or directory, symlink '/.vimrc' -> '/home/pi/home/pi/.dotfiles/.vimrc'
 * UNLINK /home/pi/.dotfiles/.vimrc
 * UNLINK /home/pi/.dotfiles/.vimrc
*/
function clone(key) {
	const drive = hyperdrive(path.join(dir, 'drive'), key)
	drive.on('ready', joinSwarm)

	function joinSwarm() {
		const sw = swarm(drive)
		sw.on('peer', mirrorFolders)
	}

	function mirrorFolders() {
		const progress = mirror({
			name: '/', fs: drive
		}, dir, onEnd)

		progress.on('put-end', onFileAdd)
	}
}

module.exports = clone
