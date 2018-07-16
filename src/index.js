const { GraphQLServer } = require("graphql-yoga");
const { Prisma } = require("prisma-binding");

const dummyUser = {
  id: "cjjlmquwscq4m0b22qc5tqfwh",
  email: "test@test.com",
  firstName: "first",
  lastName: "last",
  friends: []
};

const dummyChat = {
  id: "cjjlmquwscq4m0b22qc5tqfwh",
  title: "test title",
  members: [],
  messages: []
};

const dummyMessage = {
  id: dummyUser.id,
  author: dummyUser,
  createdAt: "test date",
  content: "test content"
};

const resolvers = {
  Query: {
    userFriends: (_, args, context, info) => {
      return [dummyUser];
    },
    userName: (_, args, context, info) => {
      return {
        firstName: dummyUser.firstName,
        lastName: dummyUser.lastName
      };
    },
    chat: (_, args, context, info) => {
      return dummyChat;
    }
  },
  Mutation: {
    signup: (_, args, context, info) => {
      return [dummyUser];
    },
    signin: (_, args, context, info) => {
      return [dummyUser];
    },
    addFriend: (_, args, context, info) => {
      return [dummyUser];
    },
    changeUserName: (_, args, context, info) => {
      return [dummyUser];
    },
    changeUserEmail: (_, args, context, info) => {
      return [dummyUser];
    },
    startChat: (_, args, context, info) => {
      return dummyUser;
    },
    updateChatTitle: (_, args, context, info) => {
      return dummyUser;
    },
    addMembersToChat: (_, args, context, info) => {
      return dummyUser;
    },
    sendMessageToChat: (_, args, context, info) => {
      return dummyMessage;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "src/schema.graphql",
  resolvers,
  /*
   * Hide resolveType warning on Node type from showing in
   * in the console when booting the server. This warning
   * occurs because of a disparity between the resolvers
   * exposed by the Prisma service and the application server.
   * 
   * Refer to the following github issue for more information:
   * https://github.com/prismagraphql/prisma/issues/2225
   */
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
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
