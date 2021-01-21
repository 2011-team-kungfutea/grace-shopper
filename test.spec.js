// /* global describe beforeEach afterEach it */

// import {expect} from 'chai'
// import {me, logout} from './client/store/user'
// import {fetchUsers} from './client/store/all-users-reducer'
// import {checkoutThunk, guestCheckoutThunk, emptyCart} from './client/store/cart-reducer'
// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import configureMockStore from 'redux-mock-store'
// import thunkMiddleware from 'redux-thunk'
// import history from '../node_modules/history'

// const middlewares = [thunkMiddleware]
// const mockStore = configureMockStore(middlewares)

// describe('thunk creators', () => {
//   let store
//   let mockAxios

//   const initialState = {user: {}}

//   beforeEach(() => {
//     mockAxios = new MockAdapter(axios)
//     store = mockStore(initialState)
//   })

//   afterEach(() => {
//     mockAxios.restore()
//     store.clearActions()
//   })

//   describe('checkoutThunk', () => {
//       it('creates a new order', async () => {

//       })
//   })

//   describe('guestCheckoutThunk', () => {
//     it('creates a new order and calls emptyCart', async () => {

//     })
// })

//-----------------------------------
//   describe('me', () => {
//     it('eventually dispatches the GET USER action', async () => {
//       const fakeUser = {email: 'Cody'}
//       mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
//       await store.dispatch(me())
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('GET_USER')
//       expect(actions[0].user).to.be.deep.equal(fakeUser)
//     })
//   })

//   describe('logout', () => {
//     it('logout: eventually dispatches the REMOVE_USER action', async () => {
//       mockAxios.onPost('/auth/logout').replyOnce(204)
//       await store.dispatch(logout())
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('REMOVE_USER')
//       expect(history.location.pathname).to.be.equal('/login')
//     })
//   })

//   describe('fetchUsers', () => {
//     it('going to Users view as admin dispatches the FETCH_USERS action', async () => {
//       const afakeUser = {email: 'Cody'}
//       mockAxios.onGet('/api/users').replyOnce(200, afakeUser)
//       await store.dispatch(fetchUsers())
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('GET_USERS')
//       expect(history.location.pathname).to.be.equal('/login')
//     })
//   })
// })

// const {expect} = require('chai')
// const db = require('./server/db/index')
// const User = db.model('user')

// describe('User model', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('instanceMethods', () => {
//     describe('correctPassword', () => {
//       let cody

//       beforeEach(async () => {
//         cody = await User.create({
//           email: 'cody@puppybook.com',
//           password: 'bones'
//         })
//       })

//       it('returns true if the password is correct', () => {
//         expect(cody.correctPassword('bones')).to.be.equal(true)
//       })

//       it('returns false if the password is incorrect', () => {
//         expect(cody.correctPassword('bonez')).to.be.equal(false)
//       })
//     }) // end describe('correctPassword')
//   }) // end describe('instanceMethods')
// }) // end describe('User model')

// /* global describe beforeEach it */
// /*As a guest:
// - have an empty cart when I first navigate to the URL*/
// describe('thunk creators', () => {
//     let store
//     let mockAxios

//     const initialState = {user: {}}

//     beforeEach(() => {
//       mockAxios = new MockAdapter(axios)
//       store = mockStore(initialState)
//     })

//     afterEach(() => {
//       mockAxios.restore()
//       store.clearActions()
//     })

//     describe('me', () => {
//         it('returns an empty user when a user first navigates to the page', async () => {
//             describe('getUsers', () => {
//                 it('going to Users view as admin dispatches the FETCH_USERS action', async () => {
//                   const emptyUser = {}
//                   mockAxios.onGet('/auth/me').replyOnce(200, emptyUser)
//                   await store.dispatch(getUsers())
//                   const actions = store.getActions()
//                   expect(actions[0].type).to.be.equal('GET_USERS')
//                   // expect(history.location.pathname).to.be.equal('/login')
//                 })
//               })
//             })
//         })
// })

// export const me = () => async dispatch => {
//     try {
//       const res = await axios.get('/auth/me')
//       dispatch(getUser(res.data || defaultUser))
//     } catch (err) {
//       console.error(err)
//     }
//   }
//   it('have an empty cart when user navigates to the page', async () => {

//     mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
//     await store.dispatch(me())
//     const actions = store.getActions()
//     expect(actions[0].type).to.be.equal('GET_USER')
//     expect(actions[0].user).to.be.deep.equal(fakeUser)
//   })

// describe('logout', () => {
//   it('logout: eventually dispatches the REMOVE_USER action', async () => {
//     mockAxios.onPost('/auth/logout').replyOnce(204)
//     await store.dispatch(logout())
//     const actions = store.getActions()
//     expect(actions[0].type).to.be.equal('REMOVE_USER')
//     expect(history.location.pathname).to.be.equal('/login')
//   })
// })

