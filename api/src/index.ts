import express, { Application } from "express";
import cors from "cors";
import "dotenv/config"
import { VariablesEntorno } from "./types/IEnv";
const { DB, PORT, URL_CLIENT } = process.env as VariablesEntorno;
import { connect } from 'mongoose';
import { allRoutes } from "./routes";
import passport from 'passport'
import expressSession from "express-session";
import "./passport";
import "./facebook";

const app: Application = express();

const dbConexion = async (): Promise<void> => {
  try {
    if (typeof DB === "string") {
      await connect(DB);
      console.log("Successfull conection to DB")
    }
  } catch (error) {
    console.log("Error in conection for:", error)
  }
}

app.use(
  cors({
    origin: URL_CLIENT,//* URL DEL FRONT
    // origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  expressSession({
    secret: "cd8ef67f-7012-4d19-8b9a-04ce60a0d54d",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(allRoutes);

dbConexion().then(function() {
  app.listen(PORT, function() {
    console.log(`Listening on PORT:`, Number(PORT));
  });
});