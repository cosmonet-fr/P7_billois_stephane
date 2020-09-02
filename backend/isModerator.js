const jwt = require('jsonwebtoken');
const User = require('./models/user');


module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  async function isModerator() {
    const user = await User.findOne({
      where: {id: decodedToken.userId},
      attributes: ['moderator']
    });
    if (user.moderator === true) {
      next();

    } else {
      return res.status(401).json({ error: 'Accès interdit | Vousn\'êtes pas Modérateur'})
    }
  }
  isModerator()

}
