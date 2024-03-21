const BookType = require("./typeDef");
const UserType = require("../user/typeDef");
const { Op } = require("sequelize");

const Book = require("../../model/book");

const { GraphQLString, GraphQLInt, GraphQLList } = require("graphql");

const getBookById = {
  type: BookType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: async (parent, args, context, info) => {
    try {
      const book = await Book.findByPk(args.id);
    } catch (err) {
      console.log(err);
    }

    return book;
  },
};

const bookSearchByText = {
  type: new GraphQLList(BookType),
  args: {
    searchText: { type: GraphQLString },
  },
  resolve: async (parent, args, context, info) => {
    try {
      const { searchText } = args;

      const books = await Book.findAll({
        where: {
          [Op.or]: [
            { bookName: { [Op.like]: `%${searchText}%` } },
            { authorName: { [Op.like]: `%${searchText}%` } },
          ],
          isDeleted: false,
        },
      });
      if (books.length === 0) {
        return "there is no book present in this name";
      }
      return books;
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = {
  getBookById,
  bookSearchByText,
};
