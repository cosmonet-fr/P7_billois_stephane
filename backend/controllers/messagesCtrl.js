const jwt = require('jsonwebtoken');
const Message = require('../models/message');

// Signup
exports.new = (req, res, next) => {
  console.log("Nouveau message !!!");
  console.log(req.params);
  console.log(req.body);
  async function newMessage() {
    console.log("Je passe ici !");
    await Message.create({idUSERS: req.params.id, title: req.body.title, content: req.body.message });
    //const newMessage = await Message.create({ idUSER: req.params, title: "Mon 1er titre !", content: "Mon 1er post !" });
    console.log("Je repasse par là !");

  }
  newMessage()

  return res.status(201).json({newMessage: req.body });
}
