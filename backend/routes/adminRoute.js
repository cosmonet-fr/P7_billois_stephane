const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminCtrl');
const auth = require('../auth');
const isAdmin = require('../isAdmin');
const isModerator = require('../isModerator');


router.put('/is_moderator/:id(\\d+)', auth, isAdmin, adminCtrl.isModerator);

//DELETE Message !
router.delete('/postRm/:idPOST', auth, isModerator, adminCtrl.deleteMessage);

//DELETE simple User !
router.delete('/userRm', auth, isModerator, adminCtrl.deleteSimpleUser);

module.exports = router;
