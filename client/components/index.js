/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as Home} from './home'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as AllProducts} from './all-products'
export {default as AddProduct} from './add-product'
export {default as SingleProduct} from './single-product'
export {default as Cart} from './cart'
export {default as EditProduct} from './edit-product'
export {default as EditUser} from './edit-user'
export {default as AllUsers} from './all-users'
export {default as CheckoutForm} from './checkout-form'
export {default as CheckoutLanding} from './checkout-landing'
