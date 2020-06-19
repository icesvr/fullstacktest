const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_URI,
    dialect: 'mysql'
  });
sequelize.authenticate().then().catch(err => console.log("err",err));

module.exports = sequelize;