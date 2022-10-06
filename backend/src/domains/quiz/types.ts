export type QuestionInput = {
  title: string;
  imageURL: string;
  quizId: string;
  options: {
    text: string;
    isAnswer: boolean;
  }[];
};
