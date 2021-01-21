import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {TotalItems} from './total-items'
import {fetchCart} from '../store/cart-reducer'
import {Menu, Segment} from 'semantic-ui-react'

class Navbar extends React.Component {
  state = {activeItem: 'home'}
  handleItemClick = (e, {name}) => this.setState({activeItem: name})
  render() {
    const {activeItem} = this.state
    return (
      <Segment inverted>
        <Menu inverted secondary>
          {/* <ul className="navbar"> */}
          <Link to="/home" font="Open Sans">
            <Menu.Item
              className="navItem"
              name="home"
              activate={activeItem === 'home'}
              onClick={this.handleItemClick}
            >
              Home
            </Menu.Item>
          </Link>
          <Link to="/products" font="Open Sans">
            <Menu.Item
              className="navItem"
              name="adopt"
              activate={activeItem === 'adopt'}
              onClick={this.handleItemClick}
            >
              Adopt
            </Menu.Item>
          </Link>
          <Menu.Menu className="navItem" position="right">
            {this.props.isLoggedIn ? (
              <div className="conditionals">
                {this.props.user.isAdministrator && (
                  <Link to="/admin/users">
                    <Menu.Item
                      name="users"
                      activate={activeItem === 'users'}
                      onClick={this.handleItemClick}
                    >
                      Users
                    </Menu.Item>
                  </Link>
                )}
                {/* The navbar will show these links after you log in */}
                <Menu.Item
                  name="logout"
                  activate={activeItem === 'logout'}
                  onClick={this.props.handleClick}
                >
                  {/* <a href="#" onClick={this.props.handleClick} font="Open Sans"> */}
                  Logout
                  {/* </a> */}
                </Menu.Item>
              </div>
            ) : (
              <div className="conditionals">
                {/* The navbar will show these links before you log in */}

                <Link to="/login" font="Open Sans">
                  <Menu.Item
                    name="login"
                    activate={activeItem === 'login'}
                    onClick={this.handleItemClick}
                  >
                    Login
                  </Menu.Item>
                </Link>

                <Link to="/signup" font="Open Sans">
                  <Menu.Item
                    name="signup"
                    activate={activeItem === 'signup'}
                    onClick={this.handleItemClick}
                  >
                    Sign Up
                  </Menu.Item>
                </Link>
                {/* <i className="shopping cart purple icon spacepurple" />
                  <a>number</a> */}
              </div>
            )}
          </Menu.Menu>
          <Link to="/cart">
            <Menu.Item
              className="navItem"
              style={{float: 'right'}}
              name="cart"
              activate={activeItem === 'cart'}
              onClick={this.handleItemClick}
            >
              <div style={{display: 'flex'}}>
                <i className="shopping cart purple icon spacepurple" />
              </div>
              <p>{TotalItems(this.props.cart)}</p>
            </Menu.Item>
          </Link>
          {/* </ul> */}
        </Menu>
      </Segment>
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
