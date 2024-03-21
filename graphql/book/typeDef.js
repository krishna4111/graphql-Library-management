const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const BookType = new GraphQLObjectType({
  name: "BookType",
  fields: () => ({
    id: { type: GraphQLInt },
    bookName: { type: GraphQLString },
    authorName: { type: GraphQLString },
    rentalCostPerDay: { type: GraphQLInt },
    bookPrice: { type: GraphQLInt },
    bookOwnerShip: { type: GraphQLInt },
  }),
});

module.exports = BookType;
