const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/usersCtrl');
const { body } = require('express-validator');
const auth = require('../auth')

//const userCtrl = require('../controllers/userCtrl.js');

router.post('/signup', [
  // username must be an email
  body('email').isEmail().withMessage('Votre adresse email doit avoire la forme : mon-login@mon-domaine.org'),
  // 255 chaeset max for bio
  body('bio').isLength({ max: 255 }).withMessage('Votre biographie est limitée à 255 caractères.'),
  // password must be at least 6 chars long
  body('password').isLength({ min: 6 }).withMessage('Votre mot de passe doit contenir au moins six caractères.')
], userCtrl.signup);

router.post('/login', [
  // username must be an email
  body('email').isEmail().withMessage('Votre adresse email doit avoire la forme : mon-login@mon-domaine.org'),
  // password must be at least 6 chars long
  body('password').isLength({ min: 6 }).withMessage('Votre mot de passe doit contenir au moins six caractères.')
], userCtrl.login);
router.get('/profil/:id', userCtrl.getProfil);
router.get('/edit', auth, userCtrl.edit);

module.exports = router;
