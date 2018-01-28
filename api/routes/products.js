const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const torch = require('torch')
const multer = require('multer')

const checkAuth = require('../middleware/check_auth')
const Products = require('../models/product')

const storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, './uploads')
	},
	filename: function(req, file, cb){
    cb(null, new Date().toISOString() + '-' + file.originalname)
	}
})

const upload = multer({storage: storage})

// import products model from models. Utilize capitalize for consistency


router.get('/', (req, res, next) => {
	Products.find()

	// select is a moongose method that allows us to filter
	//  only data points we want in this instance it is only  name, price, id

		.select('name price _id productImage')
		.exec()
		.then((docs) => {

		//  validating data beign requested or outputed to user 
		// map response and created a new object
			
		const response = {
			count: docs.length,
			products: docs.map(doc => {
				return {
					_id: doc._id,
					name: doc.name,
					price: doc.price,
					productImage:doc.productImage,
					request: {
						type: "GET",
						url: "http://localhost:3000/products/" + doc._id
					}
				}
			})
		}	
		if(docs){
			res.status(200).json(response);
		} else {
			res.status(420).json(response);
		}
	})
		.catch((error) => {
			res.status(500).json(error)
    })
	})


router.post('/', checkAuth, upload.single('productImage'), (req, res, next) => {

	// create new instance of of products 
	const Product = new Products({
		_id: new mongoose.Types.ObjectId,
		name: req.body.name,
		price: req.body.price,
		productImage:req.file.path
	})

	Product.save()
		.then((result) => {
			res.status(201).json({
				message: 'Handling post request to /products',
				createdProduct: {
					_id:res._id,
					name:result.name,
					price:result.price,
					request:{
						type:'GET',
						url: `http://localhost:3000/products/${result._id}`
					}
				}
			})
		})
		.catch((error) => {
			res.status(500).json({
				message: 'Error post request to /products',
				createdProduct: error
			})
		})
})


router.get('/:productId', checkAuth,(req, res, next) => {
	const id = req.params.productId
	Products.findById(id)
		.exec()
		.then((doc) => {
			if (doc) {
				res.status(200).json({
					message:"Get single request",
					product:{
						_id:doc._id,
						name:doc.name,
						price:doc.price,
					}
				})
			} else {
				res.status(404).json({
					message: "No Valid Entry",
					doc: doc
				})
			}
		})
		.catch((error) => {
			res.status(500).json({
				message: 'Error get by ID to /products',
				createdProduct: error
			})
		})
})

router.patch('/:productId', checkAuth,(req, res, next) => {
	const _id = req.params.productId
	let updateOps = {}
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value
	}
	Products.update({_id}, {$set: updateOps})
		.exec()
		.then((result) => {
			res.status(200).json({
			  message: 'Product updated',
          request: {
						type: 'GET',
						url: 'http://localhost:3000/products/' + result._id
          }
			})
		})
		.catch((error) => {
			res.status(500).json({
				result: "Data not updated",
				error: error
			})
		})
})

router.delete('/:productId', checkAuth,(req, res, next) => {
  const id = req.params.productId;
	Products.remove({_id: id})
		.exec()
		.then((result) => {
			res.status(200).json({
				message:'Product Deleted',
				request:{
					type:'POST',
					url: 'http://localhost:3000/products'
				}
			})
		})
		.catch((error) => {
			res.status(500).json({
				result: "Data not deleted"
				})
		})
})


// Need to make sure that routes are exported

module.exports = router