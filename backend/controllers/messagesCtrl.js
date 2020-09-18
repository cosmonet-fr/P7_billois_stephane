const jwt = require('jsonwebtoken');
const Message = require('../models/message');

// new Message
exports.new = (req, res, next) => {
  if (req.file === undefined) {
    newMessage()
    return res.status(201).json({newMessage: req.body });
  } else if (req.file !== undefined) {
    const url_attachement = req.protocol + '://' + req.get('host') + '/' + req.file.path;
    addMedia(url_attachement);
    return res.status(201).json({newMessage: req.body });
  }
  async function newMessage() {
    await Message.create({user_id: req.params.id, title: req.body.title, content: req.body.message });
  }
  async function addMedia(url) {
    await Message.create({user_id: req.params.id, title: req.body.title, content: req.body.message, attachement: url });
  }
}

// update Message
exports.edit = (req, res, next) => {
  if (req.file === undefined) {
    editMessage();
    return res.status(201).json({editMessage: req.body})

  } else if (req.file !== undefined) {
    const url_attachement = req.protocol + '://' + req.get('host') + '/' + req.file.path;
    editMessage();
    addMedia(url_attachement);
    return res.status(201).json({editMessage: url_attachement})


  }
  async function editMessage() {
    await Message.update({title: req.body.title, content: req.body.message }, {
      where: { id: req.params.idPOST }
    })
  }
  async function addMedia(url) {
    await Message.update({
      attachement: url
    },
  {where: {id: req.params.idPOST}});
  }
  //editMessage();
  //return res.status(201).json({editMessage: req.body})
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

// Get the public wall
exports.publicWall = ( req, res, next) => {
  async function getThePublicWall() {
    const sequelize = require('../connectDB');
    const { QueryTypes } = require('sequelize');
    const publicWall = await sequelize.query("SELECT Messages.title, Messages.content, Messages.attachement, Messages.createdAt, Messages.updatedAt, Messages.id, Messages.user_id, Users.url_image, Users.username FROM Messages INNER JOIN Users ON Messages.user_id = Users.id WHERE parent_id IS NULL", { type: QueryTypes.SELECT })
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
      where: { user_id: id },
      attributes: ['id', 'user_id', 'title', 'content', 'attachement', 'likes', 'createdAt', 'updatedAt' ]
    });
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
      attributes: ['id', 'user_id', 'title', 'content', 'attachement', 'likes', 'createdAt', 'updatedAt' ]
    });
    return res.status(200).json(thisPost);
  }
  getOnePost(req.params.id_post)
}

// Get comments of
exports.commentsOf = (req, res, next) => {
  async function getComments(parentId) {
    const sequelize = require('../connectDB');
    const { QueryTypes } = require('sequelize');
    const publicWall = await sequelize.query("SELECT Messages.id, Messages.user_id, Messages.title, Messages.content, Messages.attachement, Messages.createdAt, Messages.updatedAt, Users.url_image, Users.username FROM Messages INNER JOIN Users ON Messages.user_id = Users.id WHERE parent_id = " + parentId + ";", { type: QueryTypes.SELECT })
    return res.status(200).json(publicWall);
    //const comments = await Message.findAll({
    //  where: { parent_id: parentId },
    //  attributes: ['id', 'user_id', 'title', 'content', 'attachement', 'createdAt', 'updatedAt' ]
    //});
    //return res.status(200).json(comments);
  }
  getComments(req.params.id_post)
}

// new Comment
exports.newComment = (req, res, next) => {
  if (req.file === undefined) {
    newMessage()
    return res.status(201).json({newMessage: req.body });
  } else if (req.file !== undefined) {
    const url_attachement = req.protocol + '://' + req.get('host') + '/' + req.file.path;
    addMedia(url_attachement);
    return res.status(201).json({newMessage: req.body });
  }
  async function newMessage() {
    console.log(req.params.idCOMMENT);
    await Message.create({user_id: req.params.id, title: req.body.title, content: req.body.message, parent_id: req.params.idCOMMENT });
  }
  async function addMedia(url) {








    console.log(req.params.idCOMMENT);
    await Message.create({user_id: req.params.id, title: req.body.title, content: req.body.message, parent_id: req.params.idCOMMENT, attachement: url });
  }
}
