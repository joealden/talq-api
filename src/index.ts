import { GraphQLServer } from "graphql-yoga";
import { Prisma } from "prisma-binding";
import * as dotenv from "dotenv";

import resolvers from "./resolvers";

dotenv.config();

const server = new GraphQLServer({
  typeDefs: "src/schema.graphql",
  resolvers,
  /*
   * Hide resolveType warning on Node type from showing in
   * in the console when booting the server. This warning
   * occurs because of a disparity between the resolvers
   * exposed by the Prisma service and the application server.
   * 
   * Refer to the following github issue for more information:
   * https://github.com/prismagraphql/prisma/issues/2225
   */
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: "src/generated/prisma.graphql",
      endpoint: process.env.PRISMA_ENDPOINT,
      secret: process.env.PRISMA_SECRET
    })
  })
});

server.start(() =>
  console.log(`GraphQL server is running on http://localhost:4000`)
);
