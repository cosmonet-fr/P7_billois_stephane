const express = require('express');
const router = express.Router();
const auth = require('../auth');
const auth2 = require('../auth2');
const messagesCtrl = require('../controllers/messagesCtrl');
const Message = require('../models/message');


//new Message
router.post('/new/:id(\\d+)', auth2, messagesCtrl.new);

//update Message
router.post('/edit/:id&:idPOST', auth2, messagesCtrl.edit);

//Public Wall
router.get('/public_wall', auth, messagesCtrl.publicWall);

//User's Wall
router.get('/wall_of/:id(\\d+)', auth, messagesCtrl.wallOf);

//Get one post
router.get('/post/:id_post(\\d+)', auth, messagesCtrl.onePost);

module.exports = router;
