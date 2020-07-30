//Imports:
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req, res, next) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = User.create({
        email: req.body.email,
        username: req.body.username,
        //password: req.body.password
        password: hash
      });
      //Save dans la DB ici

    //.then(() => res.status(201).json({ message: 'Utilisateur crée' }))
    //.catch(error => res.status(500).json({ message: 'Cette adresse mail semble être déjà utilisée' }));
    })
};

exports.login = (req, res, next) => {

};
