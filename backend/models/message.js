const Sequelize = require('sequelize');
const connectDB = require('../connectDB');

module.exports = connectDB.define('Message', {
  idUSERS: Sequelize.DataTypes.INTEGER,
  title: Sequelize.DataTypes.STRING,
  content: Sequelize.DataTypes.TEXT,
  attachement: Sequelize.DataTypes.STRING,
  likes: Sequelize.DataTypes.INTEGER
  });
