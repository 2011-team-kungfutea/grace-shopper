import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  SingleProduct,
  AddProduct,
  Cart,
  EditProduct,
  AllUsers,
  CheckoutForm,
  Home
} from './components'
import {me} from './store'
import {fetchCart, emptyCart} from './store/cart-reducer'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }
  componentDidUpdate(prevProps) {
    const {user, fetchCart, resetCart} = this.props
    try {
      if (user !== prevProps.user) {
        if (user.id) {
          fetchCart(this.props.user.id)
        } else {
          resetCart()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {isLoggedIn, user} = this.props

    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:productId" component={SingleProduct} />
        <Route path="/checkout-form" component={CheckoutForm} />
        <Route path="/cart" component={Cart} />
        {isLoggedIn && (
          <Switch>
            <Route path="/home" component={UserHome} />
            {user.isAdministrator && (
              <Switch>
                <Route
                  exact
                  path="/admin/products/add"
                  component={AddProduct}
                />
                <Route
                  exact
                  path="/admin/products/:productId/edit"
                  component={EditProduct}
                />
                <Route exact path="/admin/users" component={AllUsers} />
              </Switch>
            )}
          </Switch>
        )}
        {/* <Route component={Login} /> */}
        <Route exact path="/home" component={Home} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    cart: state.cart,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    fetchCart(userId) {
      dispatch(fetchCart(userId))
    },
    resetCart() {
      dispatch(emptyCart())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
