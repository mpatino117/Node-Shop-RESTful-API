const express = require('express')
const router = express.Router()

// import Orders model from models. Utilize capitalize for consistency

const checkAuth = require('../middleware/check_auth')
const orderController = require('../controllers/orders')


router.get('/', orderController.order_all)

router.post('/', checkAuth,orderController.order_post )

router.get('/:orderId', checkAuth, orderController.order_getById)

router.delete('/:orderId', checkAuth, orderController.delete_orderById)

module.exports = router