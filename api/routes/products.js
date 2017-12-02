const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: "Handling GET for products"
	})
})

router.post('/', (req, res, next) => {
	res.status(201).json({
		message: "Handling POST for products"
	})
})


router.get('/:productId', (req, res, next) => {
	const id = req.param.productId
	if (id % 2 == 0) {
		res.status(200).json({
			message: "Handling get by id  for products",
			id: id
		})
	} else {
		res.status(200).json({
			message: "Handling get by id  for was error as it was odd"
		})
	}
})

router.patch('/:productId', (req, res, next) => {
	const id = req.param.productId
	if (id % 2 == 0) {
		res.status(200).json({
			message: "Handling patch by id for products",
			id: id
		})
	} else {
		res.status(200).json({
			message: "Handling patch by id  for was error as it was odd"
		})
	}

})

router.delete('/:productId', (req, res, next) => {
	const id = req.param.productId
	if (id % 2 == 0) {
		res.status(200).json({
			message: "Handling delete by id  for products",
			id: id
		})
	} else {
		res.status(200).json({
			message: "Handling delete by id  for was error as it was odd"
		})
	}
})


// Need to make sure that routes are exported

module.exports = router