import * as actionTypes from '../actions/actionTypes'

// import { updateObject } from '../utility';

const initialState = {
  phoneBook: [
    {name: 'Paolo Reyes', mobileNumber: "091234567"},
    {name: 'Rosed Higo Reyes', mobileNumber: "091234567"},
    {name: 'Sebastian Reyes', mobileNumber: "091234567"},
  ]
}
const reducer = (state = initialState, action) => {
  if(action.type === actionTypes.GET_PHONE_BOOK_DATA){
    return state
  }
  return state;
}

export default reducer;
