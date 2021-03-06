const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminCtrl');
const auth = require('../auth');
const isAdmin = require('../isAdmin');
const isModerator = require('../isModerator');

// Add moderator
router.put('/is_moderator', auth, isAdmin, adminCtrl.isModerator);

//Remove Moderator
router.put('/is_not_moderator', auth, isAdmin, adminCtrl.isNotModerator);

//DELETE Message !
router.post('/postRm/:idPOST(\\d+)', auth, isModerator, adminCtrl.deleteMessage);

//DELETE simple User !
router.post('/userRm', auth, isModerator, adminCtrl.deleteSimpleUser);

module.exports = router;
