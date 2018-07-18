import { Context, getUserId } from "../utils";

const chatMutations = {
  startChat: (_, args, context: Context, info) => {
    /* 
     * TODO: Users should only be able to create a
     * chat if they are friends with all selected members.
     */

    const userId = getUserId(context);

    /* args.title is optional */
    const title = args.title ? args.title : null;

    if (args.memberIds.includes(userId)) {
      throw new Error(
        "The currently logged in user ID should not be included in the memberIds array"
      );
    }

    return context.prisma.mutation.createChat(
      {
        data: {
          members: {
            connect: [
              /* ID of user that sent creation request */
              { id: userId },
              /* IDs of other members to be added */
              ...args.memberIds.map(memberId => ({
                id: memberId
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
     */

    return context.prisma.mutation.updateChat(
      {
        where: {
          id: args.chatId
        },
        data: {
          title: args.newTitle
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
     */

    return context.prisma.mutation.updateChat(
      {
        where: {
          id: args.chatId
        },
        data: {
          members: {
            connect: {
              id: args.userId
            }
          }
        }
      },
      info
    );
  },

  sendMessageToChat: (_, args, context: Context, info) => {
    /* 
     * TODO: Users should only be able to send a 
     * message if they are a member of the chat.
     */

    const userId = getUserId(context);

    return context.prisma.mutation.updateChat(
      {
        where: {
          id: args.chatId
        },
        data: {
          messages: {
            create: {
              author: {
                connect: {
                  id: userId
                }
              },
              content: args.content
            }
          }
        }
      },
      info
    );
  }
};

export default chatMutations;
