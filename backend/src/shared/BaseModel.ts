import { v4 } from "uuid";
import {
  Column,
  Model,
  Default,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import { BaseEntity } from "./BaseEntity";

export class BaseModel<T extends BaseEntity> extends Model<T> {
  @Default(v4)
  @Column({ primaryKey: true })
  id: string;

  @CreatedAt
  @Column({ field: "created_at" })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at" })
  updatedAt: Date;
}
