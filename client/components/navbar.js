import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
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
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <a href="#" onClick={handleClick}>
                Logout
              </a>
              <Link to="/cart">
                <i className="shopping cart purple icon spacepurple" />
              </Link>
              <a>number</a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <i
                className="shopping cart purple icon spacepurple"
                padding="14px"
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

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
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
