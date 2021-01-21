import React from 'react'
import {connect} from 'react-redux'
import {UserForm} from './user-form'
import {me, editMe} from '../store/user'
import {Container, Header} from 'semantic-ui-react'

class EditUser extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      submittedForm: 0,
      errors: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }

  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.getUser(userId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setState(this.props.user)
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    try {
      const errors = this.validateForm()
      if (!errors.length) {
        this.props.updateUser(this.state)
        this.setState({
          errors: [],
          submittedForm: 1
        })
      }
    } catch (error) {
      console.log('Unable to edit user', error)
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  validateForm() {
    const errors = []
    const {firstName, lastName, address, phoneNumber} = this.state
    if (firstName === '' || firstName === null) {
      errors.push('You must include a first name.')
    }
    if (lastName === '' || lastName === null) {
      errors.push('You must include a last name.')
    }
    if (address === '' || address === null) {
      errors.push('You must include an address.')
    }
    if (
      phoneNumber === '' ||
      phoneNumber === null ||
      phoneNumber.length !== 10
    ) {
      errors.push('You must include a valid phone number.')
    }
    return errors
  }

  render() {
    return (
      <div>
        <Container textAlign="center">
          <Header as="h1">Edit My Account</Header>
        </Container>
        <UserForm
          {...this.state}
          formType="edited"
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

const mapState = state => ({
  user: state.singleUser
})
const mapDispatch = dispatch => ({
  getUser: userId => dispatch(me(userId)),
  updateUser: user => dispatch(editMe(user))
})

export default connect(mapState, mapDispatch)(EditUser)
