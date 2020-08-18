//Imports:
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { validationResult } = require('express-validator');



exports.signup = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.table(req.body);
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    console.log(User);
    const user = User.create({
      email: req.body.email,
      username: req.body.username,
      url_image: req.body.url_image,
      bio: req.body.bio,
      //password: req.body.password
      password: hash
    });

  })
  res.json("Email et mot de passe ok !!!");
}



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
    //console.table(User.findOne(id));
if (login === null) {
  return res.status(400).json({ errors: ["Email ou mot de passe invalide"]  });

} else {
  bcrypt.compare(req.body.password, login.password, function(err, result) {
      // result == true

      if (result === false) {
        return res.status(400).json({ errors: ["Email ou mot de passe invalide"]  });

      } else {
        // Il faut ajouter l'id de l'utilisateur dans le TOKEN
        console.table(login.id);
        var token = jwt.sign({ userId: login.id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '3h' });
        return res.status(200).json({ token: token });

      }
  });
  console.log(login instanceof User);
  console.log(login.email);
  //res.json("Email et mot de passe ok !!!");
}

  }
  login();
};

exports.getAllUsers = (req, res, next) => {
  async function startGetAllUsers() {
    const sequelize = require('../connectDB');
    const { QueryTypes } = require('sequelize');
    const usersList = await sequelize.query("SELECT id, username, email FROM Users", { type: QueryTypes.SELECT })
    console.table(usersList);
    return res.status(200).json({userListe: usersList});
  }
  startGetAllUsers();
}

exports.getProfil = (req, res, next) => {
  async function startGetProfil() {
  const sequelize = require('../connectDB');
  const { QueryTypes } = require('sequelize');
  const thisUser = await sequelize.query("SELECT id, email, username, url_image, bio, admin, createdAt, updatedAt  FROM Users WHERE id='" + req.params.id + "'",  { type: QueryTypes.SELECT });
  console.table(thisUser);
  console.log(req.params.id);
  return res.status(200).json({getUser: thisUser});

}
startGetProfil();
}
//DELETE
exports.deleteProfil = (req, res, next) => {
  async function startDeleteProfil() {
    const sequelize = require('../connectDB');
    const thisProfil = await User.findOne({ where: { id: req.params.id } });
    bcrypt.compare(req.body.password, thisProfil.password, function(err, result) {
      console.log(result);
      const magicPhrase = 'Je souhaite supprimer mon compte ' + thisProfil.username + '.';
      console.log(magicPhrase);
      if (result === true && magicPhrase === req.body.magicPhrase) {
        async function startDeleteProfilSQL() {
          const { QueryTypes } = require('sequelize');
          const SqlQueryForDelete = await sequelize.query("DELETE FROM Users WHERE id='" + req.params.id + "'",  { type: QueryTypes.DELETE });
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


exports.edit = (req, res, next) => {
  console.log('EDIT');
}
