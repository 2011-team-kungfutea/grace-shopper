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
  AllUsers
} from './components'
import {me} from './store'
import {fetchCart} from './store/cart-reducer'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }
  componentDidUpdate(prevProps) {
    const {user, fetchCart} = this.props
    try {
      if (user !== prevProps.user && user.id) {
        fetchCart(this.props.user.id)
      } else {
        console.log('no cart')
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {isLoggedIn, user} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={AllProducts} />
        {isLoggedIn && (
          <>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/cart" component={Cart} />
            {user.isAdministrator && (
              <>
                <Route
                  exact
                  path="/products/:productId/edit"
                  component={EditProduct}
                />
                <Route exact path="/products/add" component={AddProduct} />
                <Route exact path="/users" component={AllUsers} />
              </>
            )}
            <Route
              exact
              path="/products/:productId"
              component={SingleProduct}
            />
          </>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
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
