const User = require('../models/user');
const Message = require('../models/message');

exports.isModerator = (req, res, next) => {
  async function isModerator(id) {
    await User.update({ moderator: 1 }, {
      where: { id: id }
    }
    )}
    isModerator(req.body.moderator);
    return res.status(200).json({ moderator: req.body.moderator })
}

exports.isNotModerator = (req, res, next) => {
  async function isModerator(id) {
    await User.update({ moderator: 0 }, {
      where: { id: id }
    }
    )}
    isModerator(req.body.moderator);
    return res.status(200).json({ moderator: req.body.moderator })
}

//Delete Message
exports.deleteMessage = (req, res, next) => {
  async function deleteMessage() {
    await Message.destroy({
      where: { id: req.params.idPOST }
    })
  }
  deleteMessage();
  return res.status(200).json({ Delete: req.params.idPOST })
}

//Delete simple user
exports.deleteSimpleUser = (req, res, next) => {
  async function deleteSimpleUser(idToRemove) {
    const user = await User.findOne({
      where: {id: idToRemove},
      attributes: ['admin', 'moderator']
    });
    if (user.admin === true) {
      return res.status(401).json({error: 'Vous n\'avez pas le droit de supprimer le compte d\'un Administrateur !'})
    } else if (user.moderator === true) {
      return res.status(401).json({error: 'Vous n\'avez pas le droit de supprimer le compte d\'un Modérateur !'})
    } else {
      const sequelize = require('../connectDB');
      const { QueryTypes } = require('sequelize');
      const SqlQueryForDeleteMsg = await sequelize.query("DELETE Messages FROM Messages WHERE user_id='" + idToRemove + "'",  { type: QueryTypes.DELETE });
      await User.destroy({
        where: {id: idToRemove}
      })
      return res.status(200).json({supprimer: idToRemove})
    }
    //return res.status(400).json({error: "problème inattendu"})
  }
  deleteSimpleUser(req.body.idRm)
}
