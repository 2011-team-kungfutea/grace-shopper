import axios from 'axios'

//action constants
const SET_PRODUCTS = 'SET_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

//action creators
export const setProducts = products => {
  return {
    type: SET_PRODUCTS,
    products
  }
}

export const deleteProduct = productId => {
  return {
    type: ADD_SINGLE_PRODUCT,
    productId
  }
}

//thunk
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(setProducts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const removeProduct = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/products/${productId}`)
      dispatch(deleteSingleProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}

//reducer
const initialState = []
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    case DELETE_PRODUCT:
      return state.filter(product => product !== action.productId)
    default:
      return state
  }
}
