import * as actionTypes from './actionTypes'


export const loadModems = (modems) => {
  return {
    type: actionTypes.LOAD_MODEMS,
    payload: modems
  }
}

export const connectModem = (modem) => {
  console.log('connecting')
  return {
    type: actionTypes.CONNECTING_MODEM,
    payload: modem
  }
}
