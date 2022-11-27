const path = require('path');

const express = require('express');

const routeDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();
router.get('/', (req, res, next) => {
    const products = adminData.products;
    res.render('shop', { prods: products, docTitle: 'Shop' });//render will use the default templating engine.we also dont have to construct path to the folder
    //here shop.pug file will come

    /*console.log('shop.js',adminData.products);
    res.sendFile(path.join(routeDir, 'views', 'shop.html'));*/

});

module.exports = router;
