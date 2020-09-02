const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminCtrl');
const auth = require('../auth');
const isAdmin = require('../isAdmin');


router.put('/is_moderator/:id(\\d+)', auth, isAdmin, adminCtrl.isModerator);

module.exports = router;
