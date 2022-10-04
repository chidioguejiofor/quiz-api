import { Table, Column, ForeignKey, HasMany } from "sequelize-typescript";
import { BaseModel } from "shared/BaseModel";
import { QuestionEntity } from "../entities";
import { Option } from "./option";
import { Quiz } from "./quiz";

@Table({
  tableName: "question",
})
export class Question extends BaseModel<QuestionEntity> {
  @ForeignKey(() => Quiz)
  @Column({
    allowNull: false,
    field: "quiz_id",
  })
  quizId: string;

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
    allowNull: false,
    field: "number_of_answers",
  })
  numberOfAnswers: number;

  @HasMany(() => Option)
  options: Option[];
}
