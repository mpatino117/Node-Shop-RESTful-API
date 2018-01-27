const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const torch = require('torch')

// import Orders model from models. Utilize capitalize for consistency

const Products = require('../models/product')
const Orders = require('../models/order')

router.get('/', (req, res, next) => {
  Products.findById(req.body.productId)
    .then(()=>{
      Orders.find()
      .select('productId quantity _id')
      .populate('product', 'name')
      .exec()
      .then((docs) => {
        res.status(200).json({
          count:docs.length,
          orders: docs.map(doc => {
            return {
              _id:doc._id,
              quantity:doc.quantity,
              productId:doc.productId
  
            }
          })
        })
      })
      .catch((error) => {
        res.status.json({
          message: 'Error in orders to find all'
        })
      })
    })
    .catch(()=>{
        res.status.json({
          message:"Productid not found at all"
        })
    })
})

router.post('/', (req, res, next) => {

  // create new instance of of products 
  
  const Order = new Orders({
    _id: mongoose.Types.ObjectId(),
    product: req.body.productId,
    quantity: req.body.quantity
  })                            

  Order.save()
    .then((doc) => {
      res.status(201).json({
        message:'Order was post',
        response:{
          "product": doc.product,
          "quantity": doc.quantity
          }
      })
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error to post order'
      })
  
  })
})

router.get('/:orderId', (req, res, next) => {
  Orders.findById(req.params.OrderId)
    .exec()
    .then((doc) => {
      res.status(200).json({doc})
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