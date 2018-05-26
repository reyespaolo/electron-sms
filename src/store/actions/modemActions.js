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
export const initializModem = (modem) => {
  console.log('connecting')
  return {
    type: actionTypes.INITIALIZING_MODEM,
    payload: modem
  }
}
