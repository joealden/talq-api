import { Context, getUserId, checkAuth } from "./utils";

const Query = {
  user: (_, _args, context: Context, info) => {
    const userId = getUserId(context);

    return context.prisma.query.user(
      {
        where: {
          id: userId
        }
      },
      info
    );
  },

  users: (_, _args, context: Context, info) => {
    /* TODO: Add pagination */
    checkAuth(context);

    return context.prisma.query.users({}, info);
  },

  chat: async (_, args, context: Context, info) => {
    const userId = getUserId(context);

    const chatExistsAndUserIsMember = await context.prisma.exists.Chat({
      AND: [
        {
          id: args.chatId
        },
        {
          members_some: {
            id: userId
          }
        }
      ]
    });

    if (!chatExistsAndUserIsMember) {
      throw new Error(
        "Either this chat doesn't exist, or the logged in user is not a member of it"
      );
    }

    return context.prisma.query.chat(
      {
        where: {
          id: args.chatId
        }
      },
      info
    );
  },

  chats: (_, args, context: Context, info) => {
    const userId = getUserId(context);

    return context.prisma.query.chats(
      {
        where: {
          members_some: {
            id: userId
          }
        },
        orderBy: "updatedAt_DESC",
        first: args.first
      },
      info
    );
  }
};

export default Query;
