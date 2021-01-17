import axios from 'axios'
import history from '../history'

//action constant
export const GET_CART_ITEMS = 'GET_CART_ITEMS'

//action creator
export const getCartItems = cart => ({
  type: GET_CART_ITEMS,
  cart
})

//thunk
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

//delete cart item
export const DELETE_CART_ITEMS = 'DELETE_CART_ITEMS'

export const deleteCartItems = productId => ({
  type: DELETE_CART_ITEMS,
  productId
})

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

const initialState = {}
//reducer is changing your state
export default function getCartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART_ITEMS:
      return action.cart
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
