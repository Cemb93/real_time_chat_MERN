import express, { Application, Request, Response } from "express";
import cors from "cors";
import "dotenv/config"
const { DB } = process.env;
import { connect } from 'mongoose';
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

app.use(express.json());
app.use(cors());

const PORT = 3001

dbConexion().then(function() {
  app.listen(PORT, function() {
    console.log(`Listening on PORT:`, PORT);
  });
});