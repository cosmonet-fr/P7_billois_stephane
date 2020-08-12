//Imports:
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


exports.signup = (req, res, next) => {

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
};


exports.login = (req, res, next) => {

  console.table(req.body);

  //Récupération et validation des paramètres
  let email = req.body.email;
  let password = req.body.password;
  if (email === undefined || password === undefined) {
      res.status(400).json({ error: 'Il manque un paramètre' })
  }

  ////////////////////////::::
  async function start() {
    const sequelize = require('../connectDB');
    const { QueryTypes } = require('sequelize');
    const users = await sequelize.query("SELECT id, email, username, url_image, bio  FROM Users WHERE email='" + email + "' AND password='" + password + "'", { type: QueryTypes.SELECT });
    console.table(users);
    console.log('Vous êtes connecté en tant que',users[0].username);

  }
  start();
};
