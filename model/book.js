const Sequelize = require("sequelize");

const sequelize = require("../databaseconnection/db");

const Book = sequelize.define("books", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  bookName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  authorName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rentalCostPerDay: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  bookPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  bookOwnerShip: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Book;
