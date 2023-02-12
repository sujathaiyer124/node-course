const path = require('path');

const express = require('express');

//const routeDir = require('../util/path');
const adminController = require('../controllers/admin');
const router = express.Router();

//const products = [];
//admin/add-product =>GET
router.get('/add-product', adminController.getAddproduct);

//admin/add-product =>GET for edit products
router.get('/products', adminController.getProducts);

// //admin/add-product =>POST
 router.post('/add-product', adminController.postAddproduct);

 router.get('/edit-product/:productId', adminController.getEditproduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
