import { JWT } from "next-auth/jwt";

export enum Provider {
  GOOGLE = "google",
  APPLE = "apple",
  CREDENTIALS = "credentials",
}

export type Credentials = {
  email: string;
  password: string;
};
export type JWTExtended = JWT & {
  data: any;
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
  id_token?: string;
};

export type SignupInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
