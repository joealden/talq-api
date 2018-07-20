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

    context.response.cookie("token", token, {
      /* 1000 years (basically never expires) */
      maxAge: 1000 * 60 * 60 * 24 * 365,
      /* JavaScript on the page cannot access its contents */
      httpOnly: true
    });

    return user;
  },

  /* TODO: think of better return value? */
  signout: (_, _args, context: Context, _info) => {
    if (!context.request.cookies.token) {
      throw new Error("No user to sign out");
    }

    context.response.clearCookie("token");
    return { message: "Successfully logged out" };
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

    context.response.cookie("token", token, {
      /* 1000 years (basically never expires) */
      maxAge: 1000 * 60 * 60 * 24 * 365,
      /* JavaScript on the page cannot access its contents */
      httpOnly: true
    });

    return user;
  }
};

export default authMutations;
