//const products = [];
const Product = require('../models/product');
/*exports.getAddproduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add-Product',
        path: '/admin/add-product',
        formCSS: true, productCSS: true,
        activeAddProduct: true
    });
};

exports.postAddproduct = (req, res, next) => {
    console.log(req);
    const product = new Product(req.body.title);
    product.save();
    // products.push({ title: req.body.title });
    res.redirect('/');
};*/
//for shopjs file
exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            //const products = adminData.products;
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
            //hasproduct: products.length > 0,
            //activeShop: true,
            //productCSS: true,
        });
    });
};
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    console.log(prodId);
    res.redirect('/');
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            //const products = adminData.products;
            prods: products,
            pageTitle: 'Shop',
            path: '/'
            //hasproduct: products.length > 0,
            //activeShop: true,
            //productCSS: true,
        });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your cart'
    });
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
}
exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/Checkout',
        pageTitle: 'Checkout'
    });
}







