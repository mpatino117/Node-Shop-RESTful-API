const express = require('express')
const router = express.Router()
const multer = require('multer')


const checkAuth = require('../middleware/check_auth')
const productsControllers = require('../controllers/products')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname)
  }
})

const upload = multer({
  storage: storage
})

router.get('/', productsControllers.get_all_products)

router.post('/', checkAuth, upload.single('productImage'), productsControllers.post_products)

router.get('/:productId', checkAuth, productsControllers.get_productById)

router.patch('/:productId', checkAuth, productsControllers.update_product)

router.delete('/:productId', checkAuth, productsControllers.delete_product)


// Need to make sure that routes are exported

module.exports = router