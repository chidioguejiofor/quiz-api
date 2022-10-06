import React, { ReactNode } from "react";

type StepperItemProps = {
  active: boolean;
  itemNumber: number;
  title: string;
  children: ReactNode;
};
function StepperItem(props: StepperItemProps) {
  const activeClass = props.active ? "stepper-active" : "";
  return (
    <li className={`stepper-step ${activeClass}`}>
      <div className="stepper-head">
        <span className="stepper-head-icon"> {props.itemNumber} </span>
        <span className="stepper-head-text"> {props.title} </span>
      </div>
      <div className="stepper-content">{props.children}</div>
    </li>
  );
}

export default StepperItem;
