const { app, BrowserWindow } = require('electron')
const path = require('path')
const electron = require('electron')
const ipc = electron.ipcMain


function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
    //   preload: path.join(__dirname, 'preload.js')
        nodeIntegration: true  //require같은 기능 사용 가능하도록
    }
  })

  win.loadFile('./html/index.html');
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})






app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})