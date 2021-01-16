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

//do I need/add in the url? need to find order_details by orderId
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
        quantity: req.body.quantity, //logic if orderId already exists
        price: req.body.price
      }
    })
    console.log('NEW ITEM', newItem)
    if (!newItem[1]) {
      newItem[0].quantity = req.body.quantity + newItem[0].quantity
    }
    const addedItem = await newItem[0].save()
    res.send(addedItem)
  } catch (err) {
    next(err)
  }
})
