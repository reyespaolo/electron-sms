const { BrowserWindow, session, Menu,ipcMain } = require('electron')
const windowStateKeeper = require('electron-window-state')
const path = require('path')
const url = require('url')
let contextMenu = Menu.buildFromTemplate( require('./contextMenu.js'))
var modem = require('modem-commands').Modem()

exports.win

exports.createWindow = () => {
  let appSession = session.fromPartition('persist:appSession')

  let mainWindowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600
  })



  initializeListeners();
  initializeModem();
  this.win = new BrowserWindow({
    width: mainWindowState.width,
    height: mainWindowState.height,
    x: mainWindowState.x,
    y: mainWindowState.y,
    show: true,
    minWidth: 800,
    minHeight: 600
  })
  mainWindowState.manage(this.win);

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });

    // const startUrl = process.env.ELECTRON_START_URL || url.format({
    //     pathname: 'http://localhost:3000',
    // });

    this.win.loadURL(startUrl);

  this.win.on('closed', () => {
    this.win = null
  })

  let mainContents = this.win.webContents

  mainContents.on('context-menu', (e) => {
    e.preventDefault()
    contextMenu.popup(this.win)
  })

  mainContents.on('did-finish-load', () =>{
    mainContents.send('private', "Message From Main Process to Main Window")
  })
}

const sendSMS = (payload) =>{
    modem.sendSMS(payload.contact, payload.message, function(response){
      console.log('messgae status',response)
    })
}



const initializeListeners = () => {
  ipcMain.on('SMSSending:SendSMS', (e, payload) => {
    sendSMS(payload)
  })

  ipcMain.on('MODEM:onConnect', (err, payload) => {
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
    var device = payload.comName
    let mainContents = this.win.webContents;

    setInterval(() => {
      if (!modem.isOpened) {
        modem.open(device,modemOptions, (err,result) => {
          if(err){
            // mainContents.send('MODEM:AvailablePorts', result)
          }else{
              modem.initializeModem((response) => {
                console.log('response',response)
              })
              modem.modemMode((response) => {
                console.log(response)
              }, "PDU")

            // mainContents.send('MODEM:AvailablePorts', result)
          }
        })
      } else {
        console.log(`Serial port ${modem.port.path} is open`)
      }
    }, 6000)


  })
}

const  initializeModem = () => {
  setInterval(() => {
    modem.listOpenPorts((err, result)=>{
      let mainContents = this.win.webContents;
      mainContents.send('MODEM:AvailablePorts', result)
    })
  }, 5000)

}
