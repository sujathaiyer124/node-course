//const products = [];
const Product = require('../models/product');
const Cart = require('../models/cart');
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
    Product.fetchAll()
        .then(([rows]) => {
            res.render('shop/product-list', {
                prods: rows,
                // prods: products,
                pageTitle: 'All Products',
                path: '/products'
            });
        })
        .catch(err => console.log(err));
    /*Product.fetchAll(products => {
        res.render('shop/product-list', {
            //const products = adminData.products;
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
            //hasproduct: products.length > 0,
            //activeShop: true,
            //productCSS: true,
        });
    });*/
};
//product detail 
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(([product]) => {
            res.render('shop/product-detail', {
                product: product[0],
                pageTitle: product.title,
                path: '/products'
            });
        })
        .catch(err => console.log(err));
    /*Product.findById(prodId, product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        });
        //console.log(product);
    });*/
    //res.redirect('/');
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/index', {
                prods: rows,
                // prods: products,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch(err => console.log(err));
    /* Product.fetchAll(products => {
         res.render('shop/index', {
             //const products = adminData.products;
             prods: products,
             pageTitle: 'Shop',
             path: '/'
             //hasproduct: products.length > 0,
             //activeShop: true,
             //productCSS: true,
         });
     });*/
};

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(
                    prod => prod.id === product.id
                );
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your cart',
                products: cartProducts
            });
        });
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
    });
    //console.log(prodId);
    res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/Checkout',
        pageTitle: 'Checkout'
    });
};







