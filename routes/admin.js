const path = require('path');

const express = require('express');

//const routeDir = require('../util/path');
const adminController = require('../controllers/admin');
const router = express.Router();

//const products = [];
//admin/add-product =>GET
router.get('/add-product', adminController.getAddproduct);

//admin/add-product =>GET
router.get('/products', adminController.getProducts);
//res.sendFile(path.join(routeDir, 'views', 'add-product.html'));
// next();//Allows the request to continue to the next middleware

/*router.get('/add-product', (req, res, next) => {
    res.render('add-product', { pageTitle: 'Add-Product', path: '/admin/add-product', formCSS:true ,productCSS:true , activeAddProduct:true});
    //res.sendFile(path.join(routeDir, 'views', 'add-product.html'));
    // next();//Allows the request to continue to the next middleware
});*/

/*router.post('/add-product', (req, res, next) => {
    console.log(req);
    products.push({ title: req.body.title });

    res.redirect('/');
});*/
//admin/add-product =>POST
router.post('/add-product', adminController.postAddproduct);

router.get('/edit-product/:productId', adminController.getEditproduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
//exports.routes = router;
//exports.products = products;