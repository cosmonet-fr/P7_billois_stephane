const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log(req.headers.authorization);
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.params.id && req.params.id != userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: "Vous devez être connecté pour acéder à cette page !"
    });
  }
};
