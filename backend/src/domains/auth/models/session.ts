import { Table, Column, ForeignKey } from "sequelize-typescript";
import { BaseModel } from "shared/BaseModel";
import { SessionEntity } from "../entities";
import { User } from "./user";

@Table({
  tableName: "auth_session",
})
export class Session extends BaseModel<SessionEntity> {
  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    field: "user_id",
  })
  userId: string;

  @Column({
    allowNull: false,
  })
  email: string;

  @Column({ allowNull: false, field: "expires_at" })
  expiresAt: Date;

  get expired() {
    const currentDate = new Date();
    return currentDate > this.expiresAt;
  }
}
