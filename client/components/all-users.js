import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/all-users-reducer'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const {users} = this.props
    return (
      <div>
        {users.map(user => {
          return <div />
        })}
      </div>
    )
  }
}

const mapState = state => ({
  users: state.users
})

const mapDispatch = dispatch => ({
  getUsers: () => dispatch(fetchUsers())
})

export default connect(mapState, mapDispatch)(AllUsers)
