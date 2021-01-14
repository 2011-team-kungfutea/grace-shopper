const Sequelize = require('sequelize')
const db = require('../db')

const Order_Detail = db.define('order_detail', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  }
})

module.exports = Order_Detail
