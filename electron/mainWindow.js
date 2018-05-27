const { BrowserWindow, session, Menu,ipcMain } = require('electron')
const windowStateKeeper = require('electron-window-state')
const path = require('path')
const url = require('url')
let contextMenu = Menu.buildFromTemplate( require('./contextMenu.js'))
var modem = require('modem-commands').Modem()
let openInterval = null;
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
    })
}

const initializeListeners = () => {


  ipcMain.on('SMSSending:SendSMS', (e, payload) => {
    sendSMS(payload)
  })

  ipcMain.on('MODEM:Actions', (err, payload) => {
    if(payload.status==='success'){
      switch(payload.action){
        case 'CONNECTING_MODEM': {
          onModemConnect(payload.data)
          break;
        }
        default:
          break;
      }
    }

  })
}


const  initializeModem = () => {

  setInterval(() => {
    modem.listOpenPorts((err, result)=>{
      let mainContents = this.win.webContents;
      mainContents.send('MODEM:Listener', {'status': 'success', 'module': 'Modem', 'action':'LISTEN_OPEN_PORTS', 'data':result})
    })
  }, 5000)

}

const connectModem = (payload) => {
  let modemOptions = null;
  if(payload.modemoptions){
    modemOptions = paylaod.modemOptions
  }else{
    modemOptions = getDefaultModemOptions()
  }
  let mainContents = this.win.webContents;


  modem.open(payload.modem.comName, modemOptions, (err,result) => {
    if(err) {
      mainContents.send('MODEM:Listener', {'status': 'fail', 'module': 'Modem', 'action': 'MODEM_CONNECTED', 'data':{'modem':result.data}})
    } else {
      modem.initializeModem((response) => {
        if(response.status === 'success'){
          modem.modemMode((response) => {
            if(response.status === 'success'){
              clearTimeout(openInterval);
              mainContents.send('MODEM:Listener', {'status': 'success', 'module': 'Modem', 'action': 'MODEM_CONNECTED', 'data':{'modem':result.data}})
            }
          }, "PDU")
        }
      })

      openInterval = setTimeout(() => {
        mainContents.send('MODEM:Listener', {'status': 'fail', 'module': 'Modem', 'action': 'MODEM_CONNECTED', 'data':{'modem':result.data}})
      }, 10000)

    }
  })

}

const onModemConnect = (payload) => {

  if(!modem.isOpened){
    connectModem(payload)
  }else{
    if(modem.port.path===payload.comName){
      let mainContents = this.win.webContents;
      mainContents.send('MODEM:Listener', {'status': 'success', 'module': 'Modem', 'action': 'MODEM_CONNECTED', 'data':payload})
    }


  }



}

const getDefaultModemOptions = () => {
  return {
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

}
