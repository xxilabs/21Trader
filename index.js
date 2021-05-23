const { app, BrowserWindow } = require('electron')
const path = require('path')

const server = require('./21trader');

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.loadURL("http://localhost:65435")
  win.on("closed", function () {
    win = null;
  });
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
