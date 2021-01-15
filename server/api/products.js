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

//POST one product
router.post('/', async (req, res, next) => {
  try {
    const {name, imageUrl, category, description, price, quantity} = req.body
    const newProduct = await Product.create({
      name,
      imageUrl,
      price,
      quantity,
      category,
      description
    })
    res.send(newProduct)
  } catch (error) {
    next(error)
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
  }
})

//DELETE one product by Id
router.delete('/:productId', async (req, res, next) => {
  try {
    await Product.destroy({
      where: {id: req.params.productId}
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
