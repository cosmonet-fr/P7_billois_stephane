//Imports:
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { validationResult } = require('express-validator');
const multer = require('multer');
const upload = multer({ dest: 'pictures/' });
const bodyParser = require('body-parser');
const fs = require('fs');







// Signup
exports.signup = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    User.create({
      email: req.body.email,
      username: req.body.username,
      url_image: req.body.url_image,
      bio: req.body.bio,
      //password: req.body.password
      password: hash
    }).then( user => { res.status(201).json({message: "Votre compte a bien été créé :-)"} ); })
    .catch(exception => { res.status(400).json({error: "Cet e-mail est déjà présant dans la base de données !"} ) });


  })

}



// Login
exports.login = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //Récupération et validation des paramètres
  const email = req.body.email;

  ////////////////////////::::
  async function login() {

    const login = await User.findOne({ where: { email: email } });
if (login === null) {
  return res.status(400).json({ errors: ["Email ou mot de passe invalide"]  });

} else {
  bcrypt.compare(req.body.password, login.password, function(err, result) {
      // result == true

      if (result === false) {
        return res.status(400).json({ errors: ["Email ou mot de passe invalide"]  });

      } else {
        // Il faut ajouter l'id de l'utilisateur dans le TOKEN
        var token = jwt.sign({ userId: login.id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '3h' });
        return res.status(200).json({ token: token });

      }
  });
  //res.json("Email et mot de passe ok !!!");
}

  }
  login();
};



// All users list
exports.getAllUsers = (req, res, next) => {
  async function startGetAllUsers() {
    const sequelize = require('../connectDB');
    const { QueryTypes } = require('sequelize');
    const usersList = await sequelize.query("SELECT id, username, email, moderator FROM Users", { type: QueryTypes.SELECT })
    return res.status(200).json(usersList);
  }
  startGetAllUsers();
}



// Get one profil
exports.getProfil = (req, res, next) => {
  async function startGetProfil() {
    const sequelize = require('../connectDB');
    const { QueryTypes } = require('sequelize');
    const thisUser = await User.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'email', 'username', 'url_image', 'bio', 'admin', 'moderator', 'createdAt', 'updatedAt' ]
    });
    return res.status(200).json(thisUser);

}

startGetProfil();
}



//DELETE
exports.deleteProfil = (req, res, next) => {
  async function startDeleteProfil() {
    const sequelize = require('../connectDB');
    const thisProfil = await User.findOne({ where: { id: req.params.id } });
    bcrypt.compare(req.body.password, thisProfil.password, function(err, result) {
      const magicPhrase = 'Je souhaite supprimer mon compte ' + thisProfil.username + '.';
      if (result === true && magicPhrase === req.body.magicPhrase) {
        async function startDeleteProfilSQL() {
          const { QueryTypes } = require('sequelize');
          const SqlQueryForDeleteMsg = await sequelize.query("DELETE Messages FROM Messages WHERE user_id='" + req.params.id + "'",  { type: QueryTypes.DELETE });
          const SqlQueryForDelete = await sequelize.query("DELETE Users FROM Users WHERE id='" + req.params.id + "'",  { type: QueryTypes.DELETE });
        }
        startDeleteProfilSQL();
        return res.status(200).json({supprimer: thisProfil.username })

      } else {
        return res.status(400).json({ errors: ["Mot de passe invalide ou phrase mal recopiée."]  });
      }
    });
    //return res.status(400).json({ errors: ["errors"]  });
    //return res.status(200).json({supprimer: thisProfil.username })
}
startDeleteProfil();
}



// Update Profil
exports.edit = (req, res, next) => {

  // Data validation with express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Get req.body data
  async function startEditProfil() {
    await User.update({
      email: req.body.email,
      username: req.body.username,
      bio: req.body.bio,
    },
    {where: {id: req.params.id}});
  }
  // Get url avatar if she existed
  async function startEditAvatar(url) {
    await User.update({
      url_image: url
    },
    {where: {id: req.params.id}});
  }

  if (req.file === undefined) {
    startEditProfil()
    return res.status(201).json({edit: req.body})

  } else if (req.file !== undefined) {
    const size = req.file.size;
    const url_image = req.protocol + '://'+ req.get('host') + '/' + req.file.path;


    startEditProfil(); // For save req.body in the DB
    startEditAvatar(url_image) // For save url of avatar in the DB


    if (size < 2000000) {
      startEditProfil()
      return res.status(201).json({message: 'Votre profil à été actualisé'});
    } else {
      return res.status(201).json({message: 'Votre image est trop lourde ! 2 Mo max'});
    }

  }
}



// New Password
exports.newPassWd = (req, res, next) => {
  // Data validation with express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const sequelize = require('../connectDB');
  async function startNewPassWd() {
    thisProfil = await User.findOne({ where: { id: req.params.id } });
    bcrypt.compare(req.body.password, thisProfil.password, function(err, result) {
      if (result === true) {
        bcrypt.hash(req.body.newPassword, 10)
        .then(hash => {
          async function newPassInDb() {
            await User.update({ password: hash }, { where: { id: req.params.id } });
          }
          newPassInDb();
        })
        return res.status(201).json({message: 'Votre mot de passe à bien été modifié.'});
      } else if (result === false) {
        return res.status(401).json({ errors: 'Mot de passe incorecte !' });
      }
    });
  }
  startNewPassWd();
}
