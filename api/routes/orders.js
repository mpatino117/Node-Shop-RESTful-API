const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'orders were matched'
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