const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = callback => {
    //to connect to mongodb
    MongoClient.connect(
        'mongodb+srv://amma:JtQqu5wWTRgw1fxC@node-cluster0.s7oljdr.mongodb.net/shop?retryWrites=true&w=majority'
    )
        .then(client => {
            console.log('Connected');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
//module.exports = mongoConnect;



/*Sequelize
const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-complete', 'root', 'Sujatha@99', {
    host: 'localhost',
    dialect: 'mysql'
});
module.exports = sequelize;
*/
//mysql
/*const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'Sujatha@99'
});
module.exports = pool.promise();
*/