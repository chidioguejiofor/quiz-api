import { Typography } from "components/Typography";
import React from "react";
import { OptionSelector } from "./OptionSelector";

export function QuestionContent() {
  return (
    <>
      <div className="mt-16 text-center border border-black min-h-[80px] flex items-center justify-center p-3">
        <Typography type="h3">
          What is the name of Nigeria’s President?
        </Typography>
      </div>

      <div className="mt-10 mb-14 text-center md:text-left md:flex justify-between">
        <Typography type="p_18">Choose all that apply</Typography>
        <Typography type="p_18">Question 1 of 10</Typography>
      </div>

      <OptionSelector state="active" multichoice>
        What is the name of Nigeria’s President?
      </OptionSelector>

      <OptionSelector state="inactive" multichoice>
        What is the name of Nigeria’s President?
      </OptionSelector>

      <OptionSelector state="active">
        What is the name of Nigeria’s President?
      </OptionSelector>
      <OptionSelector>What is the name of Nigeria’s President?</OptionSelector>
    </>
  );
}

export default QuestionContent;
