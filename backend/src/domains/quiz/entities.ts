import { BaseEntity } from "shared/BaseEntity";

export interface QuizEntity extends BaseEntity {
  authorId: string;
  title: string;
  imageURL?: string;
  permalink?: string;
  status: "published" | "draft";
}

export interface QuestionEntity extends BaseEntity {
  title: string;
  quizId: string;
  imageURL?: string;
  numberOfAnswers: number;
}

export interface OptionEntity extends BaseEntity {
  text: string;
  isAnswer: boolean;
  questionId: string;
}
