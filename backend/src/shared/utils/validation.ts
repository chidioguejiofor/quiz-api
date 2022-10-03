import { InvalidInputData } from "shared/errors";
import Validator, { Rules } from "validatorjs";

export const validateSchema = (data: any, schema: Rules): void => {
  const validation = new Validator(data, schema);

  if (validation.fails()) {
    throw new InvalidInputData("", validation.errors.errors);
  }
};
