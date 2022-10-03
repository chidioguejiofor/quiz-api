export const registerInputValidatorSchema = {
  firstName: "required|string",
  lastName: "required|string",
  email: "required|email",
  password: "required|string|min:7",
};

export const loginInputValidatorSchema = {
  email: "required|email",
  password: "required|string|min:4",
};

export const refreshTokenSchema = {
  accessToken: "required|min:15",
  refreshToken: "required|min:15",
};
