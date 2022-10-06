import { Header } from "components/Header";
import { Typography } from "components/Typography";
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
import EditDeleteControls from "./EditDeleteControls";
import QuestionControls from "./QuestionControls";
import QuizControls from "./QuizControls";
import { pages } from "constants/pages";

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

  const { json: quizJson } = useMakeAPICall<BackendResponse<QuizData>>(
    router.isReady ? `/quiz/${quizId}` : null,
    {
      token: token,
    }
  );

  console.log("quizJson==>", quizJson);

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
      await Quiz.deleteQuestion(question, token as string);
    }

    questions.splice(questionIndex, 1);
    setQuestions([...questions]);
    setExpandedItem(-1);
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
      alert("A question can have a maximum of 6 options");
    }
  };

  const handleRemoveOption = (questionIndex: number) => (index: number) => {
    const question = questions[questionIndex];

    if (question.options.length <= 2) {
      alert("You must have at least 2 options");
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

  const addNewQuestion = () => {
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

  const publishQuiz = () => {
    const hasUnsavedItems = questions.some((question) => !("id" in question));
    if (hasUnsavedItems) {
      alert("Cannot publish unsaved questions.");
    }
  };

  async function persistQuestion(qIndex: number, showError = true) {
    const question = questions[qIndex];

    const hasAtLeastOneAnswer = question.options.some(
      (option) => option.isAnswer
    );
    if (!hasAtLeastOneAnswer) {
      if (showError) alert("Must contain at least one answer");
      return;
    }

    try {
      let newQuestion;
      if ("id" in question) {
        newQuestion = await Quiz.updateQuestion(question, token as string);
      } else {
        newQuestion = await Quiz.createQuestion(question, token as string);
      }

      questions[qIndex] = newQuestion.data;
      setQuestions([...questions]);
      setExpandedItem(-1);
    } catch (error) {
      alert("error occured");
    }
  }

  const saveQuestion = async (e: SyntheticEvent, qIndex: number) => {
    e.preventDefault();
    await persistQuestion(qIndex);
  };

  const handleUpdateQuiz = async (e: FormEvent) => {
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
  };

  const handleDeleteQuiz = async () => {
    await Quiz.deleteQuiz(quizId, token);
    router.push(pages.home);
  };

  return (
    <div>
      <Header />

      <div className=" flex justify-center overflow-y-scroll mt-4">
        <div className="w-full max-w-[1200px]">
          <QuizControls
            onUpdateQuiz={handleUpdateQuiz}
            title={quizJson?.data.title || ""}
            deleteQuiz={handleDeleteQuiz}
          />
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

          <QuestionControls
            publishQuiz={publishQuiz}
            addNewQuestion={addNewQuestion}
          />
        </div>
      </div>
    </div>
  );
}
