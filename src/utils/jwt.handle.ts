import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "token1234";

const generateToken = (id: string) => {
  const jwt = sign({ id }, JWT_SECRET);
  return jwt;
};
const verifyToken = (jwt: string) => {
  const isCheck = verify(jwt, JWT_SECRET);
  return isCheck;
};

export { generateToken, verifyToken };
