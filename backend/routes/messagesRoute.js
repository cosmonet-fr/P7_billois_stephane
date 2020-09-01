const express = require('express');
const router = express.Router();
const auth = require('../auth');
const auth2 = require('../auth2');
const messagesCtrl = require('../controllers/messagesCtrl');
const Message = require('../models/message');


//new Message
router.post('/new/:id(\\d+)', auth2, messagesCtrl.new);

//Public Wall
router.get('/public_wall', auth, messagesCtrl.publicWall);

//User's Wall
router.get('/wall_of/:id', auth, messagesCtrl.wallOf);

module.exports = router;
