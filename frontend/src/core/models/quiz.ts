export type QuizData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  title: string;
  imageURL: null;
  status: string;
  permalink?: string;
};

export type BackendResponse<T> = {
  message: string;
  data: T;
};

export type BackendErrorResponse = {
  message: string;
  errors?: Record<string, string[]>;
};

export type OptionData = {
  id: string;
  text: string;
  isAnswer: boolean;
};

export type QuestionData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  quizId: string;
  title: string;
  imageURL?: string | null;
  numberOfAnswers: number;
  options: OptionData[];
};

export type QuestionInput = {
  quizId: string;
  title: string;
  imageURL?: string | null;

  options: OptionData[];
};
