const router = require('express').Router()
const {Product, Order, Order_Detail} = require('../db/models')
module.exports = router

// GET '/'
router.get('/', () => {})

// GET '/:userId'
router.get('/:userId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.session.passport.user,
        isOrdered: false
      },
      include: [{model: Order_Detail}, {model: Product}]
    })

    res.send(order)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.session.passport.user,
        isOrdered: false
      },
      include: [{model: Order_Detail}, {model: Product}]
    })
    await order.update(localStorage)

    await order.save()
    await order.reload()
    res.send(order)
  } catch (error) {
    next(error)
  }
})
