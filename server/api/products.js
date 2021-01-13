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

router.post('/:productId', async (req, res, next) => {
  try {
    console.log(req.session)
    const allOrders = await Order.findOrCreate({
      where: {
        userId: req.session.userId,
        isOrdered: false
      },
      include: [{model: Order_Detail}],
      defaults: {userId: req.session.userId, isOrdered: false}
    })
    //console.log(allOrders)
    res.send(allOrders)
  } catch (error) {
    next(error)
  }
})

// var cart = req.body;
//  req.session.cart = cart;
//  req.session.save(function(err)
