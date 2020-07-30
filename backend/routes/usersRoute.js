const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/usersCtrl');

//const userCtrl = require('../controllers/userCtrl.js');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
