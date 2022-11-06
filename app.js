
const express = require('express');

const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>PAge not found</h1>');
});
//const routes = require('./routing.js');
//function rqListener(req,res){

//} 
//http.createServer(rqListener);

//const server = http.createServer(routes);
//console.log(routes.someText);
//const server = http.createServer(app);

app.listen(3000);
//server.listen(3000);