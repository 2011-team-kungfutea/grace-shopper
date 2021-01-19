const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.BIGINT,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://i.pinimg.com/originals/d8/08/44/d8084458b3565a675f244e432e9d8d7f.jpg'
    // set(val) {
    //   if (val === null)
    //     this.setDataValue(
    //       'imageUrl',
    //       'https://i.pinimg.com/originals/d8/08/44/d8084458b3565a675f244e432e9d8d7f.jpg'
    //     )
    // }
  }
})

module.exports = Product
