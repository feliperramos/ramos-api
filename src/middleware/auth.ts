import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { AUTH_SECRET_KEY } from "../enums";
import { User } from "../models/users";

dotenv.config();

export const Authentication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const AuthenticationHeader = req.headers.authorization;

  if (!AuthenticationHeader)
    return res.status(401).json({ message: "No Token Provided" });

  const parts = AuthenticationHeader.split(" ");

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).json({ message: "Token Is not Correct" });

  let decoded: any;
  try {
    decoded = jwt.verify(token, AUTH_SECRET_KEY);
  } catch (error) {
    console.log(error);
  }

  if (!decoded) return res.status(401).json({ message: "Token Invalid" });

  const users = await User.findById(decoded?.params?._id);

  if (users) {
    return next();
  } else {
    return res.status(401).json({ message: "Authentication Failed" });
  }
};
