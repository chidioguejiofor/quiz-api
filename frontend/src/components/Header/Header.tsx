import Link from "next/link";
import React from "react";
import { Typography } from "components/Typography";
import { pages } from "constants/pages";

export const Header = () => {
  return (
    <div className="text-skyblue bg-navyblue h-20 grid place-items-center">
      <Link href={pages.landingPage}>
        <a>
          <Typography type="h3">ProfQuiz</Typography>
        </a>
      </Link>
    </div>
  );
};
