import { Context, getUserId, checkAuth } from "../utils";

const chatMutations = {
  startChat: async (_, args, context: Context, info) => {
    /* 
     * TODO: Users should only be able to create a
     * chat if they are friends with all selected members.
     * Also a check needs to be made to ensure that all usernames
     * in args.usernames are valid (they actually exist).
     */

    const userId = getUserId(context);

    const user = await context.prisma.query.user({
      where: {
        id: userId
      }
    });

    /* args.title is optional, potentially redundant */
    const title = args.title ? args.title : null;

    if (args.usernames.includes(user.username)) {
      throw new Error(
        "The currently logged in user's username should not be included in the usernames array"
      );
    }

    return context.prisma.mutation.createChat(
      {
        data: {
          members: {
            connect: [
              /* ID of user that sent creation request */
              { username: user.username },
              /* IDs of other members to be added */
              ...args.usernames.map(username => ({
                username
              }))
            ]
          },
          title
        }
      },
      info
    );
  },

  updateChatTitle: (_, args, context: Context, info) => {
    /* 
     * TODO: Users should only be able to update 
     * the title if they are a member of the chat.
     * Replace below call to checkAuth.
     */

    checkAuth(context);

    return context.prisma.mutation.updateChat(
      {
        where: {
          id: args.chatId
        },
        data: {
          title: args.title
        }
      },
      info
    );
  },

  addMemberToChat: (_, args, context: Context, info) => {
    /* 
     * TODO: 
     * - Users should only be able to add a 
     *   member if they are a member of the chat.
     * - Error out if member is attempted to be
     *   added again.
     * Also, a check needs to be made to ensure that
     * the user that is being added is actually a valid
     * user (they exist) Replace below call to checkAuth.
     */

    checkAuth(context);

    return context.prisma.mutation.updateChat(
      {
        where: {
          id: args.chatId
        },
        data: {
          members: {
            connect: {
              username: args.username
            }
          }
        }
      },
      info
    );
  },

  sendMessageToChat: async (_, args, context: Context, info) => {
    /* 
     * TODO: Users should only be able to send a 
     * message if they are a member of the chat.
     */

    const userId = getUserId(context);

    if (args.content === "") {
      throw new Error("The message's content cannot be empty");
    }

    return context.prisma.mutation.createMessage(
      {
        data: {
          chat: {
            connect: {
              id: args.chatId
            }
          },
          author: {
            connect: {
              id: userId
            }
          },
          content: args.content
        }
      },
      info
    );
  }
};

export default chatMutations;
