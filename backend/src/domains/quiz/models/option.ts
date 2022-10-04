import { Table, Column, ForeignKey } from "sequelize-typescript";
import { BaseModel } from "shared/BaseModel";
import { OptionEntity } from "../entities";
import { Question } from "./question";

@Table({
  tableName: "option",
})
export class Option extends BaseModel<OptionEntity> {
  @ForeignKey(() => Question)
  @Column({
    allowNull: false,
    field: "question_id",
  })
  questionId: string;

  @Column({
    allowNull: false,
  })
  text: string;

  @Column({
    allowNull: false,
    field: "is_answer",
  })
  isAnswer: boolean;
}
