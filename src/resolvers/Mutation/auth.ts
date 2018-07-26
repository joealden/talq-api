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

    /* 
     * TODO: Return better error message with
     * exactly which one (or both) is already in use
     */
    const userExistsWithEmailorUsername = await context.prisma.exists.User({
      OR: [{ email: args.email }, { username: args.username }]
    });

    if (userExistsWithEmailorUsername) {
      /* Could fix here with more exists checks to throw different errors */
      throw new Error(
        "The email address or username entered is already in use"
      );
    }

    const saltRounds = 10;
    const password = await bcrypt.hash(args.password, saltRounds);

    const user = await context.prisma.mutation.createUser({
      data: { ...args, password }
    });

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    context.response.cookie("token", token, {
      /* 1000 years (basically never expires), TODO: work out expiry */
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
      where: { username: args.username }
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
      /* 1000 years (basically never expires) TODO: work out expiry */
      maxAge: 1000 * 60 * 60 * 24 * 365,
      /* JavaScript on the page cannot access its contents */
      httpOnly: true
    });

    return user;
  }
};

export default authMutations;
