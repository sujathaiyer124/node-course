const path = require('path');

const express = require('express');

const routeDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();
router.get('/', (req, res, next) => {
    console.log('shop.js',adminData.products);
    res.sendFile(path.join(routeDir, 'views', 'shop.html'));

});

module.exports = router;
