const path = require('path')
const hyperdrive = require('hyperdrive')

const dir = path.join(process.env.HOME, 'drive')

function auth(key) {
	const drive = hyperdrive(dir)

	drive.ready(ready)

	function ready() {
		drive.authorize(key, onAuth)
	}
}

function onAuth(err) {
	if (err) {
		throw err
	}
}

module.exports = auth
