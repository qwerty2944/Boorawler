const electron = require('electron');
// const { app, BrowserWindow } = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const ipc = electron.ipcMain;




function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
    //   preload: path.join(__dirname, 'preload.js')
        nodeIntegration: true,  //require같은 기능 사용 가능하도록
        contextIsolation: false //이것도해야 require 가능
    }
  })

  win.loadFile('./html/index.html');
  win.setMenu(null); //top 메뉴바 삭제
  win.webContents.openDevTools() //디버깅창
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