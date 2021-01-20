/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {me, logout} from './user'
import {fetchUsers} from './all-users-reducer'
import {emptyCart} from './cart-reducer'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {user: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('me', () => {
    it('eventually dispatches the GET USER action', async () => {
      const fakeUser = {email: 'Cody'}
      mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
      await store.dispatch(me())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_USER')
      expect(actions[0].user).to.be.deep.equal(fakeUser)
    })
  })

  describe('logout', () => {
    it('logout: eventually dispatches the REMOVE_USER action', async () => {
      mockAxios.onPost('/auth/logout').replyOnce(204)
      await store.dispatch(logout())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('REMOVE_USER')
      expect(history.location.pathname).to.be.equal('/login')
    })
  })

  // describe('logout', () => {
  //   it('logout: dispatches the EMPTY_CART action to create an empty cart in state for a guest user', async () => {
  //     mockAxios.onPost('/auth/logout').replyOnce(204) //redirects to /login
  //     await store.dispatch(logout())
  //     const actions = store.getActions()
  //     console.log('ACTIONS', actions)
  //     expect(actions[0].type).to.be.equal('EMPTY_CART')

  //     expect(history.location.pathname).to.be.equal('/login')
  //   })
  // })

  describe('fetchUsers', () => {
    it('going to Users view as admin dispatches the FETCH_USERS action', async () => {
      const afakeUser = {email: 'Cody'}
      mockAxios.onGet('/api/users').replyOnce(200, afakeUser)
      await store.dispatch(fetchUsers())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_USERS')
      expect(history.location.pathname).to.be.equal('/login')
    })
  })
})
