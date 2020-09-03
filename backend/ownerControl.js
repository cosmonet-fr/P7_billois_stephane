const sequelize = require('./connectDB');
const Message = require('./models/message');


module.exports = (req, res, next) => {
  async function ownerControl() {
    console.log('Ok');
    const ownerId = await Message.findOne({
      where: {id: req.params.idPOST},
      attributes: [ 'user_id' ]
    })
    if (ownerId.user_id == req.params.id) {
      next();

    } else {
      return res.status(401).json({ error: "Vous n'êtes pas le propriétaire de ce post !"})

    }
  }
  ownerControl()
}
