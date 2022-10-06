import React from "react";
import Image from "next/image";
import { Typography } from "components/Typography";
import { Button } from "components/Button";

type QuizCardProps = {
  title: string;
  imageURL?: string;
  quizId: string;
  onDelete: () => void;
};
export function QuizCard(props: QuizCardProps) {
  const { title, imageURL, quizId, onDelete } = props;
 
  return (
    <div className="w-full md:w-[400px] rounded-md">
      <div className="h-40 relative w-full">
        <Image
          alt={`Question card: ${title}`}
          src={imageURL || "/html-image.jpeg"}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="h-28 border flex items-center px-4 justify-between">
        <Typography type="p_16">{title}</Typography>

        <div className="flex">
          <div className="mr-4 ">
            <Button href={`/quiz/${quizId}/edit`} size="small">
              Edit
            </Button>
          </div>

          <Button
            type="cta"
            htmlType="button"
            size="small"
            onClick={onDelete}
          >
            <Image
              alt="Delete Question"
              src="/delete.png"
              layout="fixed"
              width={16}
              height={16}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
