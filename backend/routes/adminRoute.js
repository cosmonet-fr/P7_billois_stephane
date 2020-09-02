const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminCtrl');
const auth = require('../auth');


router.put('/is_moderator/:id(\\d+)', auth, adminCtrl.isModerator);

module.exports = router;
