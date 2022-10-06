import Image from "next/image";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import React, { FormEvent, SyntheticEvent, useState } from "react";
import { FormInput } from "../auth/FormInput";
import EditDeleteControls from "./EditDeleteControls";
import { pages } from "constants/pages";
type QuizControlsProps = {
  title: string;
  onUpdateQuiz: (e: FormEvent<HTMLFormElement>) => void;
  deleteQuiz: () => void;
};
function QuizControls(props: QuizControlsProps) {
  const { onUpdateQuiz, title, deleteQuiz } = props;
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

  const handleUpdateClick = (e: FormEvent<HTMLFormElement>) => {
    onUpdateQuiz(e);
    toggleForm();
  };

  return (
    <div className="h-20">
      {!showForm && (
        <div className="mb-8 flex items-center justify-between">
          <Button htmlType="button" href={pages.home} size="small">
            <Image
              alt="Back"
              src="/back-button.png"
              layout="fixed"
              width={16}
              height={16}
            />
          </Button>

          <Typography type="h3">{title}</Typography>

          <EditDeleteControls onDelete={deleteQuiz} onEdit={toggleForm} />
        </div>
      )}

      {showForm && (
        <form className="flex items-center" onSubmit={handleUpdateClick}>
          <div className="mr-4">
            <Button htmlType="button" href={pages.home} size="small">
              <Image
                alt="Back"
                src="/back-button.png"
                layout="fixed"
                width={16}
                height={16}
              />
            </Button>
          </div>

          <FormInput
            name="title"
            value={formTitle}
            onChange={handleChange}
            placeholder="Edit Quiz title"
          />
          <div className="ml-8 mr-4">
            <Button size="small">Save</Button>
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
