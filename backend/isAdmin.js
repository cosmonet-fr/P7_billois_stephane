const jwt = require('jsonwebtoken');
const User = require('./models/user');


module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  async function isAdmin() {
    const user = await User.findOne({
      where: {id: decodedToken.userId},
      attributes: ['admin']
    });
    if (user.admin === true) {
      next();

    } else {
      return res.status(401).json({ error: 'Accès interdit | Vousn\'êtes pas administrateur'})
    }
  }
  isAdmin()

}
