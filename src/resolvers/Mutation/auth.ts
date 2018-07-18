import * as bcrypt from "bcryptjs";
import * as validator from "validator";
import * as jwt from "jsonwebtoken";

import { Context } from "../utils";

const authMutations = {
  signup: async (_, args, context: Context, _info) => {
    const emailIsValid = validator.isEmail(args.email);

    if (!emailIsValid) {
      throw new Error("The email address entered is not valid");
    }

    const userExistsWithEmail = await context.prisma.exists.User({
      email: args.email
    });

    if (userExistsWithEmail) {
      throw new Error("The email address entered is already in use");
    }

    const saltRounds = 10;
    const password = await bcrypt.hash(args.password, saltRounds);

    const user = await context.prisma.mutation.createUser({
      data: { ...args, password }
    });

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    return { token, user };
  },

  signin: async (_, args, context: Context, _info) => {
    const user = await context.prisma.query.user({
      where: { email: args.email }
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordIsCorrect = await bcrypt.compare(
      args.password,
      user.password
    );

    if (!passwordIsCorrect) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    return { token, user };
  }
};

export default authMutations;
