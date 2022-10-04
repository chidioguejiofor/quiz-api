import { Button } from "components/Button";
import React, { SyntheticEvent } from "react";
import { FormInput } from "../auth/FormInput";

type QuizFormProps = {
  show?: boolean;
  toggleShow: () => void;
  onSubmit: (e: SyntheticEvent) => void;
};
function QuizForm(props: QuizFormProps) {
  const { show, toggleShow, onSubmit } = props;
  const text = show ? "Hide Form" : "Show Quiz form";
  return (
    <div className="mb-4">
      <div>
        <Button onClick={toggleShow} size="small" outlined={show}>
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
