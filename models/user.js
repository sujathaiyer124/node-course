const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    cart:{
        items:[
            {
            productId:{
                type:Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            quantity:{
                type:Number,
                required:true
            }
        }
    ]
    }
});
userSchema.methods.addToCart = function(product){
                //certain items exists in cart or not
                const cartProductIndex = this.cart.items.findIndex(cp => {
                    return cp.productId.toString() === product._id.toString();
                });
                let newQuantity = 1;
                const updatedCartItems = [...this.cart.items];//create new array where you can copy in all the existing elements with the spread operator

                if (cartProductIndex >= 0) { //if product already exists
                    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
                    updatedCartItems[cartProductIndex].quantity = newQuantity;
                } else {
                    updatedCartItems.push({ 
                        productId: product._id, 
                        quantity: newQuantity
                     });
                }
                const updatedCart = {
                    items: updatedCartItems
                };
                this.cart=updatedCart;
                return this.save();
  };
userSchema.methods.removeFromCart = function(productId){
    const updatedCartItems = this.cart.items.filter(item => {
                    return item.productId.toString() !== productId.toString();
                });
                this.cart.items = updatedCartItems;
                return this.save();
 };
        
userSchema.methods.clearCart = function(){
    this.cart = { items : []};
    return this.save();
};

module.exports = mongoose.model('User',userSchema);
// const mongodb = require('mongodb');
// const getdb = require('../util/database').getDb;

// const ObjectId = mongodb.ObjectId;

// class User {
//     constructor(username, email, cart, id) {
//         this.name = username;
//         this.email = email;
//         this.cart = cart;
//         this._id = id;
//     }
//     save() {
//         const db = getDb();//store database client
//         return db.collection('users').insertOne(this);

//     }
//     
//     getCart() {
//        
//     }

//     deleteItemFromCart(productId) {
//         const updatedCartItems = this.cart.items.filter(item => {
//             return item.productId.toString() !== productId.toString();
//         });
//         const db = getdb();
//         return db
//             .collection('users')
//             .updateOne(
//                 { _id: new ObjectId(this._id) },
//                 { $set: { cart: { items: updatedCartItems } } }
//             );
//     }
//     addOrder(){
//         const db = getdb();
//         return this.getCart().then(products => {
//             const order= {
//                 items:products,
//                 user:{
//                     _id:new ObjectId(this._id),
//                     name:this.name
//                     //email:this.email
//                 }
//             };
//             return db.collection('orders').insertOne(order)
//         }).then(result =>{
//             this.cart = {items: []};
//             const db = getdb();
//         return db
//             .collection('users')
//             .updateOne(
//                 { _id: new ObjectId(this._id) },
//                 { $set: { cart: { items: [] } } }
//             );
//         });
//     }
//     getOrders(){
//        const db = getdb();
//        return db
//        .collection('orders')
//        .find({'user._id':new ObjectId(this._id)})
//        .toArray(); 

//     }
//     static findByPk(userId) {
//         const db = getdb();
//         return db
//             .collection('users')
//             .findOne({ _id: new ObjectId(userId) })
//             .then(user => {
//                 console.log(user);
//                 return user;
//             })
//             .catch(err => {
//                 console.log(err)
//             });
//     }
// }






// module.exports = User;
// // const Sequelize = require('sequelize');

// // const sequelize=require('../util/database');

// // const User = sequelize.define('user',{
// //     id: {
// //         type:Sequelize.INTEGER,
// //         autoIncrement:true,
// //         allowNull:false,
// //         primaryKey:true
// //     },
// //     name:Sequelize.STRING,
// //     email:Sequelize.STRING
// // });

// // module.exports = User;