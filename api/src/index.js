const { GraphQLServer } = require("graphql-yoga");
const { Prisma } = require("prisma-binding");

const resolvers = {
  Query: {
    userFriends: (_, args, context, info) => {
      return [
        {
          id: "cjjlmquwscq4m0b22qc5tqfwh",
          email: "test@test.com",
          firstName: "first",
          lastName: "last",
          friends: []
        }
      ];
    },
    userName: (_, args, context, info) => {
      return {
        firstName: "first",
        lastName: "last"
      };
    },
    chat: (_, args, context, info) => {
      return {
        id: "cjjlmquwscq4m0b22qc5tqfwh",
        title: "test title",
        members: [],
        messages: []
      };
    }
  },
  Mutation: {
    signup: (_, args, context, info) => {
      return {
        id: "cjjlmquwscq4m0b22qc5tqfwh",
        email: "test@test.com",
        firstName: "first",
        lastName: "last",
        friends: []
      };
    },
    signin: (_, args, context, info) => {
      return {
        id: "cjjlmquwscq4m0b22qc5tqfwh",
        email: "test@test.com",
        firstName: "first",
        lastName: "last",
        friends: []
      };
    },
    addFriend: (_, args, context, info) => {
      return {
        id: "cjjlmquwscq4m0b22qc5tqfwh",
        email: "test@test.com",
        firstName: "first",
        lastName: "last",
        friends: []
      };
    },
    changeUserName: (_, args, context, info) => {
      return {
        id: "cjjlmquwscq4m0b22qc5tqfwh",
        email: "test@test.com",
        firstName: "first",
        lastName: "last",
        friends: []
      };
    },
    changeUserEmail: (_, args, context, info) => {
      return {
        id: "cjjlmquwscq4m0b22qc5tqfwh",
        email: "test@test.com",
        firstName: "first",
        lastName: "last",
        friends: []
      };
    },
    startChat: (_, args, context, info) => {
      return {
        id: "cjjlmquwscq4m0b22qc5tqfwh",
        title: "test title",
        members: [],
        messages: []
      };
    },
    updateChatTitle: (_, args, context, info) => {
      return {
        id: "cjjlmquwscq4m0b22qc5tqfwh",
        title: "test title",
        members: [],
        messages: []
      };
    },
    addMembersToChat: (_, args, context, info) => {
      return {
        id: "cjjlmquwscq4m0b22qc5tqfwh",
        title: "test title",
        members: [],
        messages: []
      };
    },
    sendMessageToChat: (_, args, context, info) => {
      return {
        id: "cjjlmquwscq4m0b22qc5tqfwh",
        author: {
          id: "cjjlmquwscq4m0b22qc5tqfwh",
          email: "test@test.com",
          firstName: "first",
          lastName: "last",
          friends: []
        }
      };
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
