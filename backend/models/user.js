
module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    url_image: DataTypes.STRING,
    bio: DataTypes.STRING,
    admin: DataTypes.BOOLEAN
  });
  return User;
};
