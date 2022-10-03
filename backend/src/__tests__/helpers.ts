import app from "infrastructure/app";
import chai from "chai";
import { UserEntity } from "domains/auth/entities";
import { User } from "domains/auth/models";

export const loginUser = async (email: string, password: string) => {
  const response = await chai.request(app).post("/api/auth/login").send({
    email,
    password,
  });

  const { accessToken, refreshToken } = response.body;

  return { accessToken, refreshToken };
};

export const createMockUser = async (userData: UserEntity) => {
  return await User.create({
    ...userData,
    password: User.generateHash(userData.password),
  });
};
