import { Router } from "express";
import { usersRouter } from "./users.routes";
import { chatsRouter } from "./chats.routes";
import { messagesRouter } from "./messages.routes";

export const allRoutes = Router();

allRoutes.use("/", usersRouter);
allRoutes.use("/", chatsRouter);
allRoutes.use("/", messagesRouter);