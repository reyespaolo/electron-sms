import * as actionTypes from './actionTypes'

export const getModemOptions = (modems) => {
  return {
    type: actionTypes.GET_MODEM_OPTIONS,
  }
}
