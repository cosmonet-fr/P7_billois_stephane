const express = require('express');
const router = express.Router();
const auth = require('../auth');
const auth2 = require('../auth2');
const ownerControl = require('../ownerControl');
const messagesCtrl = require('../controllers/messagesCtrl');
const Message = require('../models/message');
const multer = require('multer');
const multerMedia = require('../multerMedia');
const upload = multer({ dest: 'pictures/' });


//new Message
router.post('/new/:id(\\d+)', auth2, multerMedia, messagesCtrl.new);

//update Message
router.put('/edit/:id&:idPOST', auth2, ownerControl, multerMedia, messagesCtrl.edit);

//DELETE Message !
router.post('/rm/:id&:idPOST', auth2, ownerControl, messagesCtrl.deleteMessage);

//Public Wall
router.get('/public_wall', auth, messagesCtrl.publicWall);

//User's Wall
router.get('/wall_of/:id(\\d+)', auth, messagesCtrl.wallOf);

//Get one post
router.get('/post/:id_post(\\d+)', auth, messagesCtrl.onePost);

//Get comments of
router.get('/comments/:id_post(\\d+)', auth, messagesCtrl.commentsOf);

// new Comment
router.post('/new_comment/:id&:idCOMMENT', auth2, multerMedia, messagesCtrl.newComment);

module.exports = router;
