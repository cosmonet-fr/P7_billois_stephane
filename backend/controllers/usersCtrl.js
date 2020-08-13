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
  const email = req.body.email;




  ////////////////////////::::
  async function login() {
    const login = await User.findOne({ where: { email: email } });
if (login === null) {
  return res.status(400).json({ errors: ["email ou mot de passe invalide"]  });

} else {
  bcrypt.compare(req.body.password, login.password, function(err, result) {
      // result == true

      if (result === false) {
        return res.status(400).json({ errors: ["email ou mot de passe invalide"]  });

      } else {
        var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
        return res.status(200).json({ token: token });

      }
  });
  console.log(login instanceof User); // true
  console.log(login.email); // 'My Title'
}

  }
  login();
};
