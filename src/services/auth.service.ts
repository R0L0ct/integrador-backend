import { encrypt, verified } from "../utils/bcrypt.handle";
import prisma from "../config/prismaClient";
import { User } from "interfaces/user.interface";
import { Auth } from "interfaces/auth.interface";
import { generateToken } from "../utils/jwt.handle";

const registerNewUser = async ({ email, password, name, role }: User) => {
  const isCheck = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (isCheck) return "ALREADY_USER";
  const passHash = await encrypt(password);
  const registerNewUser = await prisma.user.create({
    data: {
      email,
      password: passHash,
      name,
      role,
    },
  });

  return registerNewUser;
};

const loginUser = async ({ email, password }: Auth) => {
  const isCheck = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!isCheck) return "NOT_FOUND_USER";

  const passwordHash = isCheck.password;
  const isCorrect = await verified(password, passwordHash);
  if (!isCorrect) return "INCORRECT_PASSWORD";
  const token = generateToken(isCheck.id, isCheck.role);
  const data = {
    token,
    user: {
      id: isCheck.id,
      name: isCheck.name,
    },
  };

  return data;
};

export { registerNewUser, loginUser };
