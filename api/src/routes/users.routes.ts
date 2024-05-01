import { Router } from "express";
import { register } from "../services/users/register";

export const usersRouter = Router();

const REGISTER = "register";

usersRouter.post(`/${REGISTER}`, register);