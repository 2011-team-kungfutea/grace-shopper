const router = require('express').Router()
const {Product, Order, Order_Detail, User} = require('../db/models')
module.exports = router

// GET /:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const [order, created] = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        isOrdered: false
      },
      include: [{model: Order_Detail, include: [{model: Product}]}],
      defaults: {
        isOrdered: false,
        userId: req.params.userId
      }
    })
    res.send(order)
  } catch (error) {
    next(error)
  }
})

// POST '/'
router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create(
      {
        ...req.body.cart,
        isOrdered: true,
        user: {...req.body.formData}
      },
      {
        include: [{model: User}]
      }
    )
    const orderDetails = await Order_Detail.bulkCreate(
      req.body.cart.order_details.map(item => {
        item.orderId = order.id
        return item
      })
    )
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

router.put('/:orderId', async (req, res, next) => {
  try {
    const updatedOrder = await Order.update(
      {
        isOrdered: true
      },
      {
        where: {id: req.params.orderId},
        returning: true,
        plain: true
      }
    )
    if (updatedOrder[1]) {
      const newOrder = await Order.create({
        isOrdered: false,
        userId: updatedOrder[1].getDataValue('userId')
      })
      res.send(newOrder)
    } else {
      res.send(updatedOrder[1])
    }
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
