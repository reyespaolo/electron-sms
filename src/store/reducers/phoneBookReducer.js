import * as actionTypes from '../actions/actionTypes'
import {phoneBook as initialState} from '../../private/initialContacts'

// const initialState = {
//   phoneBook: [
//     {name: 'Test', mobileNumber: "1234567890"},
//   ]
// }

const reducer = (state = initialState, action) => {
  if(action.type === actionTypes.GET_PHONE_BOOK_DATA){
    return state
  }
  return state;
}

export default reducer;
