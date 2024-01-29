import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const AuthKey: string = process.env.AUTH_SECRET_KEY!;

interface GetTokenProps {
  params: Object;
}

export function GetToken(params = {}): GetTokenProps {
  return jwt.sign({ params }, AuthKey, {
    expiresIn: 86400,
  });
}
