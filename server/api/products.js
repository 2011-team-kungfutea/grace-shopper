const router = require('express').Router()
const {Product, Order, Order_Detail} = require('../db/models')
module.exports = router

//GET all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

//GET one product by Id
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)

    res.json(product)
  } catch (err) {
    next(err)
  }
})

//NEED to change userId to session id
router.post('/:productId', async (req, res, next) => {
  try {
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
    const newOrderDetail = await Order_Detail.create({
      orderId: currentOrder.id,
      productId: req.params.productId,
      quantity: 1,
      price: req.body.price
    })
    res.send(newOrderDetail)
  } catch (error) {
    next(error)
