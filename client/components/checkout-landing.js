import React from 'react'
import {connect} from 'react-redux'
import {Form, Input, Button, Message, Header} from 'semantic-ui-react'
import PropTypes from 'prop-types'

export const CheckoutLanding = props => {
  const {email} = props

  return (
    <div>
      <h3>
        <div>
          <h1>
            Thank you for your order {email ? email : ''}!{' '}
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

export default connect(mapState)(CheckoutLanding)

/**
 * PROP TYPES
 */
CheckoutLanding.propTypes = {
  email: PropTypes.string
}
