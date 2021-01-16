import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './all-products-reducer'
import singleProduct from './single-product-reducer'
import cart from './cart-reducer'
import users from './all-users-reducer'

const reducer = combineReducers({user, products, singleProduct, cart, users})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './all-products-reducer'
