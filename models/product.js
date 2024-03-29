const mongoose =require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});

module.exports = mongoose.model('Product',productSchema);


// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;
// //const mongoConnect = require('../util/database');
// class Product {
//     constructor(title, price, description, imageUrl, id,userId) {
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this._id = id ? new mongodb.ObjectId(id) : null;
//         this.userId=userId;
//     }
//     //to save into database and connect to mongodb
//     save() {
//         const db = getDb();
//         let db0p;
//         if (this._id) {
//             //update the product
//             db0p = db
//                 .collection('products')
//                 .updateOne({ _id: this._id }, { $set: this });
//         } else {
//             db0p = db.collection('products')
//                 .insertOne(this);
//         }

//         return db0p
//             .then(result => {
//                 console.log(result);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }
//     //get all the products
//     static fetchAll() {
//         const db = getDb();
//         return db.collection('products')
//             .find()
//             .toArray()
//             .then(products => {
//                 console.log(products);
//                 return products;
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//         //toArray you can execute to tell mongodb to get all documents
//         //and turn them into javascript array.

//     }
//     static findByPk(proId) {
//         const db = getDb();
//         return db
//             .collection('products')
//             .find({ _id: mongodb.ObjectId(proId) })
//             .next()
//             .then(product => {
//                 console.log(product);
//                 return product;
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }
//  static deleteById(prodId){
//     const db = getDb();
//     return db.collection('products')
//     .deleteOne({_id: new mongodb.ObjectId(prodId) })
//     .then(result => {
//         console.log(Deleted);
//     })
//     .catch(err => {
//         console.log(err);
//     });
//  }


// }

// module.exports = Product;
// //sequelize
// /*const Sequelize = require('sequelize');
// const sequelize = require('../util/database');*/
// /*const Product = sequelize.define('product', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     title: Sequelize.STRING,
//     price: {
//         type: Sequelize.DOUBLE,
//         allowNull: false
//     },
//     imageUrl: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     description: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// });
// */
// module.exports = Product;










// /*//to save it in file import file
// //const fs = require('fs');
// //const path = require('path');
// const db = require('../util/database');

// const Cart = require('./cart');
// /*const p = path.join(
//     path.dirname(process.mainModule.filename),
//     'data',
//     'products.json'
// );*/
// //const products = []; we save our product to a file and not to this array anymore
// /*const getProductsFromFile = cb => {
//     fs.readFile(p, (err, fileContent) => {

//         if (err) {
//             cb([]);
//             //return [];
//         } else {
//            // console.log(fileContent);
//             cb(JSON.parse(fileContent));
//         }
//     });
//     //return products;
// };//helper function*/
// /*module.exports = class Product {
//     constructor(id, title, imageUrl, description, price) {
//         this.id = id;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.price = price;
//     }
//     save() {
//         return db.execute
//             ('INSERT INTO products (title,price,description,imageUrl)VALUES (?,?,?,?)', [this.title, this.price, this.description, this.imageUrl]);
//         /*getProductsFromFile(products => {
//             if (this.id) {
//                 const existingProductIndex = products.findIndex(
//                     prod => prod.id === this.id
//                 );
//                 const updatedProducts = [...products];
//                 updatedProducts[existingProductIndex] = this;
//                 fs.writeFile(p, JSON.stringify(updatedProducts), err => {
//                     console.log(err);
//                 });
//             } else {
//                 this.id = Math.random().toString();
//                 products.push(this);
//                 fs.writeFile(p, JSON.stringify(products), err => {
//                     console.log(err);
//                 });
//             }
//         });*/
//     //}
// /*const p = path.join(
//     //path.dirname(process.mainModule.filename),
//     //'data',
//     //'products.json'
// //);*/
//     //fs.readFile(p, (err, fileContent) => {
//     //  let products = [];
// /*if (!err) {
//     products = JSON.parse(fileContent);
// }*/

//     //console.log(fileContent);
//     //});
//     //products.push(this);
//    // static deleteById(id) {
// /*getProductsFromFile(products => {
//     const product = products.find(prod => prod.id === id);
//     const updatedProducts = products.filter(prod => prod.id !== id);//filter also takes an anonymous function and will return all elements as part of a new array that do match with crietria .
//     fs.writeFile(p, JSON.stringify(updatedProducts), err => {
//         if (!err) {
//             Cart.deleteProduct(id, product.price);
//         }
//     });
// });*/
//     //}
// /* static fetchAll() {
//     return db.execute('SELECT * FROM products');
// }
// static findById(id) {
//     return db.execute('SELECT * FROM products WHERE products.id=?', [id]);
// }*/
//     //static fetchAll(cb) {
//     // getProductsFromFile(cb);
//     //}
//     //static findById(id, cb) {
// /* getProductsFromFile(products => {
//      const product = products.find(p => p.id === id);//a default javascript method.This will execute a function we pass to find on every element in the array.
//      cb(product);
//  });*/
//     //}
// //};
// //module.exports = Product;