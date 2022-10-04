import { BaseEntity } from "shared/BaseEntity";

export interface QuizEntity extends BaseEntity {
  authorId: string;
  title: string;
  imageURL?: string;
  status: "published" | "draft";
}

export interface QuestionEntity extends BaseEntity {
  title: string;
  quizId: string;
  iamgeURL?: string;
}

export interface OptionEntity extends BaseEntity {
  text: string;
  isAnswer: boolean;
}
