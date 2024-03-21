const Sequelize = require("sequelize");

const sequelize = require("../databaseconnection/db");
const Book = require("./book");
const User = require("./user");

const BorrowBook = sequelize.define("borrowbook", {
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
  returnDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  rentalCostCollected: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  isReturned: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

BorrowBook.belongsTo(Book, { foreignKey: "bookId" });
BorrowBook.belongsTo(User, { foreignKey: "userId" });

module.exports = BorrowBook;
