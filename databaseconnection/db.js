const Sequelize = require("sequelize");

const sequelize = new Sequelize("library_management", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
