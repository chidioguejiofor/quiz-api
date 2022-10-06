import { Button, ButtonProps } from "components/Button";
import React, { SyntheticEvent } from "react";
import { FormInput } from "../auth/FormInput";

type QuizFormProps = {
  show?: boolean;
  toggleShow: () => void;
  onSubmit: (e: SyntheticEvent) => void;
};
function QuizForm(props: QuizFormProps) {
  const { show, toggleShow, onSubmit } = props;
  let text = "Show Quiz form";

  let btnType = "skyblue";

  if (show) {
    text = "Hide Form";
    btnType = "outlined";
  }
  return (
    <div className="mb-4">
      <div>
        <Button
          onClick={toggleShow}
          size="small"
          type={btnType as ButtonProps["type"]}
        >
          {text}
        </Button>
        {show && (
          <form className="mb-4 w-[65vw] block" onSubmit={onSubmit}>
            <FormInput required type="text" name="title" placeholder="Title" />

            <Button size="small">Create new Quiz</Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default QuizForm;
