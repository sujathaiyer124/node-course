const path = require('path');

const express = require('express');

//const routeDir = require('../util/path');
//const adminData = require('./admin');
const shopController = require('../controllers/shop');
const router = express.Router();
router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

 router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.post('/create-order', shopController.postOrder);
router.get('/orders', shopController.getOrders);

//router.get('/checkout', shopController.getCheckout);
/*router.get('/', (req, res, next) => {
    const products = adminData.products;
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasproduct: products.length > 0,
        activeShop: true,
        productCSS: true, 
    });//render will use the default templating engine.we also dont have to construct path to the folder
    //here shop.pug file will come

    //console.log('shop.js',adminData.products);
    //res.sendFile(path.join(routeDir, 'views', 'shop.html'));

});*/

module.exports = router;
