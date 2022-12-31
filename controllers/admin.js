const Product = require('../models/product');

exports.getAddproduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add-Product',
        path: '/admin/add-product',
        formCSS: true, productCSS: true,
        activeAddProduct: true
    });
};

exports.postAddproduct = (req, res, next) => {
    // console.log(req);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    // const product = new Product(req.body.title);
    const product = new Product(title, imageUrl, description, price);
    product.save();
    // products.push({ title: req.body.title });
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
}
