const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  var order = {
		productId: req.body.productId,
		quantity: req.body.quantity
	}
  res.status(200).json({
    message: 'orders were matched',
    order: order
  })
})

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'orders were created'
  })

  router.get('/orderId', (req, res, next) => {
    const orderId = res.parama.orderId
    res.status(200).json({
      message: 'orders were matched'
    })
  })
})

// Need to make sure that routes are exported

module.exports = router