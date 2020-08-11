//Imports:
const Sequelize = require('sequelize');

// Sequelize:
const sequelize = new Sequelize('groupomania_db_dev', 'bilbou', 'openclassrooms', {
  host: 'localhost',
  dialect: 'mariadb',
  //logging: true,
  //pool: { max :5, min:0, idle: 1000,},
});
sequelize.authenticate()
  .then(() => console.log('Connexion à MariaDB réussie ! ʕ•ᴥ•ʔ '))
  .catch((err) => console.log('Connexion à MariaDB échouée ! :', err));

module.exports = sequelize
