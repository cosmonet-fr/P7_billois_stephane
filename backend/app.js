//Imports:
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const usersRoute = require('./routes/usersRoute');
const usersCtrl = require('./controllers/usersCtrl');
const { body, validationResult } = require('express-validator');



//app.use(express.json());
app.post('/test', [
  // username must be an email
  body('username').isEmail().withMessage('Votre adresse email doit avoire la forme : mon-login@mon-domaine.org'),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 }).withMessage('Votre mot de passe doit contenir au moins six caractères.')
], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.json("Email et mot de passe ok !!!");
});

// CROSS:
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', usersRoute);
app.post('/test', function(req, res, next){
  console.log(req.body);
});
module.exports = app;
