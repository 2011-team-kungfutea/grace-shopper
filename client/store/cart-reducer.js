import axios from 'axios'
import {session} from 'passport'

//action constant
export const GET_CART_ITEMS = 'GET_CART_ITEMS'
export const ADD_TO_CART = 'ADD_TO_CART'

//action creator
export const getCartItems = cartItems => ({
  type: GET_CART_ITEMS,
  cartItems
})

//action creator
export const addToCart = newItem => ({
  type: ADD_TO_CART,
  newItem
})

//thunks

export const thunkAddToCart = (product, orderId) => {
  return async dispatch => {
    try {
      console.log('inside thunk add to cart')
      const {data} = await axios.put(
        `/api/orders/${orderId}/add/${product.id}`,
        product
      )
      console.log('DATA', data)
      dispatch(addToCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchCart = userId => {
  return async dispatch => {
    try {
      console.log('userId', userId)
      const {data} = await axios.get(`/api/orders/${userId}`)
      dispatch(getCartItems(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {}

export default function getCartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART_ITEMS:
      return action.cartItems
    case ADD_TO_CART:
      return action.newItem
    default:
      return state
  }
}
