const electron = require('electron')
const { app, BrowserWindow, globalShortcut, Menu, MenuItem, ipcMain } = electron
const path = require('path')
const url = require('url')
const windowStateKeeper = require('electron-window-state')
let mainMenu = Menu.buildFromTemplate( require('../electron/mainMenu.js'))
const mainWindow = require('../electron/mainWindow')


global.electron = true;

app.on('ready', (e) => {
  mainWindow.createWindow();
  Menu.setApplicationMenu(mainMenu);
  initializeGlobalShortcut();
  initializeModem();
  initializeListeners();

})


app.on('before-quit', (e) => {
  console.log('App about to Quit ')
})

app.on('window-all-closed', (e) => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', (e) => {
  if (mainWindow === null) {
    // mainWindow.createMainWindow()
  }
})

function initializeGlobalShortcut(){
  globalShortcut.register('CommandOrControl+g', () => {
    console.log('User Pressed CommandOrControl + g')
  })
}

function initializeModem(){
}

function initializeListeners(){
}
