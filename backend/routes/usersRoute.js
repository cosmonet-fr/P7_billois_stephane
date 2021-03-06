const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/usersCtrl');
const { body } = require('express-validator');
const auth = require('../auth');
const auth2 = require('../auth2');
const multer = require('multer');
const multerConf = require('../multerConf');
const upload = multer({ dest: 'pictures/' });



// Signup
router.post('/signup', [ // Array for express-validator
  // username must be an email
  body('email').isEmail().withMessage('Votre adresse email doit avoire la forme : mon-login@mon-domaine.org'),
  // username not null
  body('username').isLength({ min: 3, max: 255}).withMessage('Votre nom d\'utilisateur doit avoir entre 3 et 255 caractères. '),
  // 255 chaeset max for bio
  body('bio').isLength({ max: 255 }).withMessage('Votre biographie est limitée à 255 caractères.'),
  // password must be at least 6 chars long
  body('password').isLength({ min: 6 }).withMessage('Votre mot de passe doit contenir au moins six caractères.')
],
userCtrl.signup);



// Login
router.post('/login', [ // Array for express-validator
  // username must be an email
  body('email').isEmail().withMessage('Votre adresse email doit avoire la forme : mon-login@mon-domaine.org'),
  // password must be at least 6 chars long
  body('password').isLength({ min: 6 }).withMessage('Votre mot de passe doit contenir au moins six caractères.')
],
userCtrl.login);



// DELETE User
router.post('/rm/:id(\\d+)', auth2, userCtrl.deleteProfil);



// Get all users list
router.get('/users', auth, userCtrl.getAllUsers);



// Get One profil
router.get('/users/:id(\\d+)', auth, userCtrl.getProfil);



// Edit One profil
router.put('/edit/:id(\\d+)', multerConf, [ // Array for express-validator
  // username must be an email
  body('email').isEmail().withMessage('Votre adresse email doit avoire la forme : mon-login@mon-domaine.org'),
  // username not null
  body('username').isLength({ min: 3, max: 255}).withMessage('Votre nom d\'utilisateur doit avoir entre 3 et 255 caractères. '),
  // 255 chaeset max for bio
  body('bio').isLength({ max: 255 }).withMessage('Votre biographie est limitée à 255 caractères.')
],
userCtrl.edit);



 // Edit password
 router.put('/new_passwd/:id(\\d+)', auth2, [
   // password must be at least 6 chars long
   body('newPassword').isLength({ min: 6 }).withMessage('Votre mot de passe doit contenir au moins six caractères.')
 ],
userCtrl.newPassWd);






module.exports = router;
