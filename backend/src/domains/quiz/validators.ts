export const createQuizInputValidatorSchema = {
  title: "required|string",
  imageURL: "string",
  authorId: "required|string",
};

export const addQuestionInputValidatorSchema = {
  title: "required|string",
  imageURL: "string",
  quizId: "required|string",
  options: "required|array|min:2|max:6",
};
