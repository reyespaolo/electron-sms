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
  for (let key in modemState.modems) {
    if (modemState.modems[key].comName === modem.comName) {
      modemState.modems[key].status = status
    }
    console.log(modemState)
  }
  return modemState
}

const reducer = (state = initialState, action) => {
  switch( action.type ) {
    case actionTypes.LOAD_MODEMS: {
      console.log(action.payload)
      let modemState = {
        ...state,
        modems: [...state.modems]
      }
      console.log('ModemSate',modemState)
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
    default:
      return state;
    }
}

export default reducer;


// if(modemState.modems[key].comName === newModemsState.comName){
//   if(modemState.modems[key].status === undefined){
//     modemState.modems[key].status = "Offline"
//   }
// }else {
//   newModem.push(newModemsState)
// }
// for (let key in modemState.modems) {
//   if (newModemsState.some(a => a.comName === modemState.modems[key].comName)) {
//     toRemove.push(modemState.modems[key])
//   }
// }
//   for (let key in newModemsState) {
//     let index = modemState.modems.findIndex(a => a.comName === newModemsState[key].comName)
//     if (index < 0) {
//       newModemsState[key].status = 'Offline' + Math.random(1, 100)
//       toAdd.push(newModemsState[key])
//     }
//   }
//   if (toRemove.length || toAdd.length) {
//     for (let key in toRemove) {
//       let index = newModems.findIndex(a => a.comName === toRemove[key].comName)
//       if (index > -1) newModems.splice(index, 1)
//     }
//     if (toAdd.length) newModems = newModems.concat(toAdd)
//   }
//   modemState.modems = newModems
//   return modemState
// } else {
//   newModemsState.forEach(a => a.status = 'Offline')
//

// var diff = _.differenceWith(newModemsState,modemState.modemState, _.isEqual);
// console.log('diff')
// console.log(diff)
// console.log('Enddiff')
// modemState.modems = diff
// if(modemState.modems.length > 0){
//   for(let key in modemState.modems){
//       let index = newModemsState.findIndex(a => a.comName === modemState.modems[key].comName)
//       console.log(index)
//       if(index>=0){
//         newModem.push(modemState.modems[index])
//       }else{
//         // console.log(modemState.modems[key].comName)
//       }
//   }
//
//   const currSelection = [1, 2, 3, 7];
//   const items = [1];
//   const results = _.differenceWith(newModemsState, modemState.modems);
//   console.log(results)
//
//   modemState.modems = (newModem)
    // for (let key in newModemsState) {
    //   let index = modemState.modems.findIndex(a => a.comName === newModemsState[key].comName)
    //   // if (index < 0) {
    //   //   console.log(index)
    //   // }else{
    //   //   console.log(modemState.modems[index].comName)
    //   // }
    //   console.log(index)
    //   console.log('test')
    // }

//
// }else{
//   for(let key in newModemsState){
//     newModemsState[key].status = 'Offline'
//     modemState.modems.push(newModemsState[key])
//   }
// }
//
// return modemState
// //   if (modemState.modems.length) {
// //     let newModem = modemState.modems;
// //
// //
// //     newModemsState.modems = newModem
// //     return newModemsState
// //   // }
// // }else {
// //   newModemsState.modems = newModemsState
// //   return newModemsState
// //
// // }
