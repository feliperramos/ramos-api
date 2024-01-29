import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import * as dotenv from "dotenv";
import { APP_PORT } from "./enums";
import "./configs/mongooseTimeOut";
import { Routes } from "./routes";

dotenv.config();

const app = express();
app.use(json());
app.use(Routes);

const mongoURI: string = process.env.MONGO_URI!;

mongoose
  .connect(mongoURI, {
    autoIndex: true,
  })
  .then(() => console.log("Connect to MongoDB Server!"))
  .catch(error => console.error(error));

app.listen(APP_PORT, () => {
  console.log(`App is live now in ${APP_PORT}!`);
});
