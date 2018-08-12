const hyperdrive = require('hyperdrive')

function auth (key, cmd) {
	const drive = hyperdrive(dir)

	drive.ready(ready)

	function ready () {
		drive.authorize(key, onAuth)
	}
}

function onAuth (err) {
	if (err) throw err
}

module.exports = auth
