import * as jwt from "jsonwebtoken";
import { Prisma } from "../generated/prisma";
import { Request, Response } from "express";

export interface Context {
  prisma: Prisma;
  request: Request;
  response: Response;
}

export const getUserId = (context: Context) => {
  const { token } = context.request.cookies;

  if (!token) {
    throw new Error("Not authorized");
  }

  const { userId } = jwt.verify(token, process.env.APP_SECRET) as {
    userId: string;
  };

  return userId;
};
