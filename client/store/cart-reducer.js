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

export const addToCart = product => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice()
  let alreadyExists = false
  cartItems.forEach(pet => {
    if (pet.id === product.id) {
      alreadyExists = true
      pet.count++
    }
  })
  if (!alreadyExists) {
    cartItems.push({...product})
    pet.count = 1
  }
  dispatch({
    type: ADD_TO_CART,
    payload: {cartItems}
  })
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
  console.log('local Storage', localStorage)
}

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

// const initialState = {}
const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]')
}
//reducer is changing your state
export default function getCartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART_ITEMS:
      return action.cartItems
    case ADD_TO_CART:
      return {cartItems: action.payload.cartItems}
    default:
      return state
  }
}
