const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.safe-brook-46248,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;
