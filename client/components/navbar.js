import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {TotalItems} from './total-items'
import {fetchCart} from '../store/cart-reducer'

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/products">Adopt</Link>
            </li>
            <li style={{float: 'right'}}>
              {this.props.isLoggedIn ? (
                <div>
                  {this.props.user.isAdministrator && (
                    <Link to="/admin/users">Users </Link>
                  )}
                  {/* The navbar will show these links after you log in */}
                  <a href="#" onClick={this.props.handleClick}>
                    Logout
                  </a>
                </div>
              ) : (
                <div>
                  {/* The navbar will show these links before you log in */}
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Sign Up</Link>
                  {/* <i className="shopping cart purple icon spacepurple" />
                  <a>number</a> */}
                </div>
              )}
            </li>
            <li style={{float: 'right'}}>
              <Link to="/cart">
                <div style={{display: 'flex'}}>
                  <i className="shopping cart purple icon spacepurple" />
                  <p>{TotalItems(this.props.cart)}</p>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
        <h1>UFO Tofu</h1>
        <hr />
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    fetchCart(userId) {
      dispatch(fetchCart(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
