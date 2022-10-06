import { Button } from "components/Button";
import React from "react";

type QuestionControlsProps = {
  publishQuiz: () => void;
  addNewQuestion: () => void;
};
function EditQuizControls(props: QuestionControlsProps) {
  const { publishQuiz, addNewQuestion } = props;
  return (
    <div className="mt-5 flex">
      <Button htmlType="button" size="small" onClick={publishQuiz}>
        Publish Question
      </Button>

      <div className="ml-4">
        <Button
          htmlType="button"
          size="small"
          type="outlined"
          onClick={addNewQuestion}
        >
          Add Question
        </Button>
      </div>
    </div>
  );
}

export default EditQuizControls;
