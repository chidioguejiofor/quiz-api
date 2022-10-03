import { UserEntity } from "../entities";
import { User } from "../models";
import { UserNotFound } from "../errors";

export class AuthRepository {
  public static getUserByEmail(email: string) {
    return User.findOne({ where: { email } });
  }

  public static async createUser(userDetails: UserEntity): Promise<UserEntity> {
    const userData = { ...userDetails };
    userData["password"] = User.generateHash(userData["password"]);
    return User.create(userData);
  }

  public static async getUserWithCredentials(
    email: string,
    password: string
  ): Promise<UserEntity> {
    const user = await User.scope("withPassword").findOne({
      where: { email },
    });
    if (user && user.isPasswordValid(password)) {
      return user;
    }
    throw new UserNotFound();
  }
}

export type AuthRepositoryType = typeof AuthRepository;
