const mongoose = require('mongoose')

// create for orders 

const OrdersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productId: String,
  quantity: Number
})

module.exports = mongoose.model('Orders', OrdersSchema)