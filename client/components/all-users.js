import React from 'react'
import {connect} from 'react-redux'
import {Table, Container, Header} from 'semantic-ui-react'
import {fetchUsers} from '../store/all-users-reducer'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const {users} = this.props
    return (
      <div>
        <Container fluid>
          <Header as="h2">All Users</Header>
        </Container>
        {/* collapsing - makes table shrink to contents */}
        <Table definition striped selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Phone Number</Table.HeaderCell>
              <Table.HeaderCell>Administrator</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.sort((a, b) => a.id - b.id).map(user => {
              return (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.id}.</Table.Cell>
                  <Table.Cell>{user.firstName}</Table.Cell>
                  <Table.Cell>{user.lastName}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell singleLine>{user.address}</Table.Cell>
                  <Table.Cell>{user.phoneNumber}</Table.Cell>
                  <Table.Cell>
                    {user.isAdministrator ? <i className="check icon" /> : ''}
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
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
