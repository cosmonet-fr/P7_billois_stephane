//Imports:
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const usersRoute = require('./routes/usersRoute');
const messagesRoute = require('./routes/messagesRoute');
const usersCtrl = require('./controllers/usersCtrl');
const path = require('path');

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

app.use('/pictures', express.static(path.join(__dirname, 'pictures')));

app.use('/', usersRoute);
app.use('/message', messagesRoute);

module.exports = app;
