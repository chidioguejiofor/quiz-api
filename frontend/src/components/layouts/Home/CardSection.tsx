import { QuizCard } from "components/QuestionCard";
import { QuizData } from "core/models/quiz";
import React from "react";

type CardSectionProps = {
  quizes?: QuizData[];
  onDelete: (quizId: string) => void;
};
function CardSection(props: CardSectionProps) {
  const { quizes, onDelete } = props;

  return (
    <>
      {quizes && (
        <div className="grid justify-center md:justify-start grid-cols-[repeat(auto-fill,400px)] gap-8 ">
          {quizes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quizId={quiz.id}
              title={quiz.title}
              onDelete={() => onDelete(quiz.id)}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default CardSection;
