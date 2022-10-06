import { Header } from "components/Header";
import { toast } from "react-toastify";

import { Quiz } from "core/api/Quiz";
import { useMakeAPICall } from "core/api/useResource";
import {
  BackendResponse,
  QuestionData,
  QuestionInput,
  QuizData,
} from "core/models/quiz";
import { useUser } from "hooks/useUser";
import { useRouter } from "next/router";
import React, { FormEvent, SyntheticEvent, useEffect, useState } from "react";

import { EditQuestionAccordion } from "./EditQuestionAccordion";
import EditQuizControls from "./QuestionControls";
import QuizControls from "./QuizControls";
import { pages } from "constants/pages";
import { Typography } from "components/Typography";
import { Question as QuestionAPI } from "core/api/Question";

type Option = {
  text: string;
  isAnswer: boolean;
  id?: string;
};

type Question = QuestionInput | QuestionData;

export function EditQuizPage() {
  const [user] = useUser();
  const [expandedItem, setExpandedItem] = useState(-1);
  const router = useRouter();
  const quizId = router.query.quizId as string;
  const token = user?.token as string;
  const { json } = useMakeAPICall<BackendResponse<QuestionData[]>>(
    router.isReady ? `/user/quiz/${quizId}/questions` : null,
    {
      token: token,
    }
  );

  const { json: quizJson, refetch: refetchQuiz } = useMakeAPICall<
    BackendResponse<QuizData>
  >(router.isReady ? `/quiz/${quizId}` : null, {
    token: token,
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  useEffect(() => {
    const unsavedQuestions = questions.filter(
      (question) => !("id" in question)
    );

    if (json?.data) {
      setQuestions([...json.data, ...unsavedQuestions]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [json]);

  const handleAccordionClick = (itemIndex: number) => async () => {
    if (expandedItem !== -1) {
      await persistQuestion(expandedItem, false);
    }
    if (itemIndex === expandedItem) {
      setExpandedItem(-1);
    } else {
      setExpandedItem(itemIndex);
    }
  };
  const handleQuestionTitleChange =
    (questionIndex: number) => (e: SyntheticEvent) => {
      const { value } = e.target as HTMLInputElement;
      questions[questionIndex].title = value;
      setQuestions([...questions]);
    };

  const handleDeleteQuestion = (questionIndex: number) => async () => {
    const question = questions[questionIndex];
    if ("id" in question) {
      await QuestionAPI.delete(question, token as string);
    }

    questions.splice(questionIndex, 1);
    setQuestions([...questions]);
    setExpandedItem(-1);
    toast.success("Question deleted");
  };
  const handleAddOption = (questionIndex: number) => () => {
    const question = questions[questionIndex];

    if (question.options.length < 6) {
      question.options = [
        ...question.options,
        {
          text: "",
          isAnswer: false,
        },
      ];
      questions[questionIndex] = question;
      setQuestions([...questions]);
    } else {
      toast.error("A question can have a maximum of 6 options");
    }
  };

  const handleRemoveOption = (questionIndex: number) => (index: number) => {
    const question = questions[questionIndex];

    if (question.options.length <= 2) {
      toast.error("You must have at least 2 options");
      return;
    } else {
      question.options.splice(index, 1);
      question.options = [...question.options];
      questions[questionIndex] = question;
      setQuestions([...questions]);
    }
  };

  const handleOptionChange =
    (questionIndex: number) => (newOption: Option, index: number) => {
      questions[questionIndex].options[index] = newOption;
      setQuestions([...questions]);
    };

  const addNewQuestion = async () => {
    if (expandedItem >= 0) await persistQuestion(expandedItem);
    setExpandedItem(questions.length);

    setQuestions([
      ...questions,
      {
        quizId,
        title: `#${questions.length + 1} <New Question>`,
        options: [
          {
            text: "",
            isAnswer: false,
          },
        ],
      },
    ]);
  };

  const publishQuiz = async () => {
    const hasUnsavedItems = questions.some((question) => !("id" in question));
    if (hasUnsavedItems) {
      toast.error("Cannot publish unsaved questions.");
      return;
    }

    const { message } = await Quiz.publish(quizId, token);
    toast.success(message);
    router.push(pages.home);
  };

  async function persistQuestion(qIndex: number, showError = true) {
    const question = questions[qIndex];

    const hasAtLeastOneAnswer = question.options.some(
      (option) => option.isAnswer
    );
    if (!hasAtLeastOneAnswer) {
      if (showError) toast.error("Must contain at least one answer");
      else {
        toast.warn(
          "Could not save because question must contain at least one answer"
        );
      }
      return;
    }

    try {
      let newQuestion;
      if ("id" in question) {
        newQuestion = await QuestionAPI.update(question, token as string);
      } else {
        newQuestion = await QuestionAPI.create(question, token as string);
      }
      if (!newQuestion.data) {
        toast.error("Error occured while saving question");
        return;
      }

      questions[qIndex] = newQuestion.data;
      setQuestions([...questions]);
      setExpandedItem(-1);
      toast.success("Question updated");
    } catch (error) {
      toast.error("error occured");
    }
  }

  const saveQuestion = async (e: SyntheticEvent, qIndex: number) => {
    e.preventDefault();
    await persistQuestion(qIndex);
  };

  const handleUpdateQuiz = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const { data } = await Quiz.update(
      quizId,
      { ...quizJson?.data, title },
      token
    );

    if (data) {
      toast.success("Successfully updated the quiz");
    }

    refetchQuiz();
  };

  const handleDeleteQuiz = async () => {
    await Quiz.delete(quizId, token);
    router.push(pages.home);
  };

  const quiz = quizJson?.data;
  return (
    <div>
      <Header />

      <div className=" flex justify-center overflow-y-scroll mt-4">
        <div className="w-full max-w-[1200px]">
          <QuizControls
            onUpdateQuiz={handleUpdateQuiz}
            title={quiz?.title || ""}
            deleteQuiz={handleDeleteQuiz}
            showControls={quiz?.status === "draft"}
          />

          {quiz?.status === "published" && (
            <Typography type="h3">
              This Quiz has already been published
            </Typography>
          )}

          {quiz?.status === "draft" && (
            <>
              <div className="my-4">
                <Typography type="p_16">
                  All your changes would be auto saved
                </Typography>
              </div>
              <EditQuestionAccordion
                onSubmit={saveQuestion}
                questions={questions}
                expandedIndex={expandedItem}
                onItemClick={handleAccordionClick}
                onQuestionTitleChange={handleQuestionTitleChange}
                onAddOption={handleAddOption}
                onRemoveOption={handleRemoveOption}
                onOptionChange={handleOptionChange}
                onDeleteQuestion={handleDeleteQuestion}
              />

              <EditQuizControls
                publishQuiz={publishQuiz}
                addNewQuestion={addNewQuestion}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
