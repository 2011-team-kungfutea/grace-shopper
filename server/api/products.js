const router = require('express').Router()
const {Product, Order, Order_Detail} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// NEED to change userId to session id
router.post('/:productId', async (req, res, next) => {
  try {
    console.log(req.session)
    let userId
    if (req.session.userId) {
      userId = req.session.userId
    } else {
      userId = 1
    }
    const allOrders = await Order.findOrCreate({
      where: {
        userId: userId,
        isOrdered: false
      },
      include: [
        {
          model: Order_Detail
        }
      ],
      defaults: {
        userId: userId,
        isOrdered: false,
        orderDetails: []
      }
    })
    console.log(allOrders)
    res.send(allOrders[0])
  } catch (error) {
    next(error)
  }
})

// var cart = req.body;
//  req.session.cart = cart;
//  req.session.save(function(err)
