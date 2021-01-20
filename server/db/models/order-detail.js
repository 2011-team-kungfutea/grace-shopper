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

const checkQuantity = orderDetail => {
  if (orderDetail.quantity > orderDetail.product.quantity) {
    const err = new Error(`Too Many ${orderDetail.product}s.`)
    throw err
  }
}

Order_Detail.beforeCreate(checkQuantity)
Order_Detail.beforeUpdate(checkQuantity)

module.exports = Order_Detail
