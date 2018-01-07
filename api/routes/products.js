const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const torch = require('torch')

// import products model from models. Utilize capitalize for consistency

const Products = require('../models/products.js')

router.get('/', (req, res, next) => {
	Products.find()
	.exec()
	.then((doc)=>{
		if(doc){
			res.status(200).json(doc)
		} else {
			res.status(420).json(doc)
		}
	})
	.catch((error)=>{
		res.status(500).json(doc)
	})
})

router.post('/', (req, res, next) => {

	// create new instance of of products 

	const products = new Products({
		_id: new mongoose.Types.ObjectId,
		name: req.body.name,
		price: req.body.price
	})
	products.save()
	.then((result) => {
		res.status(201).json({
			message: 'Handling post request to /products',
			createdProduct: result
			})
		})
	.catch((error) => {
		res.status(500).json({
			message: 'Error post request to /products',
			createdProduct: error
		})
	})
})


router.get('/:productId', (req, res, next) => {
	const id = req.params.productId
	Products.findById(id)
		.exec()
		.then((doc) => {
			if(doc){
				res.status(200).json({ message:'sucess' ,doc})
			} else {
				res.status(404).json({message:"No Valid Entry", doc: doc})
				}
			})
		.catch((error) => {
			res.status(500).json({
				message: 'Error get by ID to /products',
				createdProduct: error
			})
		})
})

router.patch('/:productId', (req, res, next) => {
	const _id = req.params.productId
	let updateOps = {}
	for (const ops of req.body){
		updateOps[ops.propName] = ops.value
	}
	Products.update({_id}, {$set: updateOps})
	.exec()
	.then((result)=>{
		res.status(200).json({message: "data changed", result})
	})
	.catch((error)=>{
		res.status(500).json({result: "Data not deleted"})
	})
})

router.delete('/:productId', (req, res, next) => {
	const id = req.params.productId
	Products.remove({_id: id})
	.exec()
	.then((result)=>{
		res.status(200).json(result)
	})
	.catch((error)=>{
		res.status(500).json({result: "Data not deleted"})
	})
})


// Need to make sure that routes are exported

module.exports = router