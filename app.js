const express = require('express')
const app = express()
const morgan = require('morgan')

// set routes for modularity

const products_routes = require('./api/routes/products')
const orders_routes = require('./api/routes/orders')

// use morgan to handle request

app.use(morgan('dev'))

app.use('/products', products_routes)
app.use('/orders', orders_routes)

app.use((req, res, next ) => {
  let error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

// handle errors for default route

app.get('*', function (req, res, next) {
  setImmediate(() => {
    next(new Error('woops error in our routes'));
  });
})

module.exports = app
