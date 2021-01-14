import axios from 'axios'

//action type constants
export const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
//action creators
export const getSingleProduct = product => {
  return {
    type: GET_SINGLE_PRODUCT,
    product
  }
}
//thunk
export const thunkfetchSingleProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(getSingleProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}
//reducer
const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
