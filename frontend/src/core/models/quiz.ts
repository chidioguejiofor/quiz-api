export type QuizData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  title: string;
  imageURL: null;
  status: string;
};

export type BackendResponse<T> = {
  message: string;
  data: T[];
};
