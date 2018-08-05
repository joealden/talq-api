import { Context, getUserId } from "../utils";

const userMutations = {
  addFriend: (_, args, context: Context, info) => {
    /* 
     * TODO: Check needs to be made to ensure that the 
     * username is valid (a user exists with the username
     * provided)
     */

    const userId = getUserId(context);

    return context.prisma.mutation.updateUser(
      {
        where: {
          id: userId
        },
        data: {
          friends: {
            connect: {
              username: args.username
            }
          }
        }
      },
      info
    );
  },

  removeFriend: (_, args, context: Context, info) => {
    /* 
     * TODO: Check needs to be made to ensure that the 
     * username is valid (a user exists with the username
     * provided)
     */

    const userId = getUserId(context);

    return context.prisma.mutation.updateUser(
      {
        where: {
          id: userId
        },
        data: {
          friends: {
            disconnect: {
              username: args.username
            }
          }
        }
      },
      info
    );
  },

  changeNames: (_, args, context: Context, info) => {
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

  changeEmail: (_, args, context: Context, info) => {
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
  },

  changeUsername: (_, args, context: Context, info) => {
    /* 
     * TODO: Check needs to be made to ensure that the 
     * username is not already in use.
     */

    const userId = getUserId(context);

    return context.prisma.mutation.updateUser(
      {
        where: {
          id: userId
        },
        data: {
          username: args.username
        }
      },
      info
    );
  }
};

export default userMutations;
