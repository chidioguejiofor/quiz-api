import { Button } from "components/Button";
import React, { SyntheticEvent } from "react";
import { FormInput } from "../auth/FormInput";

type Option = {
  text: string;
  isAnswer: boolean;
  id?: string;
};
type AddOptionsFormProps = {
  options: Option[];
  questionTitle: string;
  onQuestionTitleChange: (e: SyntheticEvent) => void;
  onOptionChange: (newOption: Option, index: number) => void;
  onAddOption: () => void;
  onRemoveOption: (index: number) => void;
};
const AddOptionsForm = (props: AddOptionsFormProps) => {
  const {
    questionTitle,
    options,
    onAddOption,
    onRemoveOption,
    onOptionChange,
    onQuestionTitleChange,
  } = props;

  const handleOptionChange =
    (option: Option, index: number) => (e: SyntheticEvent) => {
      const { value, checked, name } = e.target as HTMLInputElement;
      let finalValue: string | boolean = value;

      if (name === "isAnswer") {
        finalValue = checked;
      }

      onOptionChange({ ...option, [name]: finalValue }, index);
    };
  return (
    <form>
      <FormInput
        name="title"
        type="text"
        placeholder="Enter title"
        required
        onChange={onQuestionTitleChange}
        value={questionTitle}
      ></FormInput>
      <h3>Options</h3>
      <table className=" border w-full mt-4 text-center">
        <thead>
          <tr className="py-4">
            <th>Text</th>
            <th>Is Answer</th>
            <th>Controls</th>
          </tr>
        </thead>

        <tbody>
          {options.map((option, index) => (
            <tr key={option.id || index}>
              <td className="py-4">
                <div className="flex justify-center">
                  <div className="md:w-[400px]">
                    <FormInput
                      name="text"
                      type="text"
                      placeholder="Enter option text"
                      value={option.text}
                      onChange={handleOptionChange(option, index)}
                      required
                    />
                  </div>
                </div>
              </td>
              <td className="py-4">
                <input
                  type="checkbox"
                  name="isAnswer"
                  checked={option.isAnswer}
                  onChange={handleOptionChange(option, index)}
                />
              </td>
              <td>
                <Button
                  onClick={() => onRemoveOption(index)}
                  htmlType="button"
                  outlined
                  size="small"
                >
                  Remove Item
                </Button>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={2} className=" border ">
              <div className="flex justify-center">
                <div className="mr-4">
                  <Button
                    onClick={onAddOption}
                    htmlType="button"
                    outlined
                    size="small"
                  >
                    Add Option
                  </Button>
                </div>
                <Button size="small">Save Question</Button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </form>
  );
};

export default AddOptionsForm;
