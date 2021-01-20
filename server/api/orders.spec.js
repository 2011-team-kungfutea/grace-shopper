// /* global describe beforeEach it */

// const {expect} = require('chai')
// const request = require('supertest')
// const db = require('../db')
// const app = require('../index')
// const Order = db.model('order')

// describe('Order routes', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('/api/orders/', () => {
//     const isordered = false

//     beforeEach(() => {
//       return Order.create({
//         isOrdered: isordered
//       })
//     })

//     it('GET /api/orders', async () => {
//       const res = await request(app)
//         .get('/api/orders')
//         .expect(200)

//       expect(res.body).to.be.an('array')
//       expect(res.body[0].isOrdered).to.be.equal(isordered)
//     })
//   }) // end describe('/api/users')
// }) // end describe('User routes')

// // // import mockAxios from '../mock-axios';
// // import MockAdapter from 'axios-mock-adapter'
// // const {expect} = require('chai')
// // // const request = require('supertest')
// // import axios from 'axios'
// // const mock = new MockAdapter(axios)
// // // const app = require('../index')
// // // const User = db.model('user')
// // const Order = db.model('order')
// // // const {db} = require('../db')
// // const seed = require('../../script/seed')
// // const {Order, Product, Order_Detail, User} = require('../../server/db')
// // const request = require('supertest')
// // const db = require('../db')
// // const app = require('../index')
// // const User = db.model('user')

// // describe('get orders by user Id', () => {
// //   const orders = [
// //     {id: 20, isOrdered: true, userId: 60},
// //     {id: 21, isOrdered: false, userId: 61}
// //   ]

// //   beforeEach(() => {
// //     // mockAxios ensures that when our client-side code requests data from the
// //     // server, the request is always successful (even if we haven't implemented)
// //     // our server yet.
// //     mock.onGet('/api/orders/:userId').replyOnce(200, orders)
// //   })
// // })

// // describe('Seed File', () => {
// //   let products, orders
// //   beforeEach(async () => {
// //     await seed()
// //     products = await Product.findAll({include: [Order]})
// //     orders = await Order.findAll({include: [Product]})
// //     console.log('ORDERSSSS', orders)
// //   })
// // })

// // // it('creates at least one order that has no products', () => {
// // //     const ordersWithNoProducts = orders
// // //       .filter((order) => !order.products.length)
// // //       .map((order) => order.name);
// // //     expect(ordersWithNoProducts).to.have.lengthOf.above(0);
// // //   });
