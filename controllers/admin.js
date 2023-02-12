const mongodb = require('mongodb');
const Product = require('../models/product');

//const ObjectId = mongodb.ObjectId;
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
    const product = new Product({
        title:title,
        price:price,
        description:description,
        imageUrl:imageUrl,
        userId:req.user
    });
    product.save()
        .then(result => {
            //console.log(result);
            console.log('Created Product');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getEditproduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    //req.user.getProducts({ where: { id: prodId } })
    Product.findById(prodId)
        .then(product => {
            // const product = products[0];
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        })
        .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updateddesc = req.body.description;

    Product.findById(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.imageUrl = updatedImageUrl;
            product.description = updateddesc;
           return product.save();
        })
        .then(result => {
            //console.log('Updated Products');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    //getProducts will give products for user
    //req.user.getProducts()
    Product.find()
     //.select('title price -_id')
        //.populate('userId','name')
        .then(products => {
            console.log(products);
            res.render('admin/products', {
                
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => console.log(err));
};
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndRemove(prodId)
        .then(() => {
            console.log('Destroyed Product');
        })
        .catch(err => console.log(err));
    res.redirect('/admin/products');
};
