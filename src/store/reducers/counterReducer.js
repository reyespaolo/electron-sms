import * as actionTypes from '../actions/actionTypes'

import { updateObject } from '../utility';

const initialState = {
  counter:0
}
const reducer = (state = initialState, action) => {
  if(action.type === actionTypes.INCREMENT){
    return updateObject(state, {counter: state.counter+1})
  }
  if(action.type === actionTypes.DECREMENT){
    return updateObject(state, {counter: state.counter-1})
  }
  return state;
}

export default reducer;
