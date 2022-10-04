import { Request } from "express";

export type AuthRequest<Body = any, Params = any, Query = any> = Request<
  Params,
  unknown,
  Body,
  Query
> & {
  decoded?: {
    userId: string;
    userEmail: string;
  };
};
