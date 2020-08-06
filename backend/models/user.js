const Sequelize = require('sequelize');
const connectDB = require('../connectDB');

module.exports = connectDB.define('User', {
    email: Sequelize.DataTypes.STRING,
    username: Sequelize.DataTypes.STRING,
    password: Sequelize.DataTypes.STRING,
    url_image: Sequelize.DataTypes.STRING,
    bio: Sequelize.DataTypes.STRING,
    admin: Sequelize.DataTypes.BOOLEAN
  });
