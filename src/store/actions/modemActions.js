import * as actionTypes from './actionTypes'


export const loadModems = (modems) => {
  return {
    type: actionTypes.LOAD_MODEMS,
    payload: modems
  }
}

export const onConnectModem = (modem) => {
  return {
    type: actionTypes.CONNECTING_MODEM,
    payload: modem
  }
}
export const changeModemStatus = (modem, status) => {
  return {
    type: actionTypes.CHANGE_MODEM_STATUS,
    payload: modem,
    status: status
  }
}
