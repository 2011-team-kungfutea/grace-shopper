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
// export const addToCart = product => (dispatch, getState) => {
//   const cartItems = getState().cart.cartItems.slice()
//   let alreadyExists = false
//   cartItems.forEach(pet => {
//     if (pet.id === product.id) {
//       alreadyExists = true
//       pet.count++
//     }
//   })
//   if (!alreadyExists) {
//     cartItems.push({...product})
//     pet.count = 1
//   }
//   dispatch({
//     type: ADD_TO_CART,
//     payload: {cartItems}
//   })
//   localStorage.setItem('cartItems', JSON.stringify(cartItems))
//   console.log('local Storage', localStorage)
// }

//thunks

export const thunkAddToCart = (product, userId) => {
  return async dispatch => {
    try {
      const newItem = {product} //just the order details not whole product
      const {data} = await axios.get(`/api/orders/${userId}`)
      // const newItem = await axios.get('/api/products/${productId}')
      // const order = await axios.get('/api/orders/${userId}')
      // const {data} = await axios.put(`/api/orders/${userId}`, product)

      dispatch(addToCart({...data, ...data.order_details.push[{newItem}]})) //need put route?
      // console.log("PEEEEEEEEEp", {...data.order_details.push[{newItem}]})
      // console.log("PEEEEEEEEEp", data)
      // dispatch(addToCart({data}))
    } catch (error) {
      console.log(error)
    }
  }
}
// export const thunkAddToCart = (product, userId) => {
//   return async dispatch => {
//     try {
//       const {data} = await axios.put(`/api/orders/${userId}`, product)
//       dispatch(addToCart(data))
//     } catch (err) {
//       console.log(err)
//     }
//   }
// }

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
// const initialState = {
//   cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]')
// }
//reducer is changing your state
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
