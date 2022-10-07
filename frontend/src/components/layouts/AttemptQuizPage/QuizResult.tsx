import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { pages } from "constants/pages";

import React from "react";

type QuizResultProps = {
  correct: number;
  total: number;
};
export function QuizResult(props: QuizResultProps) {
  const { correct, total } = props;

  const info = `Final Score is ${correct} out of ${total}`;
  return (
    <>
      <div className="mt-16 text-center border border-black min-h-[80px] flex items-center justify-center p-3">
        <Typography type="h3">Test Successfully Completed</Typography>
      </div>

      <div className="mt-10 mb-14 text-center">
        <Typography type="p_18">{info}</Typography>
      </div>

      <div className="flex justify-center">
        <Button href={pages.home} type="outlined">
          Home
        </Button>
      </div>
    </>
  );
}
