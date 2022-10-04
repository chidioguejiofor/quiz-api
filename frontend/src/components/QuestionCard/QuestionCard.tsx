import React from "react";
import Image from "next/image";
import { Typography } from "components/Typography";
import { Button } from "components/Button";

type QuestionCardProps = {
  title: string;
  imageURL?: string;
};
export function QuestionCard(props: QuestionCardProps) {
  const { title, imageURL } = props;
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
        <Button size="small">Edit</Button>
      </div>
    </div>
  );
}
