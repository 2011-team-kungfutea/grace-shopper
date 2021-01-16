import axios from 'axios'

// action constants
const GET_USERS = 'GET_USERS'

// action creators
const getUsers = users => ({
  type: GET_USERS,
  users
})

// thunks
export const fetchUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(getUsers(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// reducer
export default (state = [], action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return state
  }
}
