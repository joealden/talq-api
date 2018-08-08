import { checkAuth, Context } from "./utils";

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
  }
};

export default Subscription;
