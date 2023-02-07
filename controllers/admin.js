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
    const product = new Product(
        title,
        price,
        description,
        imageUrl,
        null,
        req.user._id
        );
    product.save()
        // req.user
        //     .createProduct({
        //         title: title,
        //         price: price,
        //         imageUrl: imageUrl,
        //         description: description,
        //         //userId: req.user.id
        //     })
        /*Product.create({
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description,
            //userId: req.user.id
        })*/
        .then(result => {
            //console.log(result);
            console.log('Created Product');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};
// const product = new Product(req.body.title);
/*const product = new Product(null, title, imageUrl, description, price);
product
    .save()
    .then(() => {
        res.redirect('/');
    })
    .catch(err => console.log(err));
// products.push({ title: req.body.title });
//res.redirect('/');*/


exports.getEditproduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    //req.user.getProducts({ where: { id: prodId } })
    Product.findByPk(prodId)
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
    /*Product.findById(prodId, product => {
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
    });*/
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updateddesc = req.body.description;

    const product = new Product(
        updatedTitle,
        updatedPrice,
        updateddesc,
        updatedImageUrl,
        prodId
    );
    /*Product.findByPk(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.imageUrl = updatedImageUrl;
            product.description = updateddesc;
            return product.save();
        })*/
    product
        .save()
        .then(result => {
            console.log('Updated Products');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
    /* const updatedProduct = new Product(
        prodId, updatedTitle, updatedImageUrl, updateddesc, updatedPrice
    );
    updatedProduct.save();*/

};

exports.getProducts = (req, res, next) => {
    //Product.findAll()
    //getProducts will give products for user
    //req.user.getProducts()
    Product.fetchAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => console.log(err));
    /*Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });*/
};
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId)
    /*Product.findByPk(prodId)
        .then(product => {
            return product.destroy();
        })*/
        .then(() => {
            console.log('Destroyed Product');
        })
        .catch(err => console.log(err));
    //Product.deleteById(prodId);
    res.redirect('/admin/products');
};
