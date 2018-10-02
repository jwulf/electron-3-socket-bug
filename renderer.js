const {createConnection} = require('net')

const socket = new createConnection({port: 8124, timeout:3000}, () => {
	console.log('Renderer socket connected. Clearing timeout...')
	socket.setTimeout(0); // clear the socket timeout <- THIS DOES NOT WORK.
})

socket.on('timeout', () => console.log('Renderer timed out - this should never be called'))
