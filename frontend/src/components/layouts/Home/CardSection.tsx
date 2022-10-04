import { QuestionCard } from "components/QuestionCard";
import { QuizData } from "core/models/quiz";
import React from "react";

type CardSectionProps = {
  quizes?: QuizData[];
};
function CardSection(props: CardSectionProps) {
  const { quizes } = props;
  return (
    <>
      {quizes && (
        <div className="grid justify-center md:justify-start grid-cols-[repeat(auto-fill,400px)] gap-8 ">
          {quizes.map((quiz) => (
            <QuestionCard key={quiz.id} title={quiz.title} />
          ))}
        </div>
      )}
    </>
  );
}

export default CardSection;
