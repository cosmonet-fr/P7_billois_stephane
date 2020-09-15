const connectDB = require('./connectDB');

const models = {
   users: require('./models/user')(connectDB),
   messages: require('./models/message')(connectDB)
};

models.messages.belongsTo(models.users);
models.users.hasMany(models.messages);


module.exports = models;