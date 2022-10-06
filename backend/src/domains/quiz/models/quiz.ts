import { Table, Column } from "sequelize-typescript";
import { BaseModel } from "shared/BaseModel";
import { QuizEntity } from "../entities";

@Table({
  tableName: "quiz",
})
export class Quiz extends BaseModel<QuizEntity> {
  @Column({
    allowNull: false,
    field: "author_id",
  })
  authorId: string;

  @Column({
    allowNull: false,
  })
  title: string;

  @Column({
    allowNull: true,
    field: "image_url",
  })
  imageURL: string;

  @Column({
    allowNull: true,
    field: "permalink",
  })
  permalink: string;

  @Column({
    allowNull: false,
    defaultValue: "draft",
  })
  status: "published" | "draft";
}
