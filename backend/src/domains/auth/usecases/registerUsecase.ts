import { AppLogger } from "shared/logger";
import { validateSchema } from "shared/utils/validation";
import { UserExists } from "../errors";
import { AuthRepositoryType } from "../repositories";
import { RegisterRequestType } from "../types";
import { registerInputValidatorSchema } from "../validators";

const logger = AppLogger.create("RegisterUsecase");

export class RegisterUsecase {
  constructor(private authRepository: AuthRepositoryType) {}

  async execute(data: Partial<RegisterRequestType>) {
    logger.info("Registering user into the app...");
    const cleanData = this.cleanInput(data);
    validateSchema(data, registerInputValidatorSchema);

    await this.validateEmail(cleanData.email);

    const user = await this.authRepository.createUser({
      ...cleanData,
    });

    logger.info("Successfully registered user");

    return user;
  }

  private async validateEmail(email: string) {
    const userExist = await this.authRepository.getUserByEmail(email);
    if (userExist) {
      throw new UserExists();
    }
  }

  private capitalize(text?: string) {
    if (!text?.length) return "";
    return text[0].toUpperCase() + text.slice(1).toLowerCase();
  }

  private cleanInput(registerInput: Partial<RegisterRequestType>) {
    return {
      ...registerInput,
      firstName: this.capitalize(registerInput.firstName),
      lastName: this.capitalize(registerInput.lastName),
      email: registerInput.email?.trim().toLowerCase(),
    } as RegisterRequestType;
  }
}
