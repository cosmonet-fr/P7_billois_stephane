const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/usersCtrl');

//const userCtrl = require('../controllers/userCtrl.js');

router.get('/hello', function(req, res) {
  res.send('<h1>hello world !!!<br />usersRoute.js</h1>');
});

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
