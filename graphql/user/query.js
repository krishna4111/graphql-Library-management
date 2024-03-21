const { GraphQLInt } = require("graphql");
const UserType = require("./typeDef");
const User = require("../../model/user");

const getUser = {
  type: UserType,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: async (parent, args, context, info) => {
    const user = await User.findByPk(args.id);
    return user;
  },
};

module.exports = {
  getUser,
};
