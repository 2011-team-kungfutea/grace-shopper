import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Segment, Image} from 'semantic-ui-react'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <Segment>
        <h3>
          <div>
            <h1>
              Welcome, {email}{' '}
              <i className="hand spock purple icon spacepurple" />
            </h1>
            <h3>
              Ready to welcome the love of an alien pet into your home? We're
              committed to matching wonderful, adoptable alien pets with loving
              families. And we can help you find just the right alien pet.
            </h3>
          </div>
        </h3>

        <Image centered size="massive" src="signinpage.png" />
      </Segment>
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
