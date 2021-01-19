import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h3>
        <div>
          <h1>
            Welcome, {email}{' '}
            <i className="hand spock purple icon spacepurple" />
          </h1>
        </div>
      </h3>
      <h4>Great Seeing You Here!</h4>

      {/* <div className="footer-container">
        <footer>Terms Of Use</footer>
      </div> */}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
