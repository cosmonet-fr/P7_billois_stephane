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

  console.table(req.body);

  //Récupération et validation des paramètres
  let email = req.body.email;
  let password = req.body.password;
  if (email === undefined || password === undefined) {
      res.status(400).json({ error: 'Il manque un paramètre' })
  }

  ////////////////////////::::

  const mariadb = require('mariadb');
const db = mariadb.createConnection({
host : 'localhost',
user : 'bilbou',
password : 'openclassrooms',
database : 'groupomania_db_dev'
});
db.connect();

  db.query('SELECT id FROM utilisateurs WHERE email='+email+' AND password='+password+'', (error, results, fields) => {
if (error){
throw error;
}else{
console.log('Résultat : '+result);
}
});
db.end();

};
