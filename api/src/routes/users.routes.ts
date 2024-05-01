import { Router } from "express";
import { register } from "../services/users/register";
import { login } from "../services/users/login";
import { detail } from "../services/users/detail";
import { getAllUsers } from "../services/users/allUsers";

export const usersRouter = Router();

const REGISTER = "register";
const LOGIN = "login";
const USERS = "users";

usersRouter.post(`/${REGISTER}`, register);
usersRouter.post(`/${LOGIN}`, login);
usersRouter.get(`/${USERS}/:id`, detail);
usersRouter.get(`/${USERS}`, getAllUsers);