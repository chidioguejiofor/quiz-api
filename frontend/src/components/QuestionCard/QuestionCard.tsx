import React from "react";
import Image from "next/image";
import { Typography } from "components/Typography";
import { Button } from "components/Button";
import Badge from "components/Badge/Badge";

type QuizCardProps = {
  title: string;
  imageURL?: string;
  quizId: string;
  onDelete: () => void;
  authorId: string;
  permalink?: string;
  currentUserId?: string;
  status: string;
};
export function QuizCard(props: QuizCardProps) {
  const {
    title,
    imageURL,
    quizId,
    onDelete,
    currentUserId,
    authorId,
    status,
    permalink,
  } = props;

  const permissions = {
    canEdit: currentUserId === authorId && status !== "published",
    canTakeTest: status === "published",
    canDelete: currentUserId === authorId,
  };

  const badgeColor = status === "published" ? "green" : "blue";
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
        <div>
          <Typography type="p_16">{title}</Typography>
          <Badge color={badgeColor}>{status}</Badge>
        </div>

        <div className="flex">
          {permissions.canEdit && (
            <Button href={`/quiz/${quizId}/edit`} size="small">
              Edit
            </Button>
          )}

          {permissions.canTakeTest && (
            <Button href={`/quiz/attempt/${permalink}`} size="small">
              Take Quiz
            </Button>
          )}

          {permissions.canDelete && (
            <div className="ml-4 ">
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
          )}
        </div>
      </div>
    </div>
  );
}
