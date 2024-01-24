import express, { Request, Response } from "express";
import { Authentication } from "../middleware";

const app = express();
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  res.send({ message: "Ok" });
});
