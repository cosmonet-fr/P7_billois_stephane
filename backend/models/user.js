const Sequelize = require('sequelize');
const connectDB = require('../connectDB');

module.exports = connectDB.define('User', {
    email: {type: Sequelize.DataTypes.STRING, unique: true},
    username: Sequelize.DataTypes.STRING,
    password: Sequelize.DataTypes.STRING,
    url_image: Sequelize.DataTypes.STRING,
    bio: Sequelize.DataTypes.STRING,
    admin: Sequelize.DataTypes.BOOLEAN
  });
