import { GraphQLServer } from "graphql-yoga";
import { Prisma } from "prisma-binding";

import { Context } from "./utils";

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
    userFriends: (_, _args, _context: Context, _info) => {
      return [dummyUser];
    },
    userName: (_, _args, _context: Context, _info) => {
      return {
        firstName: dummyUser.firstName,
        lastName: dummyUser.lastName
      };
    },
    chat: (_, _args, _context: Context, _info) => {
      return dummyChat;
    }
  },
  Mutation: {
    signup: (_, _args, _context: Context, _info) => {
      return [dummyUser];
    },
    signin: (_, _args, _context: Context, _info) => {
      return [dummyUser];
    },
    addFriend: (_, _args, _context: Context, _info) => {
      return [dummyUser];
    },
    changeUserName: (_, _args, _context: Context, _info) => {
      return [dummyUser];
    },
    changeUserEmail: (_, _args, _context: Context, _info) => {
      return [dummyUser];
    },
    startChat: (_, _args, _context: Context, _info) => {
      return dummyUser;
    },
    updateChatTitle: (_, _args, _context: Context, _info) => {
      return dummyUser;
    },
    addMembersToChat: (_, _args, _context: Context, _info) => {
      return dummyUser;
    },
    sendMessageToChat: (_, _args, _context: Context, _info) => {
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
