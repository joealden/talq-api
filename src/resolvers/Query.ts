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

  chat: (_, args, context: Context, info) => {
    /* 
     * TODO: Only members of the chat can query any
     * chat fields. Replace below call to checkAuth.
     */

    checkAuth(context);

    return context.prisma.query.chat(
      {
        where: {
          id: args.chatId
        }
      },
      info
    );
  },

  chats: (_, _args, context: Context, info) => {
    const userId = getUserId(context);

    return context.prisma.query.chats(
      {
        where: {
          members_some: {
            id: userId
          }
        }
      },
      info
    );
  }
};

export default Query;
