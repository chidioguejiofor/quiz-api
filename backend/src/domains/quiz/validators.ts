export const createQuizInputValidatorSchema = {
  title: "required|string",
  imageURL: "string",
  authorId: "required|string",
};

export const updateQuizInputSchema = {
  title: "required|string",
  imageURL: "string",
  authorId: "required|string",
};

export const publishQuizSchema = {
  quizId: "required|string",
  authorId: "required|string",
};

export const submitQuizSchema = {
  permalink: "required|string",
};

export const addQuestionInputValidatorSchema = {
  title: "required|string",
  imageURL: "string",
  quizId: "required|string",
  options: "required|array|min:2|max:6",
};

export const updateQuestionInputSchema = {
  ...addQuestionInputValidatorSchema,
  questionId: "required|string",
};

export const deleteQuestionInputSchema = {
  questionId: "required|string",
  quizId: "required|string",
};
