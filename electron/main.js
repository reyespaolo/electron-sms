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
})


app.on('before-quit', (e) => {
  console.log('App about to Quit ')
})

app.on('browser-window-blur', (e) => {
  console.log('Window out of Focus')
})

app.on('browser-window-focus', (e) => {
  console.log('Window in')
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


// let win = null;
// let mainContents = null

// function c(message){
//   win.webContents.send('console', message)
//   // ipcMain.send('console', message);
// }

// function createWindow () {
//   // modem.listOpenPorts((err, result)=>{
//   //   console.log(result)
//   //   ipcMain.on('console', (e,message) => {
//   //     e.sender.send('console', result)
//   //   })
//   // })
//
//
//   win = new BrowserWindow({
//     width: 900,
//     height: 900
//   })
//
//
//
//   const startUrl = process.env.ELECTRON_START_URL || url.format({
//       // pathname: path.join(__dirname, '/../build/index.html'),
//       pathname: 'http://localhost:3000/',
//       // protocol: 'file:',
//       // slashes: true
//   });
//
//   // const startUrl = process.env.ELECTRON_START_URL || url.format({
//   //     pathname: path.join(__dirname, '/../build/index.html'),
//   //     protocol: 'file:',
//   //     slashes: true
//   // });
//
//   win.loadURL(startUrl);
//   mainContents = win.webContents;
//   mainContents.openDevTools()
//   // Emitted when the window is closed.
//   win.on('closed', () => {
//     win = null
//   })
//
// }
