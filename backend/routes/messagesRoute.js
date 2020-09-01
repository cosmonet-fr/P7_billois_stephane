const express = require('express');
const router = express.Router();
const auth = require('../auth');
const auth2 = require('../auth2');
const messagesCtrl = require('../controllers/messagesCtrl');
const Message = require('../models/message');


//new Message
router.post('/new/:id(\\d+)', messagesCtrl.new);


module.exports = router;
