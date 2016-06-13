const electron = require('electron')

let window

electron.app.on('ready', () => {
	let size = electron.screen.getPrimaryDisplay().workAreaSize
	window = new electron.BrowserWindow({ width: size.width - 800, height: size.height - 400 })
	window.loadURL(`file://${__dirname}/index.html`)
	window.webContents.openDevTools()
})

