import { config } from "../infrastructure/config";
import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = config.jwtSecret;

const generateToken = (id: string, role: string) => {
  const jwt = sign({ id, role }, JWT_SECRET, { expiresIn: 900 });
  const data = {
    jwt,
    role,
    expiresIn: 900,
  };
  return data;
};
const verifyToken = (jwt: string) => {
  const isCheck = verify(jwt, JWT_SECRET);
  return isCheck;
};

export { generateToken, verifyToken };
