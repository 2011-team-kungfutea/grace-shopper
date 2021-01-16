import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {TotalItems} from './total-items'
import {fetchCart} from '../store/cart-reducer'

class Navbar extends React.Component {
  // constructor(){
  //   super()
  // }
  // ({handleClick, isLoggedIn, cart})
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            {/* <li className="shopping cart icon">test</li> */}
            <li>
              <Link to="/products">Adopt</Link>
            </li>
            {/* <li>
          <i className="shopping cart violet icon"></i>
        </li> */}
            <li style={{float: 'right'}}>
              {this.props.isLoggedIn ? (
                <div>
                  {/* The navbar will show these links after you log in */}
                  <a href="#" onClick={this.props.handleClick}>
                    Logout
                  </a>
                  <Link to="/cart">
                    <i className="shopping cart purple icon spacepurple" />
                  </Link>
                  <a>{TotalItems(this.props.cart)}</a>
                </div>
              ) : (
                <div>
                  {/* The navbar will show these links before you log in */}
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Sign Up</Link>
                  <i
                    className="shopping cart purple icon spacepurple"
                    // padding="14px"
                  />
                  <a>number</a>
                </div>
              )}
            </li>
          </ul>
        </nav>
        <h1>UFO Tofu</h1>
        {/* <i className="shopping cart icon " ></i> */}
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
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
