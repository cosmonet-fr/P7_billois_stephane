const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const test2 = require('./test2')

app.use(express.json());
app.use('/signup', test2);
app.listen(3000);
