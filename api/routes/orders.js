const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const torch = require('torch')

// import Orders model from models. Utilize capitalize for consistency

const Orders = require('../models/orders')

router.get('/', (req, res, next) => {
  Orders.find()
    .exec()
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((error) => {
      res.status.json({
        message: 'Error in orders to find all'
      })
    })
})

router.post('/', (req, res, next) => {
  const orders = new Orders({
    _id: new mongoose.Types.ObjectId,
    productId: req.body.productId,
    quantity: req.body.quantity
  })
  orders.save()
    .then((result) => {
      res.status(201).json(result)
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error to post order'
      })
    })
})

router.get('/orderId', (req, res, next) => {
  const Id = res.params.orderId
  Orders.findById(Id)
    .exec()
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Failed to get order id',
        error: error
      })
    })
})

// Need to make sure that routes are exported

module.exports = router