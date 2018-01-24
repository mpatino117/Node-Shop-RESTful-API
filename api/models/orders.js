const mongoose = require('mongoose')

// create for orders 

const OrdersSchema = mongoose.Schema({
  // moongoose proivdes validatio option 
  _id: mongoose.Schema.Types.ObjectId,
  productId:{type: String, required: true},
  quantity: {type: Number, required: true}
})

module.exports = mongoose.model('Orders', OrdersSchema)