import { Router } from "express";
import { usersRouter } from "./users.routes";

export const allRoutes = Router();

allRoutes.use("/", usersRouter);