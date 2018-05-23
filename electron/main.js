const electron = require('electron')
const { app, BrowserWindow, globalShortcut, Menu, MenuItem, ipcMain } = electron
const path = require('path')
const url = require('url')
const windowStateKeeper = require('electron-window-state')
let mainMenu = Menu.buildFromTemplate( require('../electron/mainMenu.js'))
const mainWindow = require('../electron/mainWindow')
var modem = require('modem-commands').Modem()


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

// app.on('browser-window-blur', (e) => {
//   console.log('Window out of Focus')
// })
//
// app.on('browser-window-focus', (e) => {
//   console.log('Window in')
// })

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
  modem.listOpenPorts((err, result)=>{
    console.log(result)
  })

  let modemOptions = {
    baudRate: 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    xon: false,
    rtscts: false,
    xoff: false,
    xany: false,
    buffersize: 0,
    onNewMessage: true,
    onNewMessageIndicator: true
  }
  var device = '/dev/tty.usbserial'
  setInterval(() => {
    if (!modem.isOpened) {
      modem.open(device,modemOptions, (err,result) => {
        if(err){
          console.log(err)
        }else{
          console.log(result)
        }
      })
    } else {
      console.log(`Serial port ${modem.port.path} is open`)
    }
  }, 6000)

  modem.on('open', (data) => {
    modem.initializeModem((response) => {
      console.log('response',response)
    })
    modem.modemMode((response) => {
      console.log(response)
    }, "PDU")
  })
}

function initializeListeners(){
    ipcMain.on('SMSSending:SendSMS', (e,payload) => {
      sendSMS(payload)

    })
}

function sendSMS(payload){
    modem.sendSMS(payload.contact, payload.message, function(response){
      console.log('messgae status',response)
    })
}
