const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers;
  console.log(token);
  return res.status(200).json({ token })
}
