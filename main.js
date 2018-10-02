// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
require('electron-debug')({ 
	showDevTools: true,
	devToolsMode: 'right'
})

const {Server, createConnection} = require('net')

let mainWindow

async function createWindow () {
	mainWindow = new BrowserWindow({width: 800, height: 600})
	let connectedClients = 0

	console.log('Creating socket server...')
	const server = new Server(c => {
		console.log(`Socket client #${++connectedClients} connected`)
	})
	server.listen(8124, () => {
		console.log('Socket server started');
		const s = new createConnection({port: 8124, timeout:3000}, () => {
			console.log('Main socket connected. Clearing timeout...')
			s.setTimeout(0) // clear the socket timeout <- THIS DOES WORK
		})
		s.on('timeout', () => console.log('Main socket timed out. This should never be called.'))
	});


	mainWindow.loadFile('index.html')

	mainWindow.on('closed', function () {
		mainWindow = null
	})
}


app.on('ready', createWindow)

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow()
	}
})

