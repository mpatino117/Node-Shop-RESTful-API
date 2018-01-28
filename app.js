const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const torch = require('torch')

// dotenv to set enviroment variable package in hidden .env file

require('dotenv').config()

mongoose.connect(`mongodb://mpatino117:${process.env.MONGO_DB_PW}@node-rest-shard-00-00-nqmpg.mongodb.net:27017,node-rest-shard-00-01-nqmpg.mongodb.net:27017,node-rest-shard-00-02-nqmpg.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shard-0&authSource=admin`, {
  useMongoClient: true
})

mongoose.Promise = global.Promise

// set routes for modularity

const products_routes = require('./api/routes/products')
const orders_routes = require('./api/routes/orders')
const users_routes = require('./api/routes/users')

// use morgan to handle request

app.use(morgan('dev'))
// parse url and json to make it readable
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({
  urlencoded: false
}))
app.use(bodyParser.json())

// ensure that we do not have CORSE errors. Security standards for the browser

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, Authorization')
  if (req.method == 'OPTIONS') {
    res.header('ACCESS-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE')
    return res.status(200).json({})
  }
  next()
})

app.use('/products', products_routes)
app.use('/orders', orders_routes)
app.use('/users', users_routes)


app.use((req, res, next) => {
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