const Sequelize = require('sequelize');
const connectDB = require('../connectDB');

module.exports = connectDB.define('Message', {
  user_id: Sequelize.DataTypes.INTEGER,
  title: Sequelize.DataTypes.STRING,
  content: Sequelize.DataTypes.TEXT,
  attachement: Sequelize.DataTypes.STRING,
  likes: Sequelize.DataTypes.INTEGER,
  is_posted: Sequelize.DataTypes.BOOLEAN,
  parent_id: Sequelize.DataTypes.INTEGER,

  });
