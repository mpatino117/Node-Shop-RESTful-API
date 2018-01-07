const mongoose = require('mongoose')

// create Schema for product. ObjectId assigns a unique id utilizing mongoose

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
})

// assigned name of Schema and schema assigned to it

module.exports = mongoose.model('Products', productSchema)