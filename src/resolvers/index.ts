import Query from "./Query";

import authMutations from "./Mutation/auth";
import chatMutations from "./Mutation/chat";
import userMutations from "./Mutation/user";

/* 
 * TODO: Make is so all queries and mutations
 * apart from signup and login can only be 
 * performed if the client is authenticated
 * (is sending a valid JWT token with their 
 * request).
 */

const Mutation = {
  ...authMutations,
  ...chatMutations,
  ...userMutations
};

const resolvers = {
  Query,
  Mutation
};

export default resolvers;
