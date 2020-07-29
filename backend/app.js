//Imports:
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const usersRoute = require('./routes/usersRoute');
//const usersCtrl = require('./controllers/usersCtrl');

//app.route('/users/register/').post(usersCtrl.register);
//app.route('/users/login/').post(usersCtrl.register);

app.use('/', usersRoute);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
module.exports = app;
