import { Strategy as FacebookStrategy, Profile } from "passport-facebook";
import passport from "passport";
import { VariablesEntorno } from "./types/IEnv";
import { IUsers } from "./interface/IUsers";
import { usersModel } from "./models/Users";

const env = process.env as VariablesEntorno;

passport.use(
  new FacebookStrategy(
    {
      clientID: env.FACEBOOK_ID,
      clientSecret: env.FACEBOOK_SECRET,
      // callbackURL: 'https://www.example.com/oauth2/redirect/facebook',
      callbackURL: env.FACEBOOK_CALLBACK_URL,
      scope: ["email"],
    }, 
    async function(
      accessToken: string, 
      refreshToken: string, 
      profile: Profile, 
      done: Function
    ) {
      console.log("facebook - profile:", profile)
      if (profile) {
        try {
          let user: IUsers | null = await usersModel.findOne({
            name: profile.displayName,
          });
          if (!user) {
            const newUser: IUsers = {
              facebookId: profile.id,
              name: profile.displayName,
              email: "",
              password: "",
            }
            user = await usersModel.create(newUser)
            // console.log("NEW USER:", newUser)
            return done(null, user);
          } else {
            return done(null, user);
          }
        } catch (error) {
          console.log("Error el Facebook-profile por:", error)
          return done(error, null);
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("serializeUser - user:", user)
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  console.log("serializeUser - obj:", obj)
  done(null, obj);
});