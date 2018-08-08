import * as jwt from "jsonwebtoken";
import { Prisma } from "../generated/prisma";
import { Request, Response } from "express";
import * as cookie from "cookie";

export interface Context {
  prisma: Prisma;
  request?: Request;
  response?: Response;
  /* Requires modified graphql-yoga */
  webSocket?: any;
}

/**
 * NOTE:
 * This requires a modified version of graphql-yoga.
 * This should for the meantime be forked with the modification.
 * See this issue for getting this feature merged into the
 * actual repo.
 */

/* Returns the contents of the 'token' cookie */
const getTokenCookie = (context: Context) => {
  /* The request is a query or mutation */
  if (!context.webSocket) {
    return context.request.cookies.token;
  } else {
    /* The request is a subscription */
    const rawCookie = context.webSocket.upgradeReq.headers.cookie;

    /**
     * NOTE:
     * This check is required because cookie.parse throws a type error
     * if its 1st parameter (in this case rawCookie) isn't a string.
     * rawCookie will only be a string if a token cookie is present.
     */
    if (typeof rawCookie === "string") {
      const parsedCookie = cookie.parse(rawCookie);
      return parsedCookie.token;
    } else {
      /* The user doesn't have a token cookie (they are not logged in) */
      return undefined;
    }
  }
};

class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}

export const getUserId = (context: Context) => {
  const token = getTokenCookie(context);

  /* Throw error early is a token cookie doesn't even exist */
  if (!token) {
    throw new AuthError();
  }

  const { userId } = jwt.verify(token, process.env.APP_SECRET) as {
    userId: string;
  };

  const userExists = context.prisma.exists.User({ id: userId });

  if (!userExists) {
    throw new AuthError();
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
