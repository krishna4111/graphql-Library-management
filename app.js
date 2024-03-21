const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sequelize = require("./databaseconnection/db");
const User = require("./model/user");
const Book = require("./model/book");
const BuyBook = require("./model/buybook");
const BorrowBook = require("./model/borrowbook");
app.use(bodyParser.json());

const { graphqlHTTP } = require("express-graphql");
const { GraphQLObjectType, GraphQLSchema } = require("graphql");

const userMutations = require("./graphql/user/mutations");
const userQuery = require("./graphql/user/query");

const bookMutations = require("./graphql/book/mutation");
const bookQuery = require("./graphql/book/query");

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...userQuery,
    ...bookQuery,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...userMutations,
    ...bookMutations,
  }),
});

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: new GraphQLSchema({
      query: Query,
      mutation: Mutation,
    }),
  })
);

sequelize
  // .sync({ force: true })
  .sync()
  .then((res) => {
    console.log("connection maded successfully");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(`some error happened ${err}`);
  });
