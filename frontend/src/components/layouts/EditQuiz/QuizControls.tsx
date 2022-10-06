import { Button } from "components/Button";
import { Typography } from "components/Typography";
import React, { FormEvent, SyntheticEvent, useState } from "react";
import { FormInput } from "../auth/FormInput";
import EditDeleteControls from "./EditDeleteControls";

type QuizControlsProps = {
  title: string;
  onUpdateQuiz: (e: FormEvent<HTMLFormElement>) => void;
  deleteQuiz: () => void;
};
function QuizControls(props: QuizControlsProps) {
  const [formTitle, setFormTitle] = useState("");
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
    setFormTitle(props.title);
  };

  const handleChange = (e: SyntheticEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setFormTitle(value);
  };

  return (
    <div>
      {!showForm && (
        <div className="mb-8 flex items-center">
          <Typography type="h3">{props.title}</Typography>
          <div className="ml-4">
            <EditDeleteControls
              onDelete={props.deleteQuiz}
              onEdit={toggleForm}
            />
          </div>
        </div>
      )}

      {showForm && (
        <form className="flex items-center" onSubmit={props.onUpdateQuiz}>
          <FormInput
            name="title"
            value={formTitle}
            onChange={handleChange}
            placeholder="Edit Quiz title"
          />
          <div className="ml-8 mr-4">
            <Button htmlType="button" size="small" onClick={toggleForm}>
              Save
            </Button>
          </div>
          <Button
            htmlType="button"
            type="cta"
            size="small"
            onClick={toggleForm}
          >
            Close
          </Button>
        </form>
      )}
    </div>
  );
}

export default QuizControls;
