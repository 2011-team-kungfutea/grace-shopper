import axios from 'axios'

//action type constants
export const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
export const ADD_SINGLE_PRODUCT = 'ADD_SINGLE_PRODUCT'
export const UPDATE_SINGLE_PRODUCT = 'UPDATE_SINGLE_PRODUCT'

//action creators
export const getSingleProduct = product => {
  return {
    type: GET_SINGLE_PRODUCT,
    product
  }
}

export const addSingleProduct = product => {
  return {
    type: ADD_SINGLE_PRODUCT,
    product
  }
}

export const updateSingleProduct = product => {
  return {
    type: UPDATE_SINGLE_PRODUCT,
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

export const thunkCreateSingleProduct = product => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/products', product)
      dispatch(addSingleProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const thunkUpdateSingleProduct = product => {
  return async dispatch => {
    try {
      console.log('inside thuinkupdate')
      const {data} = await axios.put(`/api/products/${product.id}`, product)
      console.log('got data')
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
    case ADD_SINGLE_PRODUCT:
      return action.product
    case UPDATE_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
