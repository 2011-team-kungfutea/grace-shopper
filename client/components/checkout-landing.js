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
          <h1 className="ui aligned centered">
            Tofu thanks you for your order,{' '}
            {email ? email : 'new intergalatic pet owner'}!{' '}
            <i className="hand spock purple icon spacepurple" />
          </h1>
          <img className="ui centered image" src="/images/tofu2.jpg" />
        </div>
      </h3>
      <h4>Adopt Another?</h4>

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
