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

router.delete('/:productId', async (req, res, next) => {
  //console.log('this is the delete items')
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
        //include: {model: Order_Detail},
      })
      //console.log('this is it', deleteCartItems)
      // const product = await Product.findByPk({
      // })
      // if (!deleteCartItems || !product) {
      //   res.send(404)
      // }
      await orderDetail.destroy()
      // .findOne({
      //   where: {
      //     id: req.params.id,
      //   },
      // })
      //console.log('i am deleting')
      res.sendStatus(204)
    }
  } catch (error) {
    next(error)
  }
})
