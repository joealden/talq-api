import { checkAuth, getUserId, Context } from "./utils";

const Subscription = {
  newChatMessage: {
    subscribe: (_, args, context: Context, _info) => {
      checkAuth(context);

      const selectionSet = `{ 
        node {
          id 
          author {
            username
            firstName
            lastName
          }
          createdAt
          content
        }
      }`;

      return context.prisma.subscription.message(
        {
          /* Look into use of AND (this is possibly wrong) */
          where: {
            mutation_in: ["CREATED"],
            node: {
              chat: {
                id: args.chatId
              }
            }
          }
        },
        selectionSet
      );
    },
    resolve: (payload, _args, _context, _info) => {
      return payload ? payload.message.node : payload;
    }
  },

  updatedChat: {
    subscribe: (_, _args, context: Context, _info) => {
      const userId = getUserId(context);

      const selectionSet = `{
        node {
          id
          title
          members {
            username
            firstName
            lastName
          }
          messages {
            id
            author {
              username
              firstName
              lastName
            }
            createdAt
            content
          }
        }
      }`;

      return context.prisma.subscription.chat(
        {
          where: {
            mutation_in: ["CREATED", "UPDATED"],
            node: {
              members_some: {
                id: userId
              }
            }
          }
        },
        selectionSet
      );
    },
    resolve: (payload, _args, _context, _info) => {
      return payload ? payload.chat.node : payload;
    }
  }
};

export default Subscription;
