const router = require('express').Router()
const {Product, Order, Order_Detail} = require('../db/models')
module.exports = router

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

//PUT /:orderId/add/:productId
router.put('/:orderId/add/:productId', async (req, res, next) => {
  try {
    let newItem = await Order_Detail.findOrCreate({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      },
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
  
//DELETE /:orderId/delete/:productId
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
