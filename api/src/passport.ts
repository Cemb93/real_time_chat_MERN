// import authGoogle from "passport-google-oauth20";
// const OAuth2Strategy = authGoogle.Strategy;
import { Strategy as OAuth2Strategy } from "passport-google-oauth20";
import passport from "passport";
import { usersModel } from "./models/Users";
import { IUsers } from "./interface/IUsers";
import { VariablesEntorno } from "./types/IEnv";

const env = process.env as VariablesEntorno;

passport.use(
  new OAuth2Strategy(
      {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_SECRET_CLIENT,
      // callbackURL: env.GOOGLE_CALLBACK_URL,// ? http://localhost:6005/auth/google/callback
      callbackURL: '/auth/google/callback',// ? http://localhost:6005/auth/google/callback
      scope: ["profile", "email"],
    },
    async function (
      accessToken: string, refreshToken: string, profile: any, done: Function
    ) {
      // console.log("profile:", profile)
      if (profile) {
        try {
          let user: IUsers | null = await usersModel.findOne({
            email: profile.emails[0].value,
          })
          if (!user) {
            const newUser: IUsers = {
              // googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              password: "",
              // photo: profile.picture,
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

passport.serializeUser((user: any, done) => {
  console.log("user - serializeUser:", user)
  done(null, user._id);
});


passport.deserializeUser((id: string, done) => {
  usersModel.findById(id, (err: any, user: any) => {
    console.log("User - deserializeUser:", user);
    done(err, user);
  });
});

// passport.deserializeUser((user: Express.User, done) => {
//   console.log("user - deserializeUser:", user)
//   done(null, user);
// });
