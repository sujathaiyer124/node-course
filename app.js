const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');
const app = express();

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
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