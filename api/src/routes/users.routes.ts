import { Router } from "express";
import { register } from "../services/users/register";
import { login } from "../services/users/login";

export const usersRouter = Router();

const REGISTER = "register";
const LOGIN = "login";

usersRouter.post(`/${REGISTER}`, register);
usersRouter.post(`/${LOGIN}`, login);