const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');
//const expressHbs = require('express-handlebars');//handlebars are imported

const errorController = require('./controllers/error');

const sequelize = require('./util/database');
//const db= require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/orders');
const OrderItem = require('./models/order-item');

const app = express();


//app.engine('hbs', expressHbs({
//    layoutsDir: 'views/layout', defaultLayout: 'main-layout', extname: '.hbs'
//}));//engine method register a new templating engine

app.set('view engine', 'ejs');
//app.set('view engine', 'pug'); For using pug //global configuration value. App set allows us to set values globally on express application
//Syntax:app.set(name,value)
app.set('views', 'views');

//const adminData = require('./routes/admin');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

/*db.execute('SElect * FROM products')
.then(result => {
 console.log(result[0],result[1]);
})
.catch(err => {
 console.log(err);
}); some testing code*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(2)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404page);
//404 page not found

/*app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found!' ,path: "/404" });
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});*/
//const routes = require('./routing.js');
//function rqListener(req,res){

//} 
//http.createServer(rqListener);

//const server = http.createServer(routes);
//console.log(routes.someText);
//const server = http.createServer(app);

//Defining Relations
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  //.sync({ force: true })
  .sync()
  .then(result => {
    return User.findByPk(2);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: "Max", email: "test@test.com" });
    }
    return user;
  })
  .then(user => {
    //console.log(user);
    user.createCart();

  })
  .then(cart => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

//server.listen(3000);