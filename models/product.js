//to save it in file import file 
const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);
//const products = []; we save our product to a file and not to this array anymore
const getProductsFromFile = (cb) => {

    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
            //return [];
        } else {
            cb(JSON.parse(fileContent));
        }
    });
    //return products;

}//helper function
module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        this.id=Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        });
        /*const p = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'products.json'
        );*/
        //fs.readFile(p, (err, fileContent) => {
        //  let products = [];
        /*if (!err) {
            products = JSON.parse(fileContent);
        }*/

        //console.log(fileContent);
        //});
        //products.push(this);
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

};