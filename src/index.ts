import express from "express";
import { json } from "body-parser";
import * as dotenv from "dotenv";
import { APP_PORT } from "./enums";

dotenv.config();

const app = express();
app.use(json());

app.listen(APP_PORT, () => {
  console.log("App is live now!");
});
