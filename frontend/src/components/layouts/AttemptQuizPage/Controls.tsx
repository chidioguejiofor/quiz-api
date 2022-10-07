import { Button } from "components/Button";
import React from "react";

type ControlsProps = {
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  isLastQuestion: boolean;
};
export function Controls(props: ControlsProps) {
  return (
    <div className="  mt-10">
      <div className="flex">
        <Button
          htmlType="button"
          type="outlined"
          size="normal"
          onClick={props.onPrevQuestion}
        >
          Previous
        </Button>

        <div className="ml-4 ">
          <Button
            htmlType="button"
            type={props.isLastQuestion ? "green" : "skyblue"}
            size="normal"
            onClick={props.onNextQuestion}
          >
            {props.isLastQuestion ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
