const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  isOrdered: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  subtotal: {
    type: Sequelize.BIGINT,
    validate: {
      min: 0
    }
  }
})

module.exports = Order
