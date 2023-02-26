const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
//const expressHbs = require('express-handlebars');//handlebars are imported

const errorController = require('./controllers/error');

//const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://amma:JtQqu5wWTRgw1fxC@node-cluster0.s7oljdr.mongodb.net/shop';

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'

});
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
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store })
);

app.use((req, res, next) => {
  if(!req.session.user){
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404page);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Sujatha',
          email: 'dummy@yahoo.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  }).catch(err => {
    console.log(err);
  });
