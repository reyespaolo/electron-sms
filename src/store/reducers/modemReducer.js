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
  }
}

const reducer = (state = initialState, action) => {

  if(action.type === actionTypes.GET_MODEM_OPTIONS){
    return state.modemOptions
  }
  return state;
}

export default reducer;
