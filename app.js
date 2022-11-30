const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');//handlebars are imported


const app = express();


app.engine('hbs', expressHbs({
    layoutsDir: 'views/layouts', defaultLayout: 'main-layout', extname: 'hbs'
}));//engine method register a new templating engine

app.set('view engine', 'hbs');
//app.set('view engine', 'pug'); For using pug //global configuration value. App set allows us to set values globally on express application
//Syntax:app.set(name,value)
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found!' });
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
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