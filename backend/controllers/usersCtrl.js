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
        //password: req.body.password
        password: hash
      });
      //Save dans la DB ici

    //.then(() => res.status(201).json({ message: 'Utilisateur crée' }))
    //.catch(error => res.status(500).json({ message: 'Cette adresse mail semble être déjà utilisée' }));
    })
};

exports.login = (req, res, next) => {
  //
  console.log('Connexion:');
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
