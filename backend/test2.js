const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.post('/', function(req, res, next){
  console.log(req.body.email);
  console.log(req.body.username);
  console.log(req.body.password);
});

module.exports = app;
