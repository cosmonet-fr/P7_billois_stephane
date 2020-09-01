const jwt = require('jsonwebtoken');
const Message = require('../models/message');

// new Message
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

// Get the public wall
exports.publicWall = ( req, res, next) => {
  console.log("Welcom to the Public Wall !");
  async function getThePublicWall() {
    const sequelize = require('../connectDB');
    const { QueryTypes } = require('sequelize');
    const publicWall = await sequelize.query("SELECT * FROM Messages", { type: QueryTypes.SELECT })
    console.table(publicWall);
    return res.status(200).json(publicWall);
  }
  getThePublicWall();
}

//User's Wall
exports.wallOf = (req, res, next) => {
  async function getTheWallOf(id) {
    const sequelize = require('../connectDB');
    //const { QueryTypes } = require('sequelize');
    const thisWall = await Message.findAll({
      where: { idUSERS: id },
      attributes: ['id', 'idUSERS', 'title', 'content', 'attachement', 'likes', 'createdAt', 'updatedAt' ]
    });
    console.table(thisWall);
    //console.log(req.params.id);
    return res.status(200).json(thisWall);
  }
  getTheWallOf(req.params.id);

}
