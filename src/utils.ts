import { Prisma } from "./generated/prisma";

export interface Context {
  prisma: Prisma;
  request: any;
}
