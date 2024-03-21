const BookType = require("./typeDef");
const Book = require("../../model/book");
const BuyBook = require("../../model/buybook");
const BorrowBook = require("../../model/borrowbook");

const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt,
} = require("graphql");
const sequelize = require("../../databaseconnection/db");

const MessageType = new GraphQLObjectType({
  name: "MessageType",
  fields: () => ({
    message: { type: GraphQLString },
  }),
});

const addBook = {
  type: MessageType,
  args: {
    bookName: { type: GraphQLNonNull(GraphQLString) },
    authorName: { type: GraphQLNonNull(GraphQLString) },
    rentalCostPerDay: { type: GraphQLInt },
    bookPrice: { type: GraphQLInt },
  },
  resolve: async (parent, args, context, info) => {
    try {
      const bookPresent = await Book.findOne({
        where: { bookName: args.bookName },
      });
      if (bookPresent) {
        return {
          message: "This book is already present",
        };
      }
      const book = await Book.create(args);
      return {
        message: "Book Added Successfully",
      };
    } catch (err) {
      console.log(err);
    }
  },
};

const buyBook = {
  type: MessageType,
  args: {
    bookId: { type: GraphQLInt },
    userId: { type: GraphQLInt },
  },
  resolve: async (parent, args, context, info) => {
    let transaction;

    try {
      transaction = await sequelize.transaction();

      const book = await Book.findOne({
        where: { id: args.bookId, isDeleted: false, bookOwnerShip: null },
        transaction,
      });

      if (book) {
        const buyBook = await BuyBook.create(args, { transaction });

        const updateBook = await Book.update(
          { isDeleted: true, bookOwnerShip: args.userId },
          { where: { id: args.bookId }, transaction }
        );
        await transaction.commit();
      } else {
        return {
          message: "Book not found or already buy by someone",
        };
      }
      return {
        message: "Book bought successfully",
      };
    } catch (err) {
      await transaction.rollback();
      console.log("error");
      throw new Error("Failed to buy book");
    }
  },
};

const borrowBook = {
  type: MessageType,
  args: {
    bookId: { type: GraphQLInt },
    userId: { type: GraphQLInt },
  },
  resolve: async (parent, args, context, info) => {
    let transaction;

    try {
      transaction = await sequelize.transaction();

      const book = await Book.findOne({
        where: { id: args.bookId, isDeleted: false, bookOwnerShip: null },
        transaction,
      });
      if (book) {
        const borrowBook = await BorrowBook.create(args, { transaction });

        await Book.update(
          { bookOwnerShip: args.userId },
          { where: { id: args.bookId }, transaction }
        );
      } else {
        return {
          message: "This book is borrowed by some one ",
        };
      }
      await transaction.commit();
      return {
        message: "book borrowed successfully",
      };
    } catch (err) {
      await transaction.rollback();
      console.log(error);
      throw new Error("Failed To Borrow This Book ");
    }
  },
};

const returnBook = {
  type: MessageType,
  args: {
    bookId: { type: GraphQLInt },
    userId: { type: GraphQLInt },
  },
  resolve: async (parent, args, context, info) => {
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const bookBorrowed = await BorrowBook.update(
        {
          isReturned: true,
        },
        { where: { bookId: args.bookId, userId: args.userId }, transaction }
      );

      await Book.update(
        { bookOwnerShip: null },
        { where: { id: args.bookId }, transaction }
      );

      await transaction.commit();
      return {
        message: "book returned",
      };
    } catch (err) {
      await transaction.rollback();
      console.log(err);
    }
  },
};

module.exports = {
  addBook,
  buyBook,
  borrowBook,
  returnBook,
};
