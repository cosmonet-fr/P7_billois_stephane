const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.post('/signup', function(req, res, next){
  console.log('req.body : '+req.body);
});


app.use(express.json());
module.exports = app;