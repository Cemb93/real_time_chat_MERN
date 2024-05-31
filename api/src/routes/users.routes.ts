import { NextFunction, Request, Response, Router } from "express";
import { register } from "../services/users/register";
import { login } from "../services/users/login";
import { detail } from "../services/users/detail";
import { getAllUsers } from "../services/users/allUsers";
import passport from 'passport'
import "dotenv/config"
import { VariablesEntorno } from "../types/IEnv";
import axios from "axios";

const { URL_CLIENT, GOOGLE_CALLBACK_URL } = process.env as VariablesEntorno;
// console.log("URL_CLIENT:", URL_CLIENT)

export const usersRouter = Router();

const REGISTER = "register";
const LOGIN = "login";
const USERS = "users";

usersRouter.post(`/${REGISTER}`, register);
usersRouter.post(`/${LOGIN}`, login);
usersRouter.get(`/${USERS}/:_id`, detail);
usersRouter.get(`/${USERS}`, getAllUsers);

// * SignIn.
usersRouter.get("/auth/google", 
  passport.authenticate("google", { 
    scope: ["profile", "email"], 
  })
);

// * Callback from Google
usersRouter.get(
  GOOGLE_CALLBACK_URL,
  passport.authenticate("google", {
    successRedirect: `${URL_CLIENT}/dashboard`,//* URL DEL FRONT
    failureRedirect: `${URL_CLIENT}/login`,//* URL DEL FRONT
  }),
  (req: Request, res: Response) => {
    // Autenticación exitosa, redirige al cliente
    console.log("callback:", req.user)
    return res.status(200).json(req.user);
    // return res.redirect(URL_CLIENT);//* URL DEL FRONT
  }
);

usersRouter.get("/login", async (req: Request, res: Response) => {
  // console.log("login", req.user)
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  } else {
    return res.status(401).json({ message: 'Not Authorized' });
  }
});

usersRouter.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  console.log("logout")
  req.logout((err) => {
    console.log("Error CERRANDO SESSION:", err)
    if (err) {
      return next(err);
    }
    console.log("OK CERRANDO SESSION:")
    return res.redirect(`${URL_CLIENT}/login`);
  });
});
