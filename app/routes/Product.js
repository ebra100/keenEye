const express = require('express');
const { auth } = require('../../midldewares/auth');
const router = express.Router();
const ProductController = require("../controllers/ProductController");

const multer = require('multer')
const upload = multer({ dest: './' })

/* GET users listing. */
router.get('/', auth, ProductController.listProducts);
router.post('/', auth, upload.single('image'), ProductController.addProducts);


module.exports = router;
