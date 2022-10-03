export type RegisterRequestType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type RefreshTokenInput = {
  accessToken: string;
  refreshToken: string;
};
