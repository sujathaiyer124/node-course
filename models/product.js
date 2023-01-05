//to save it in file import file 
const fs = require('fs');
const path = require('path');

const Cart = require('./cart');
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);
//const products = []; we save our product to a file and not to this array anymore
const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {

        if (err) {
            cb([]);
            //return [];
        } else {
           // console.log(fileContent);
            cb(JSON.parse(fileContent));
        }
    });
    //return products;
};//helper function
module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(
                    prod => prod.id === this.id
                );
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                    console.log(err);
                });
            }
        });
    }
    /*const p = path.join(
        //path.dirname(process.mainModule.filename),
        //'data',
        //'products.json'
    //);*/
    //fs.readFile(p, (err, fileContent) => {
    //  let products = [];
    /*if (!err) {
        products = JSON.parse(fileContent);
    }*/

    //console.log(fileContent);
    //});
    //products.push(this);
    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id);//filter also takes an anonymous function and will return all elements as part of a new array that do match with crietria .
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteProduct(id, product.price);
                }
            });
        });
    }
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);//a default javascript method.This will execute a function we pass to find on every element in the array.
            cb(product);
        });
    }
};