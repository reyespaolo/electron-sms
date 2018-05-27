import * as actionTypes from '../actions/actionTypes'
// import { updateObject } from '../utility';

const initialState = {
  modemOptions: {
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
  },
  modems: []
}

const checkModem = (modemState, newModemsState) => {
  let tempAvailableModems = [...newModemsState]
  let removedModems = []
  let newModems = []
  if(modemState.modems.length){
    for (let key in modemState.modems) {
      let index = tempAvailableModems.findIndex(a => a.comName === modemState.modems[key].comName)
      if (index < 0) removedModems.push(modemState.modems[key])
    }
    for (let key in tempAvailableModems) {
          let index = modemState.modems.findIndex(a => a.comName === tempAvailableModems[key].comName)
          tempAvailableModems[key].status = 'Offline'
          if (index < 0) newModems.push(tempAvailableModems[key])
    }
    if (removedModems.length || newModems.length) {
        let newAvailableModems = [...modemState.modems]
        for (let key in removedModems) {
          let index = newAvailableModems.findIndex(a => a.comName === removedModems[key].comName)
          if (index > -1) newAvailableModems.splice(index, 1)
        }
        if (newModems.length) newAvailableModems = newAvailableModems.concat(newModems)
        modemState.modems = [...newAvailableModems]
      }
  }else{
    for(let key in newModemsState){
      newModemsState[key].status = "Offline"
    }
    modemState.modems = newModemsState
  }

  return modemState



}

const changeModemStatus = (modemState, modem, status) => {
  console.log(modem)
  for (let key in modemState.modems) {
    if ((modemState.modems[key].comName === (modem.comName||modem.modem.comName))) {
      modemState.modems[key].status = status
    }
  }
  return modemState
}

const reducer = (state = initialState, action) => {
  switch( action.type ) {
    case actionTypes.LOAD_MODEMS: {
      let modemState = {
        ...state,
        modems: [...state.modems]
      }
      modemState = checkModem(modemState, action.payload)
      return modemState;
    }
    case actionTypes.CONNECTING_MODEM: {
      let modemState = {
        ...state,
        modems: [...state.modems]
      }
      let newModemStatus = changeModemStatus(modemState, action.payload, 'Connecting..')
      return newModemStatus
    }
    case actionTypes.CHANGE_MODEM_STATUS: {
      let modemState = {
        ...state,
        modems: [...state.modems]
      }
      let newModemStatus = changeModemStatus(modemState, action.payload, action.status)
      return newModemStatus
    }
    default:
      return state;
    }
}

export default reducer;
