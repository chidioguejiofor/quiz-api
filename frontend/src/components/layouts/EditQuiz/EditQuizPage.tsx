import { Button } from "components/Button";
import { Header } from "components/Header";
import { Typography } from "components/Typography";
import { Quiz } from "core/api/Quiz";
import { useMakeAPICall } from "core/api/useResource";
import { BackendResponse, QuestionData, QuestionInput } from "core/models/quiz";
import { useUser } from "hooks/useUser";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useEffect, useState } from "react";

import { Accordion } from "./Accordion";
import { EditQuestionItems } from "./EditQuestionItems";

type Option = {
  text: string;
  isAnswer: boolean;
  id?: string;
};

export function EditQuizPage() {
  const [user] = useUser();
  const [expandedItem, setExpandedItem] = useState(-1);
  const router = useRouter();
  const quizId = router.query.quizId as string;
  const { json } = useMakeAPICall<BackendResponse<QuestionData>>(
    router.isReady ? `/user/quiz/${quizId}/questions` : null,
    {
      token: user?.token,
    }
  );

  const [questions, setQuestions] = useState<(QuestionInput | QuestionData)[]>(
    []
  );
  useEffect(() => {
    const unsavedQuestions = questions.filter(
      (question) => !("id" in question)
    );

    if (json?.data) {
      setQuestions([...json.data, ...unsavedQuestions]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [json]);

  const handleAccordionClick = (itemIndex: number) => () => {
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

  const saveQuestion = async (e: SyntheticEvent, qIndex: number) => {
    e.preventDefault();

    const question = questions[qIndex];
    const hasAtLeastOneAnswer = question.options.some(
      (option) => option.isAnswer
    );
    if (!hasAtLeastOneAnswer) {
      alert("Must contain at least one answer");
      return;
    }

    try {
      const newQuestion = await Quiz.createQuestion(
        question as QuestionInput,
        user?.token as string
      );

      questions[qIndex] = newQuestion.data;
      setQuestions([...questions]);
      setExpandedItem(-1);
    } catch (error) {
      alert("error occured");
    }
  };
  return (
    <div>
      <Header />

      <div className=" flex justify-center overflow-y-scroll">
        <div className="w-full max-w-[1200px]">
          <div className="mb-8">
            <Typography type="h3">Editing Quiz</Typography>
          </div>

          <Accordion id="questions">
            <EditQuestionItems
              onSubmit={saveQuestion}
              questions={questions}
              expandedIndex={expandedItem}
              onItemClick={handleAccordionClick}
              onQuestionTitleChange={handleQuestionTitleChange}
              onAddOption={handleAddOption}
              onRemoveOption={handleRemoveOption}
              onOptionChange={handleOptionChange}
            />
          </Accordion>
          <div className="mt-5 flex">
            <Button htmlType="button" size="small" onClick={publishQuiz}>
              Publish Question
            </Button>

            <div className="ml-4">
              <Button
                htmlType="button"
                size="small"
                outlined
                onClick={addNewQuestion}
              >
                Add Question
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
