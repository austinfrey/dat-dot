const path = require('path')
const fs = require('fs')
const hyperdrive = require('hyperdrive')
const swarm = require('hyperdiscovery')
const mirror = require('mirror-folder')

const dir = path.join(process.env.HOME, '.dotfiles')

module.exports = sync

function sync (cmd) {
	const drive = hyperdrive(path.join(dir, 'drive'))
	drive.ready(syncDotFiles)

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

function onFileAdd(src, dst) {
	console.log('PUT', dst.name)
	const destDir = path.join(process.env.HOME, dst.name)
	link()

	function link() {
		fs.symlink(src.name, destDir, onLink)
	}

	function onLink (err) {
		if (err) {
			return fs.unlink(destDir, retry)
		}
		console.log('SYMLINK', dst.name)
	}

	function retry (err) {
		console.log('UNLINK', dst.name)
		link()
	}
}

function ignore (file) {
	if (file.indexOf('drive') > -1) return true
	return false
}

function onEnd (err) {
	if (err) throw err
	console.log('Done loading files.')
}
