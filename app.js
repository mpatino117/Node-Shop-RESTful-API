const express = require('express')
const app = express()

// set routes for modularity

const products_routes = require('./api/routes/products')
const orders_routes = require('./api/routes/orders')

app.use('/products', products_routes)

app.use('/orders', orders_routes)

app.get('*', function (req, res, next) {
  setImmediate(() => {
    next(new Error('woops error in our routes'));
  });
})

module.exports = app
