const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');
const mongoose =require('mongoose');
//const expressHbs = require('express-handlebars');//handlebars are imported

const errorController = require('./controllers/error');

//const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');


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
   User.findById('63e68080822b9c6f1e082b30')
     .then(user => {
    req.user = user;
     next();
   })
   .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);


app.use(shopRoutes);

app.use(errorController.get404page);

mongoose
  .connect('mongodb+srv://amma:JtQqu5wWTRgw1fxC@node-cluster0.s7oljdr.mongodb.net/shop')
.then(result =>{
  User.findOne().then(user=>{
    if(!user){
      const user = new User({
        name:'Sujatha',
        email:'dummy@yahoo.com',
        cart:{
          items:[]
        }
      });
      user.save();    
    }
  });
  app.listen(3000);
}).catch(err => {
  console.log(err);
});
