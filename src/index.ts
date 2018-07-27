import { GraphQLServer, Options } from "graphql-yoga";
import { Prisma } from "prisma-binding";
import * as dotenv from "dotenv";
import * as cookieParser from "cookie-parser";

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

/* So that userId util function found in util.ts can work */
server.express.use(cookieParser());

const serverOptions: Options = {
  port: process.env.APP_PORT || 4000,
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL
  }
};

server.start(serverOptions, ({ port }) =>
  console.log(
    `Talq API Server started, listening on port ${port} for incoming requests.`
  )
);
