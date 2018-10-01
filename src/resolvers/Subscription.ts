import { getUserId, Context } from "./utils";

const Subscription = {
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
