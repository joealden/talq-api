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

  /* Throw error early is a token cookie doesn't even exist */
  if (!token) {
    throw new Error("Not authorized");
  }

  const { userId } = jwt.verify(token, process.env.APP_SECRET) as {
    userId: string;
  };

  const userExists = context.prisma.exists.User({ id: userId });

  if (!userExists) {
    throw new Error("Not authorized");
  }

  return userId;
};

export const checkAuth = (context: Context) => {
  /* 
   * Performs the same actions as getUserId
   * but throws away the returned ID 
   */
  getUserId(context);
  return undefined;
};
