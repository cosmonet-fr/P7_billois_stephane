module.exports = (sequelize, DataTypes) => {
  let Message = sequelize.define('Message', {
    idUSERS: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachement: DataTypes.STRING,
    likes: DataTypes.INTEGER
  });
  return Message;
};
