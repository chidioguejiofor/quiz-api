import React, { SyntheticEvent } from "react";
import { Accordion, AccordionItem } from "./Accordion";
import AddOptionsForm from "./AddOptionsForm";
import EditDeleteControls from "./EditDeleteControls";

type EditQuestionItemProps = {
  questions: any[];
  expandedIndex: number;
  onItemClick: (qIndex: number) => () => void;
  onQuestionTitleChange: (qIndex: number) => (e: SyntheticEvent) => void;
  onOptionChange: (qIndex: number) => (newOption: any, index: number) => void;
  onAddOption: (qIndex: number) => () => void;
  onRemoveOption: (qIndex: number) => (index: number) => void;
  onSubmit: (e: SyntheticEvent, qIndex: number) => void;
  onDeleteQuestion: (qIndex: number) => () => void;
};
export function EditQuestionAccordion(props: EditQuestionItemProps) {
  const {
    questions,
    expandedIndex,
    onItemClick,
    onQuestionTitleChange,
    onAddOption,
    onRemoveOption,
    onOptionChange,
    onDeleteQuestion,
    onSubmit,
  } = props;

  return (
    <Accordion id="questions">
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
            controls={
              <EditDeleteControls
                onDelete={onDeleteQuestion(qIndex)}
                onEdit={onItemClick(qIndex)}
              />
            }
          >
            <AddOptionsForm
              onSubmit={(e) => onSubmit(e, qIndex)}
              onQuestionTitleChange={onQuestionTitleChange(qIndex)}
              questionTitle={question.title}
              options={question.options}
              onAddOption={onAddOption(qIndex)}
              onRemoveOption={onRemoveOption(qIndex)}
              onOptionChange={onOptionChange(qIndex)}
              onDeleteQuestion={onDeleteQuestion(qIndex)}
            />
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
