import axios from 'axios'
//action constants
export const GET_CART_ITEMS = 'GET_CART_ITEMS'
export const ADD_TO_CART = 'ADD_TO_CART'
export const DELETE_CART_ITEMS = 'DELETE_CART_ITEMS'
export const EDIT_CART_ITEM = 'EDIT_CART_ITEM'
export const INCREASE_CART_ITEM = 'INCREASE_CART_ITEM'
export const DECREASE_CART_ITEM = 'DECREASE_CART_ITEM'

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

export const editCartItem = cartItem => ({
  type: EDIT_CART_ITEM,
  cartItem
})

//thunks

export const thunkAddToCart = (product, orderId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/orders/${orderId}/add/${product.id}`,
        product
      )
      dispatch(addToCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchCart = userId => {
  return async dispatch => {
    try {
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
    } catch (error) {
      console.log(error)
    }
  }
}

export const editQuantityInCart = (changeType, productId, orderId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `api/orders/${orderId}/products/${productId}`,
        changeType
      )
      dispatch(editCartItem(data))
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
      const addedOrderDetails = state.order_details.filter(
        item => item.productId !== action.newItem.productId
      )
      addedOrderDetails.push(action.newItem)
      return {
        ...state,
        order_details: addedOrderDetails
      }
    case DELETE_CART_ITEMS:
      return {
        ...state,
        order_details: state.order_details.filter(
          item => item.productId !== action.productId
        ),
        products: state.products.filter(item => item.id !== action.productId)
      }
    case EDIT_CART_ITEM:
      const editedOrderDetails = state.order_details.filter(
        item => item.productId !== action.cartItem.productId
      )
      editedOrderDetails.push(action.cartItem)
      return {
        ...state,
        order_details: editedOrderDetails
      }
    default:
      return state
  }
}