// /*- I have links that navigate to view: home, all products, cart, login, sign up
// -I can view all products when I click the cart it shows an empty cart
// - when I click home it takes me to the home page
// - when I click adopt I can see all products
// - when I click on a product it takes me to a single product page
// - on the single product page I can add that product to my cart
// - the cart icon will update and I can click that to view my cart items
// -on the cart page I can delete products from my cart
// - I can checkout — takes me to checkout page where I can fill out my info with validation which will send my order and give me a new empty cart (make sure email is unique)
// -persists in database (?)

// Logged in as admin:

// - have the same navigation as guest but login/ sign up has changed to be just log out
// - my cart persists from the last time I was logged in */

// /*- I have  a User view that shows me all users
// - I can view all products under adopt AND I have a button for  adding/ editing/ and deleting a product
// I am able to add, edit and delete a product
// - I can add to and delete products from my cart
// - when I go to checkout any info on file for me will auto populate in the form
// - my order will persist in the database and I will have a new empty cart ready to add more products

// Sign up
//  - I can sign up with a unique email
// - it doesn’t let me sign up with a taken email
// - it doesn’t let me sign up as an admin
// I have the same navigation as the admin logged in user but I don’t have the user view or the add/ edit/ delete  product views
// I can add/ delete and edit things in my cart
//  when I go to checkout any info on file for me will auto populate in the form
// - my order will persist in the database and I will have a new empty cart ready to add more products

// Logged in
// - when I log back in my cart is still at the value where I left it
// -I can add/ edit quantity and delete things from my cart
//  when I go to checkout any info on file for me will auto populate in the form
// - if I don’t fill in all fields it will not let me check out (DONT EDIT EMAIL)
// - my order will persist in the database and I will have a new empty cart ready to add more products

// Add descriptions so the prices make sense
// - on checkout change the view
//  - get rid of outdated delete route
// - google Oauth, mostly set up

// - tests: cart persistence based on user state
// -refactor add to products button based on history
// - if history works, add it to checkout
// Routes:

// Tests:
// -is there a cart when user is logged in
// - is there only a cart in state when the user is a guest
// - no associated order-details row
// -is an order row created on checkout
// Is a new cart created on checkout

// Does add to cart update the cart state and the icon/ logged in/ guest */

// describe('User routes', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('/api/users/', () => {
//     const codysEmail = 'cody@puppybook.com'

//     beforeEach(() => {
//       return User.create({
//         email: codysEmail
//       })
//     })

//     it('GET /api/users', async () => {
//       const res = await request(app)
//         .get('/api/users')
//         .expect(200)

//       expect(res.body).to.be.an('array')
//       expect(res.body[0].email).to.be.equal(codysEmail)
//     })
//   }) // end describe('/api/users')
// }) // end describe('User routes')

// const adapter = new Adapter()
// enzyme.configure({adapter})

// describe('UserHome', () => {
//   let userHome

//   beforeEach(() => {
//     userHome = shallow(<UserHome email="cody@email.com" />)
//   })

//   // it('renders the email in an h1', () => {
//   //   expect(userHome.find('h1').text()).to.be.equal('Welcome, cody@email.com')
//   // })
// })

// describe('thunk creators', () => {
//   let store
//   let mockAxios

//   const initialState = {user: {}}

//   beforeEach(() => {
//     mockAxios = new MockAdapter(axios)
//     store = mockStore(initialState)
//   })

//   afterEach(() => {
//     mockAxios.restore()
//     store.clearActions()
//   })

//   describe('me', () => {
//     it('eventually dispatches the GET USER action', async () => {
//       const fakeUser = {email: 'Cody'}
//       mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
//       await store.dispatch(me())
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('GET_USER')
//       expect(actions[0].user).to.be.deep.equal(fakeUser)
//     })
//   })

//   describe('logout', () => {
//     it('logout: eventually dispatches the REMOVE_USER action', async () => {
//       mockAxios.onPost('/auth/logout').replyOnce(204)
//       await store.dispatch(logout())
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('REMOVE_USER')
//       expect(history.location.pathname).to.be.equal('/login')
//     })
//   })

//   describe('fetchUsers', () => {
//     it('going to Users view as admin dispatches the FETCH_USERS action', async () => {
//       const afakeUser = {email: 'Cody'}
//       mockAxios.onGet('/api/users').replyOnce(200, afakeUser)
//       await store.dispatch(fetchUsers())
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('GET_USERS')
//       // expect(history.location.pathname).to.be.equal('/login')
//     })
//   })
// })

// const seed = require('./seed')

// describe('seed script', () => {
//   it('completes successfully', seed)
// })
