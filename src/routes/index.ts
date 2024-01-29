import express, { Request, Response } from "express";
import { Authentication } from "../middleware";

import { UserRouter } from "./users";
import { AuthenticationRoute } from "./auth";

const app = express();
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  res.send({ message: "Ok" });
});

app.use("/", UserRouter);
app.use("/", AuthenticationRoute);

app.use(router);

export { app as Routes };
