const Product = require('../models/product');

exports.getAddproduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add-Product',
        path: '/admin/add-product',
        editing: false
        //formCSS: true, productCSS: true,
        //activeAddProduct: true
    });
};

exports.postAddproduct = (req, res, next) => {
    // console.log(req);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    // const product = new Product(req.body.title);
    const product = new Product(null, title, imageUrl, description, price);
    product
        .save()
        .then(() => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
    // products.push({ title: req.body.title });
    //res.redirect('/');
};

exports.getEditproduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
            //formCSS: true, productCSS: true,
            //activeAddProduct: true
        });
    });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updateddesc = req.body.description;
    const updatedProduct = new Product(
        prodId, updatedTitle, updatedImageUrl, updateddesc, updatedPrice
    );
    updatedProduct.save();
    res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
};
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
};
