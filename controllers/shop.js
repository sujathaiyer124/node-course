//const products = [];
const Product = require('../models/product');

const Cart = require('../models/cart');

/*exports.postAddproduct = (req, res, next) => {
    console.log(req);
    const product = new Product(req.body.title);
    product.save();
    // products.push({ title: req.body.title });
    res.redirect('/');
};*/
//for shopjs file
exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

//product detail 
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    /*Product.findAll({ where: { id: prodId } })
        .then(products => {
            res.render('shop/product-detail', {
                product: products[0],
                pageTitle: products[0].title,
                path: '/products'
            });
        })
        .catch(err => console.log(err));

        */
    Product.findByPk(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            });
        })
        .catch(err => console.log(err));
};
/*Product.findById(prodId, product => {
    res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
    });
    //console.log(product);
});*/
//res.redirect('/');
exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                // prods: products,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch(err => {
            console.log(err);
        });
};
/*Product.fetchAll()
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



/*Product.fetchAll()
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


exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(cart => {
            return cart
                .getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        path: '/cart',
                        pageTitle: 'Your cart',
                        products: products
                    });
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};
// console.log(cart);


// Cart.getCart(cart => {
//     Product.fetchAll(products => {
//         const cartProducts = [];
//         for (product of products) {
//             const cartProductData = cart.products.find(
//                 prod => prod.id === product.id
//             );
//             if (cartProductData) {
//                 cartProducts.push({ productData: product, qty: cartProductData.qty });
//             }
//         }
//         res.render('shop/cart', {
//             path: '/cart',
//             pageTitle: 'Your cart',
//             products: cartProducts
//         });
//     });
// });


exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: prodId } });
        })
        .then(products => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }
            let newQuantity = 1;
            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return fetchedCart.addProduct(product, {
                    through: { quantity: newQuantity }
                });
            }
            return Product.findByPk(prodId)
                .then(product => {
                    return fetchedCart.addProduct(product, {
                        through: { quantity: newQuantity }
                    });
                })
                .catch(err => console.log(err));
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err))
};
// const prodId = req.body.productId;
// Product.findById(prodId, product => {
//     Cart.addProduct(prodId, product.price);
// });
// //console.log(prodId);
// res.redirect('/cart');
//};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts({ where: { id: prodId } });
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
    /*Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');*/
    //});
};
exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            return req.user
                .createOrder()
                .then(order => {
                    return order.addProducts(
                        products.map(product => {
                            product.orderItem = { quantity: product.cartItem.quantity };
                            return product;
                        })
                    );
                })
                .catch(err => console.log(err));
            //console.log(products);
        })
        .then(result => {
            return fetchedCart.setProducts(null);
        })
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
    req.user
        .getOrders({ include: ['products'] })
        .then(orders => {
            //console.log(orders);
            res.render('shop/orders', { 
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
            });
        })
        .catch(err => console.log(err));

};

/*exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/Checkout',
        pageTitle: 'Checkout'
    });
};*/







