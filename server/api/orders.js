const router = require('express').Router()
const {Product, Order, Order_Detail} = require('../db/models')
module.exports = router

// GET /:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const [order, created] = await Order.findOrCreate({
      where: {
        userId: req.session.passport.user,
        isOrdered: false
      },
      include: [{model: Order_Detail, include: [{model: Product}]}],
      defaults: {
        isOrdered: false,
        userId: req.session.passport.user
      }
    })
    // if (created) order.order_details = []
    res.send(order)
  } catch (error) {
    next(error)
  }
})

// PUT /:orderId/add/:productId
router.put('/:orderId/add/:productId', async (req, res, next) => {
  try {
    let newItem = await Order_Detail.findOrCreate({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      },
      include: [{model: Product}],
      defaults: {
        orderId: req.params.orderId,
        productId: req.params.productId,
        quantity: 1,
        price: req.body.price
      }
    })
    if (!newItem[1]) {
      newItem[0].quantity = 1 + newItem[0].quantity
    }
    const addedItem = await newItem[0].save()
    res.send(addedItem)
  } catch (err) {
    next(err)
  }
})

// PUT /:orderId/edit/:productId
router.put('/:orderId/edit/:productId', async (req, res, next) => {
  try {
    const quantityChange = req.body.hasOwnProperty('INCREASE_CART_ITEM')
      ? 1
      : -1
    let updatedCartItem = await Order_Detail.findOne({
      where: {
        productId: req.params.productId,
        orderId: req.params.orderId
      },
      include: [{model: Product}]
    })
    updatedCartItem.quantity = updatedCartItem.quantity + quantityChange
    updatedCartItem = await updatedCartItem.save()
    res.send(updatedCartItem)
  } catch (error) {
    next(error)
  }
})

// DELETE /:orderId/delete/:productId
router.delete('/:orderId/delete/:productId', async (req, res, next) => {
  try {
    const orderDetail = await Order_Detail.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      }
    })
    if (orderDetail) {
      await orderDetail.destroy()
    }
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

// DELETE /:productId
router.delete('/:productId', async (req, res, next) => {
  try {
    if (req.user) {
      const order = await Order.findOne({
        where: {
          userId: req.session.passport.user,
          isOrdered: false
        }
      })
      const orderDetail = await Order_Detail.findOne({
        where: {
          orderId: order.id,
          productId: req.params.productId
        }
      })
      await orderDetail.destroy()
      res.sendStatus(204)
    }
  } catch (error) {
    next(error)
  }
})
