const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Sujatha@99', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;


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