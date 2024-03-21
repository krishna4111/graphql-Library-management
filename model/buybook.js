const Sequelize = require("sequelize");

const sequelize = require("../databaseconnection/db");
const Book = require("./book");
const User = require("./user");

const BuyBook = sequelize.define("buybook", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  bookId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

BuyBook.belongsTo(Book, { foreignKey: "bookId" });
BuyBook.belongsTo(User, { foreignKey: "userId" });

module.exports = BuyBook;
