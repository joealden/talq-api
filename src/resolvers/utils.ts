import * as jwt from "jsonwebtoken";
import { Prisma } from "../generated/prisma";

export interface Context {
  prisma: Prisma;
  request: any;
}

export const getUserId = context => {
  const Authorization = context.request.get("Authorization");

  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as {
      userId: string;
    };

    return userId;
  }

  throw new Error("Not authorized");
};
