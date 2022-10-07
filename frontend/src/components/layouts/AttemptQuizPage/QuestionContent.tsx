import { Typography } from "components/Typography";
import { OptionData, QuestionData } from "core/models/quiz";
import React from "react";
import { OptionSelector } from "./OptionSelector";

type QuestionContentProps = {
  question: Omit<QuestionData, "isAnswer">;
  currentQuestionNumber: number;
  totalQuestions: number;
  selectedAnswers: Set<string>;

  onOptionClick: (
    question: Omit<QuestionData, "isAnswer">,
    option: OptionData
  ) => void;
};
export function QuestionContent(props: QuestionContentProps) {
  const {
    question,
    currentQuestionNumber,
    totalQuestions,
    selectedAnswers,
    onOptionClick,
  } = props;
  const multichoice = question.numberOfAnswers > 1;

  const infoText = multichoice
    ? "Choose all the answers that apply"
    : "Select one";

  const questionText = `Question ${currentQuestionNumber} of ${totalQuestions}`;

  return (
    <>
      <div className="mt-16 text-center border border-black min-h-[80px] flex items-center justify-center p-3">
        <Typography type="h3">{question.title}</Typography>
      </div>

      <div className="mt-10 mb-14 text-center md:text-left md:flex justify-between">
        <Typography type="p_18">{infoText}</Typography>
        <Typography type="p_18">{questionText}</Typography>
      </div>

      <div className="min-h-[256px]">
        {question.options.map((option) => (
          <OptionSelector
            key={option.id}
            multichoice={multichoice}
            state={selectedAnswers.has(option.id) ? "active" : "inactive"}
            onClick={() => onOptionClick(question, option)}
          >
            {option.text}
          </OptionSelector>
        ))}
      </div>
    </>
  );
}

export default QuestionContent;
