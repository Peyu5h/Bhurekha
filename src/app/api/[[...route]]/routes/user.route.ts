import { Hono } from "hono";
import {
  createOrUpdateUser,
  getUserByWallet,
} from "../controllers/user.controller";

const userRoutes = new Hono();

userRoutes.post("/", createOrUpdateUser);
userRoutes.get("/", getUserByWallet);

export default userRoutes;
