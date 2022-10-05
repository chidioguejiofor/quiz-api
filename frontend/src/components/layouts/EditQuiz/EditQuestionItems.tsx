import React, { SyntheticEvent } from "react";
import { AccordionItem } from "./Accordion";
import AddOptionsForm from "./AddOptionsForm";

type EditQuestionItemProps = {
  questions: any[];
  expandedIndex: number;
  onItemClick: (qIndex: number) => () => void;
  onQuestionTitleChange: (qIndex: number) => (e: SyntheticEvent) => void;
  onOptionChange: (qIndex: number) => (newOption: any, index: number) => void;
  onAddOption: (qIndex: number) => () => void;
  onRemoveOption: (qIndex: number) => (index: number) => void;
};
export function EditQuestionItems(props: EditQuestionItemProps) {
  const {
    questions,
    expandedIndex,
    onItemClick,
    onQuestionTitleChange,
    onAddOption,
    onRemoveOption,
    onOptionChange,
  } = props;

  return (
    <>
      {questions.map((question, qIndex) => {
        const label = question.id
          ? question.title
          : `${question.title} (unsaved)`;
        return (
          <AccordionItem
            key={question.id}
            label={label}
            parentId="questions"
            id={question.id}
            expanded={expandedIndex === qIndex}
            onClick={onItemClick(qIndex)}
          >
            <AddOptionsForm
              onQuestionTitleChange={onQuestionTitleChange(qIndex)}
              questionTitle={question.title}
              options={question.options}
              onAddOption={onAddOption(qIndex)}
              onRemoveOption={onRemoveOption(qIndex)}
              onOptionChange={onOptionChange(qIndex)}
            />
          </AccordionItem>
        );
      })}
    </>
  );
}
