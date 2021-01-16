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

router.put('/:orderId/add/:productId', async (req, res, next) => {
  console.log('IM OUT THE POSt TRY')
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
    console.log('NEW ITEM', newItem)
    if (!newItem[1]) {
      newItem[0].quantity = 1 + newItem[0].quantity
    }
    const addedItem = await newItem[0].save()
    console.log(addedItem)
    res.send(addedItem)
  } catch (err) {
    next(err)
  }
})
