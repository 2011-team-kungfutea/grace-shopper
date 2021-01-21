import React from 'react'
import {connect} from 'react-redux'
import {UserForm} from './user-form'
import {me} from '../store/user'

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
}

const mapDispatch = dispatch => ({
  getUser: userId => dispatch(thunkfetchSingleUser(userId))
})
