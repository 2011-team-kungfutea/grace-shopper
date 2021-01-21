import React from 'react'
import {connect} from 'react-redux'
import {Form, Input, Button, Message, Header} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

export const CheckoutLanding = props => {
  const {email} = props

  return (
    <div>
      <h3>
        <div>
          <img src="/images/thankyou.png" className="ui centered image" />
          <h1 className="ui center aligned header">
            Tofu thanks you for your order,{' '}
            {email ? email : 'new intergalatic pet owner'}!{' '}
            <i className="hand spock purple icon spacepurple" />
          </h1>
          <img className="ui centered image" src="/images/tofu2.jpg" />
        </div>
      </h3>
      <Link to="/products">
        <div className="ui animated fade massive purple button" tabIndex="0">
          <div className="visible content">Adopt Another?</div>
          <div className="hidden content">
            <i className="rocket icon" />
          </div>
        </div>
      </Link>

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
