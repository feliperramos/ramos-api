import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { AUTH_SECRET_KEY } from "../enums";

dotenv.config();

interface GetTokenProps {
  params: Object;
}

export function GetToken(params = {}): GetTokenProps {
  return jwt.sign({ params }, AUTH_SECRET_KEY, {
    expiresIn: 86400,
  });
}
