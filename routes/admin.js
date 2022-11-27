const path = require('path');

const express = require('express');

const routeDir = require('../util/path');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
    res.render('add-product', { pageTitle: 'Add-Product' });
    //res.sendFile(path.join(routeDir, 'views', 'add-product.html'));
    // next();//Allows the request to continue to the next middleware
});
router.post('/add-product', (req, res, next) => {
    console.log(req);
    products.push({ title: req.body.title });

    res.redirect('/');
});

exports.routes = router;
exports.products = products;