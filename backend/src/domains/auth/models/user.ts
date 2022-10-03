import { Table, Column, DefaultScope, Scopes } from "sequelize-typescript";
import bcrypt from "bcryptjs";

import { BaseModel } from "shared/BaseModel";
import { UserEntity } from "../entities";

@DefaultScope(() => ({
  attributes: {
    exclude: ["password"],
  },
}))
@Scopes(() => ({
  withPassword: {
    attributes: {
      include: ["password"],
    },
  },
}))
@Table({
  tableName: "user",
})
export class User extends BaseModel<UserEntity> {
  @Column({
    allowNull: false,
    field: "first_name",
  })
  firstName: string;

  @Column({
    allowNull: false,
    field: "last_name",
  })
  lastName: string;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: true })
  password: string;

  static generateHash(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  public isPasswordValid(unhashedPassword: string) {
    return bcrypt.compareSync(unhashedPassword, this.password as string);
  }
}
