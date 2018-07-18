import { Context, getUserId } from "./utils";

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

  /* TODO: Add 'users' query for friend search */

  chat: (_, args, context: Context, info) => {
    /* 
     * TODO: Only members of the chat can query
     * any chat fields.
     */

    return context.prisma.query.chat(
      {
        where: {
          id: args.chatId
        }
      },
      info
    );
  }
};

export default Query;
