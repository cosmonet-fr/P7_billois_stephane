const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/usersCtrl');
const { body } = require('express-validator');

//const userCtrl = require('../controllers/userCtrl.js');

router.post('/signup', [
  // username must be an email
  body('email').isEmail().withMessage('Votre adresse email doit avoire la forme : mon-login@mon-domaine.org'),
  // password must be at least 5 chars long
  body('password').isLength({ min: 6 }).withMessage('Votre mot de passe doit contenir au moins six caractères.')
], userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
