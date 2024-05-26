import { Request, Response, Router } from "express";
import { register } from "../services/users/register";
import { login } from "../services/users/login";
import { detail } from "../services/users/detail";
import { getAllUsers } from "../services/users/allUsers";
import passport from 'passport'
import "dotenv/config"
import { VariablesEntorno } from "../types/IEnv";
import axios from "axios";

const { URL_CLIENT, GOOGLE_CALLBACK_URL, GOOGLE_CLIENT_ID, GOOGLE_SECRET_CLIENT } = process.env as VariablesEntorno;
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
  // GOOGLE_CALLBACK_URL,
  '/auth/google/callback',
  passport.authenticate("google", {
    // successRedirect: "/login/success",
    successRedirect: `${URL_CLIENT}`,//* URL DEL FRONT
    // failureRedirect: "/login/failed",
    failureRedirect: `${URL_CLIENT}/login`,//* URL DEL FRONT
  }),
  (req, res) => {
    // Autenticación exitosa, redirige al cliente
    console.log("callback:", req.user)
    return res.status(200).json(req.user);
    // return res.redirect(URL_CLIENT);//* URL DEL FRONT
  }
);

usersRouter.get("/login", async (req, res) => {
  // console.log("login", req.user)
  // console.log("isAuthenticated", req.isAuthenticated())
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  } else {
    return res.status(401).json({ message: 'Not Authorized' });
  }
});

usersRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.redirect(`${URL_CLIENT}`);
  });
});
