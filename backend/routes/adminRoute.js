const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminCtrl');
const auth = require('../auth');
const isAdmin = require('../isAdmin');
const isModerator = require('../isModerator');


router.put('/is_moderator/:id(\\d+)', auth, isAdmin, adminCtrl.isModerator);

//DELETE Message !
router.post('/postRm/:idPOST(\\d+)', auth, isModerator, adminCtrl.deleteMessage);

//DELETE simple User !
router.post('/userRm', auth, isModerator, adminCtrl.deleteSimpleUser);

module.exports = router;
