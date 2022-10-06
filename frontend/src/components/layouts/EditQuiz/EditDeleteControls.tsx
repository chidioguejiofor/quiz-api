import { Button } from "components/Button";
import React from "react";
import Image from "next/image";

type QuestionControlsProps = {
  onEdit: () => void;
  onDelete: () => void;
};
function EditDeleteControls(props: QuestionControlsProps) {
  const { onEdit, onDelete } = props;
  return (
    <div className="my-3 flex">
      <Button type="skyblue" htmlType="button" size="small" onClick={onEdit}>
        <Image
          alt="Updated Question"
          src="/pencil.png"
          layout="fixed"
          width={16}
          height={16}
        />
      </Button>
      <div className="ml-3">
        <Button type="cta" htmlType="button" size="small" onClick={onDelete}>
          <Image
            alt="Delete Question"
            src="/delete.png"
            layout="fixed"
            width={16}
            height={16}
          />
        </Button>
      </div>
    </div>
  );
}

export default EditDeleteControls;
