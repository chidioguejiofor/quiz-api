import { Header } from "components/Header";
import { Quiz } from "core/api/Quiz";
import { useMakeAPICall } from "core/api/useResource";
import { BackendResponse, OptionData, QuestionData } from "core/models/quiz";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Controls } from "./Controls";
import QuestionContent from "./QuestionContent";
import { QuizResult } from "./QuizResult";

function AttemptQuizPage() {
  const router = useRouter();
  const permalink = router.query.permalink as string;
  const endpoint = `published/quiz/${permalink}/questions`;
  const { json } = useMakeAPICall<BackendResponse<QuestionData[]>>(
    router.isReady ? endpoint : null
  );

  const [results, setResults] = useState<null | any>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const quizQuestions = json?.data;
  const [userAnswers, setUserAnswers] = useState<Record<string, string[]>>({});

  const gotoPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const gotoNextQuestion = async () => {
    const diff = (quizQuestions?.length as number) - currentQuestionIndex;
    if (diff > 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const { data, message } = await Quiz.submitQuiz(permalink, userAnswers);
      toast.success(message);
      setResults(data);
    }
  };
  const handleOptionClick = (
    question: Omit<QuestionData, "isAnswer">,
    option: OptionData
  ) => {
    const existingsAnswers = new Set<string>(userAnswers[question.id] || []);
    const ismultichoice = question.numberOfAnswers > 1;

    if (existingsAnswers.has(option.id)) {
      existingsAnswers.delete(option.id);
    } else {
      if (!ismultichoice) existingsAnswers.clear();
      existingsAnswers.add(option.id);
    }

    setUserAnswers({
      ...userAnswers,
      [question.id]: Array.from(existingsAnswers),
    });
  };
  let currentAnswer: string[] = [];
  if (quizQuestions) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentAnswer = userAnswers[currentQuestion.id] || [];
  }

  return (
    <div>
      <Header />
      <div className=" flex justify-center overflow-y-scroll p-4 ">
        <div className="w-full max-w-[1200px]">
          {!results && quizQuestions && (
            <>
              <QuestionContent
                currentQuestionNumber={currentQuestionIndex + 1}
                totalQuestions={quizQuestions.length}
                question={quizQuestions[currentQuestionIndex]}
                selectedAnswers={new Set(currentAnswer)}
                onOptionClick={handleOptionClick}
              />
              <Controls
                onNextQuestion={gotoNextQuestion}
                onPrevQuestion={gotoPrevQuestion}
                isLastQuestion={
                  currentQuestionIndex + 1 === quizQuestions.length
                }
              />
            </>
          )}

          {results && (
            <QuizResult
              correct={results.correctAnswerCount}
              total={results.totalQuestions}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AttemptQuizPage;
