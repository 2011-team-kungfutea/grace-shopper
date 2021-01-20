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

//PUT all products in checkout
router.put('/checkout', async (req, res, next) => {
  try {
    const {order_details} = req.body.cart
    for (let i = 0; i < order_details.length; i++) {
      const product = await Product.findByPk(order_details[i].productId)
      product.quantity -= order_details[i].quantity
      if (product.quantity < 0) {
        const err = new Error(`Insufficient Inventory of ${product.name}`)
        err.name = 'UnavailableProduct'
        throw err
      } else {
        await product.save()
      }
    }
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

//PUT one product
router.put('/:productId', async (req, res, next) => {
  try {
    const {name, imageUrl, category, quantity, price, description} = req.body
    const updatedProduct = await Product.update(
      {
        name,
        imageUrl,
        category,
        quantity,
        price,
        description
      },
      {
        where: {id: req.params.productId},
        returning: true,
        plain: true
      }
    )
    if (updatedProduct[1]) res.send(updatedProduct[1])
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
