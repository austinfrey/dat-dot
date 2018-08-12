const path = require('path')
const fs = require('fs')

module.exports = {
	onFileAdd,
	ignore,
	onEnd
}

function onFileAdd(src, dst) {
	console.log('PUT', dst.name)
	const destDir = path.join(process.env.HOME, dst.name)
	link()

	function link() {
		fs.symlink(src.name, destDir, onLink)
	}

	function onLink(err) {
		if (err) {
			console.error(err.message)
			return fs.unlink(destDir, retry)
		}
		console.log('SYMLINK', dst.name)
	}

	function retry() {
		console.log('UNLINK', dst.name)
		link()
	}
}

function ignore(file) {
	if (file.indexOf('drive') > -1) {
		return true
	}
	return false
}

function onEnd(err) {
	if (err) {
		throw err
	}
}
