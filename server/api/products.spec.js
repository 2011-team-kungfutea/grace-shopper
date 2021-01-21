/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/', () => {
    const nameTest = 'Nato'
    const priceTest = 100
    const quantityTest = 1

    beforeEach(() => {
      return Product.create({
        name: nameTest,
        price: priceTest,
        quantity: quantityTest
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(nameTest)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
