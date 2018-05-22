export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

export const incrementResult = () => {
  console.log('test')
  return {
    type: INCREMENT
  }

}

export const increment = () => {
  // return dispatch => {
  //   setTimeout(() => {
  //     dispatch(incrementResult());
  //   },2000)
  // }
  return {
    type: INCREMENT
  }
}
export const decrement = () => {
  return {
    type: DECREMENT
  }
}
