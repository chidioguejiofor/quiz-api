import { BaseEntity } from "shared/BaseEntity";

export interface UserEntity extends BaseEntity {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export interface SessionEntity extends BaseEntity {
  userId: string;
  email: string;
  expiresAt?: Date | string;
}
