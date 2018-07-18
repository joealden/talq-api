import { Context, getUserId } from "../utils";

const userMutations = {
  addFriend: (_, args, context: Context, info) => {
    const userId = getUserId(context);

    return context.prisma.mutation.updateUser(
      {
        where: {
          id: userId
        },
        data: {
          friends: {
            connect: {
              id: args.friendId
            }
          }
        }
      },
      info
    );
  },

  changeUserName: (_, args, context: Context, info) => {
    const userId = getUserId(context);

    return context.prisma.mutation.updateUser(
      {
        where: {
          id: userId
        },
        data: {
          firstName: args.firstName,
          lastName: args.lastName
        }
      },
      info
    );
  },

  changeUserEmail: (_, args, context: Context, info) => {
    const userId = getUserId(context);

    return context.prisma.mutation.updateUser(
      {
        where: {
          id: userId
        },
        data: {
          email: args.email
        }
      },
      info
    );
  }
};

export default userMutations;
