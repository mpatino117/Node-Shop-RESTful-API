const express = require('express')
const mongoose = require('mongoose')
const torch = require('torch')

const checkAuth = require('../middleware/check_auth')
const Product = require('../models/product')
const Order = require('../models/order')


exports.order_all = (req, res, next) => {
  Product.findById(req.body.productId)
    .then(() => {
      Order.find()
        .select('product quantity _id')
        .populate('product', 'name price')
        .exec()
        .then((docs) => {
          return res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
              return {
                _id: doc._id,
                quantity: doc.quantity,
                product: doc.product
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
    .catch(() => {
      res.status.json({
        message: "Productid not found at all"
      })
    })
}


exports.order_post = (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      })
      return order.save()
    })
    .then((result) => {
      res.status(201).json({
        message: 'Order was stored',
        response: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + result._id
        }
      })
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      })
    })
}


exports.order_getById = (req, res, next) => {
  Orders.findById(req.params.OrderId)
    .exec()
    .then((doc) => {
      res.status(200).json({
        doc
      })
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Failed to get order id',
        error: error
      })
    })
}



exports.delete_orderById = (req, res, next) => {
  Orders.findById(req.params.OrderId)
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'Delete was completed',
        doc: doc
      })
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Failed to delete order',
        error: error
      })
    })
}