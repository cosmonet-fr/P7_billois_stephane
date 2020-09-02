const User = require('../models/user');

exports.isModerator = (req, res, next) => {
  console.log('go');
  console.log(req.params.id);
  async function isModerator(id) {
    await User.update({ moderator: req.body.moderator }, {
      where: { id: id }
    }
    )}
    isModerator(req.params.id);
    return res.status(200).json({ moderator: req.body.moderator })
}
