import { Context } from "hono";
import { prisma } from "~/lib/prisma";
import { userSchema } from "../schemas/user.schema";
import {
  err,
  success,
  validationErr,
  badRequest,
  notFound,
  serverError,
} from "../utils/response";

export async function createOrUpdateUser(c: Context) {
  try {
    const body = await c.req.json();
    console.log("Received user data:", body);

    const validatedData = userSchema.safeParse(body);

    if (!validatedData.success) {
      console.log("Validation error:", validatedData.error);
      return c.json(validationErr(validatedData.error), 422);
    }

    const { walletAddress, ...data } = validatedData.data;
    console.log("Validated user data:", { walletAddress, ...data });

    if (data.role && !["USER", "SUB_REGISTRAR"].includes(data.role)) {
      console.log("Invalid role:", data.role);
      return c.json(
        badRequest("Invalid role. Must be either 'USER' or 'SUB_REGISTRAR'"),
        400,
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { walletAddress },
    });

    console.log("Existing user:", existingUser);

    let user;
    if (existingUser) {
      console.log("Updating existing user");
      if (data.role && data.role !== existingUser.role) {
        return c.json(
          badRequest(
            "Cannot change user role. Please contact support if this is an error.",
          ),
          400,
        );
      }

      user = await prisma.user.update({
        where: { walletAddress },
        data,
      });
    } else {
      console.log("Creating new user");
      user = await prisma.user.create({
        data: {
          walletAddress,
          ...data,
        },
      });
    }

    console.log("User saved successfully:", user);
    return c.json(success(user), 200);
  } catch (error) {
    console.log("Error creating/updating user:", error);
    return c.json(serverError("Failed to create or update user"), 500);
  }
}

export async function getUserByWallet(c: Context) {
  try {
    const walletAddress = c.req.query("walletAddress");
    console.log("Getting user by wallet address:", walletAddress);

    if (!walletAddress) {
      return c.json(badRequest("Wallet address is required"), 400);
    }

    const user = await prisma.user.findUnique({
      where: { walletAddress },
    });

    console.log("User found:", user);

    if (!user) {
      return c.json(notFound("User not found"), 404);
    }

    return c.json(success(user), 200);
  } catch (error) {
    console.log("Error getting user:", error);
    return c.json(serverError("Failed to get user"), 500);
  }
}
