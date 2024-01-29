import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/users";
import { GetToken } from "../middleware";

const router = express.Router();

router.post("/auth", [], async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email })
      .select("+password")
      .maxTimeMS(30000);

    if (!user) return res.status(400).json({ message: "User not found" });
    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: "Password Invalid" });

    user.password = "";

    res.status(200).json({ user, token: GetToken(user) });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
  }
});

export { router as AuthenticationRoute };
