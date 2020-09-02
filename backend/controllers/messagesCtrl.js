const jwt = require('jsonwebtoken');
const Message = require('../models/message');

// new Message
exports.new = (req, res, next) => {
  async function newMessage() {
    await Message.create({idUSERS: req.params.id, title: req.body.title, content: req.body.message });
    //const newMessage = await Message.create({ idUSER: req.params, title: "Mon 1er titre !", content: "Mon 1er post !" });
  }
  newMessage()
  return res.status(201).json({newMessage: req.body });
}

// update Message
exports.edit = (req, res, next) => {
  console.table(req.params);
  console.log(req.params.idUSER);
  console.log(req.params.idPOST);
  async function editMessage() {
    await Message.update({title: req.body.title, content: req.body.message }, {
      where: { id: req.params.idPOST }
    })
  }
  editMessage();
  return res.status(201).json({editMessage: req.body})
}

// Get the public wall
exports.publicWall = ( req, res, next) => {
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

// Get one Post
exports.onePost = (req, res, next) => {
  async function getOnePost(id) {
    const sequelize = require('../connectDB');
    //const { QueryTypes } = require('sequelize');
    const thisPost = await Message.findOne({
      where: { id: id },
      attributes: ['id', 'idUSERS', 'title', 'content', 'attachement', 'likes', 'createdAt', 'updatedAt' ]
    });
    //console.log(req.params.id);
    return res.status(200).json(thisPost);
  }
  getOnePost(req.params.id_post)
}
