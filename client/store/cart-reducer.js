import axios from 'axios'
import history from '../history'

//action constants
export const GET_CART_ITEMS = 'GET_CART_ITEMS'
export const ADD_TO_CART = 'ADD_TO_CART'
export const DELETE_CART_ITEMS = 'DELETE_CART_ITEMS'

//action creators
export const getCartItems = cart => ({
  type: GET_CART_ITEMS,
  cart
})

export const addToCart = newItem => ({
  type: ADD_TO_CART,
  newItem
})

export const deleteCartItems = productId => ({
  type: DELETE_CART_ITEMS,
  productId
})

//thunks

export const thunkAddToCart = (product, orderId) => {
  return async dispatch => {
    try {
      console.log('inside thunk add to cart')
      console.log('inside thunk', product, orderId)
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

export const removeCartThunk = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/orders/${productId}`)
      dispatch(deleteCartItems(productId))
      history.push('/cart')
    } catch (error) {
      console.log(error)
    }
  }
}

//reducer
const initialState = {}

export default function getCartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART_ITEMS:
      return action.cart
    case ADD_TO_CART:
      const newArrayFilter = state.order_details.filter(
        item => item.productId !== action.newItem.productId
      )
      newArrayFilter.push(action.newItem)
      return {
        ...state,
        order_details: newArrayFilter
      }
    case DELETE_CART_ITEMS:
      return {
        ...state,
        order_details: state.order_details.filter(
          item => item.productId !== action.productId
        ),
        products: state.products.filter(item => item.id !== action.productId)
      }
    default:
      return state
  }
}
