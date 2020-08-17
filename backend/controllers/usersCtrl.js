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

  //console.table(req.body);
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


exports.getProfil = (req, res, next) => {
  async function start0() {
  const sequelize = require('../connectDB');
  const { QueryTypes } = require('sequelize');
  const users = await sequelize.query("SELECT id, email, username, url_image, bio, admin, createdAt, updatedAt  FROM Users WHERE id='" + req.params.id + "'",  { type: QueryTypes.SELECT });
  console.table(users);
  console.log(req.params.id);
  return res.status(200).json({getUser: users});

}
start0();
}
exports.edit = (req, res, next) => {
  console.log('EDIT');
}
