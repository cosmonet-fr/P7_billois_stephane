//Imports:
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Sequelize = require('sequelize');
const usersRoute = require('./routes/usersRoute');
const usersCtrl = require('./controllers/usersCtrl');

//app.route('/users/register/').post(usersCtrl.register);
//app.route('/users/login/').post(usersCtrl.register);


app.use('/', usersRoute);


// Sequelize
const sequelize = new Sequelize('groupomania_db_dev', 'bilbou', 'openclassrooms', {
  host: 'localhost',
  dialect: 'mariadb',
  pool: { max :5, min:0, idle: 1000,},
});
sequelize.authenticate()
  .then(() => console.log('Connexion à MariaDB réussie ! ʕ•ᴥ•ʔ '))
  .catch((err) => console.log('Connexion à MariaDB échouée ! :', err));

  // CROSS
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  app.post('/test', function(req, res, next){
    console.log(req.body);
  });


//app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000);

app.use(express.json());
module.exports = app;
