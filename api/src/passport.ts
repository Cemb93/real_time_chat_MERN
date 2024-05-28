import { Strategy as OAuth2Strategy, Profile } from "passport-google-oauth20";
import passport from "passport";
import { usersModel } from "./models/Users";
import { IUsers } from "./interface/IUsers";
import { VariablesEntorno } from "./types/IEnv";
import { Request } from "express";

const env = process.env as VariablesEntorno;

passport.use(
  new OAuth2Strategy(
      {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_SECRET_CLIENT,
      callbackURL: env.GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
      passReqToCallback: true,
    },
    async function (
      _req: Request, 
      _accessToken: string, 
      _refreshToken: string, 
      profile: Profile, 
      done: Function
    ) {
      // console.log("profile:", profile)
      if (profile && profile.emails) {
        try {
          let user: IUsers | null = await usersModel.findOne({
            email: profile.emails[0].value,
          })
          if (!user) {
            const newUser: IUsers = {
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              password: "",
            }
            user = await usersModel.create(newUser)
            // console.log("NEW USER:", newUser)
            return done(null, user);
          } else {
            return done(null, user);
          }
        }
        catch (error) {
          console.log("Error el Google-profile por:", error)
          return done(error, null);
        }
      } else {
        console.log("sin profile:", profile)
      }
    }
  )
);

passport.serializeUser((user: Express.User, done: Function) => {
  // console.log("user - serializeUser:", user)
  return done(null, user);
});


passport.deserializeUser(async (id: string, done: Function) => {
  // console.log("id:", id);
  try {
    const user: IUsers | null = await usersModel.findById(id);
    // console.log("User - deserializeUser:", user);
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
});
