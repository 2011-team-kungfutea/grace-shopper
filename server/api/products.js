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

//NEED to change userId to session id
router.post('/:productId', async (req, res, next) => {
  try {
    //console.log(req.session)
    let userId
    if (req.session.userId) {
      userId = req.session.userId
    } else {
      userId = 1
    }
    const currentOrder = await Order.findOne({
      where: {
        userId: userId,
        isOrdered: false
      },
      include: [
        {
          model: Order_Detail
        }
      ]
    })
    //console.log(allOrders)

    console.log('HERE IT IS!!!!!! => ', req.body)
    const newOrderDetail = await Order_Detail.create({
      orderId: currentOrder.id,
      productId: req.params.productId,
      quantity: 1,
      price: req.body.price
    })

    res.send(newOrderDetail)
  } catch (error) {
    next(error)
  }
})
