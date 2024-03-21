const UserType = require("./typeDef");
const bcrypt = require("bcrypt");
const User = require("../../model/user");
const jwt = require("jsonwebtoken");

const { GraphQLString, GraphQLObjectType, GraphQLNonNull } = require("graphql");

const MessageReturningType = new GraphQLObjectType({
  name: "MessageReturningType",
  fields: () => ({
    message: { type: GraphQLString },
  }),
});

const createUser = {
  type: MessageReturningType,
  args: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
  },
  resolve: async (parent, args, context, info) => {
    try {
      const user = await User.findOne({ where: { email: args.email } });
      if (user !== null) {
        return {
          message: "This User Already Presented try sign in ",
        };
      }
      args.password = await bcrypt.hashSync(args.password, 10);
      const userCreate = await User.create(args);
      return {
        message: "user created successfully",
      };
    } catch (err) {
      console.log(err);
    }
  },
};

const signIn = {
  type: MessageReturningType,
  args: {
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLString },
  },
  resolve: async (parent, args, context, info) => {
    try {
      const user = await User.findOne({ where: { email: args.email } });

      const result = await bcrypt.compareSync(args.password, user.password);
      const token = await jwt.sign(
        { userId: user.id, email: args.email, role: user.role },
        "serectKey"
      );

      if (!result) {
        return {
          message: "This password is wrong",
        };
      }
      return {
        message: token,
      };
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = {
  createUser,
  signIn,
};
