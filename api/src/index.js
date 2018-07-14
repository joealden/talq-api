const { GraphQLServer } = require("graphql-yoga");
const { Prisma } = require("prisma-binding");

const resolvers = {
  Query: {
    userFriends: (_, args, context, info) => {
      // ...
    },
    userName: (_, args, context, info) => {
      // ...
    },
    chat: (_, args, context, info) => {
      // ...
    }
  },
  Mutation: {
    signup: (_, args, context, info) => {
      // ...
    },
    signin: (_, args, context, info) => {
      // ...
    },
    addFriend: (_, args, context, info) => {
      // ...
    },
    changeUserName: (_, args, context, info) => {
      // ...
    },
    changeUserEmail: (_, args, context, info) => {
      // ...
    },
    startChat: (_, args, context, info) => {
      // ...
    },
    updateChatTitle: (_, args, context, info) => {
      // ...
    },
    addMembersToChat: (_, args, context, info) => {
      // ...
    },
    sendMessageToChat: (_, args, context, info) => {
      // ...
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "src/schema.graphql",
  resolvers,
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: "src/generated/prisma.graphql",
      endpoint: "https://eu1.prisma.sh/joe-alden-e4ab2a/talq-api/dev"
    })
  })
});
server.start(() =>
  console.log(`GraphQL server is running on http://localhost:4000`)
);
