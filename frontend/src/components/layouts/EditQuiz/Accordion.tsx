import Image from "next/image";
import React, { ReactNode } from "react";

type AccordionItemProps = {
  label: string;
  children: ReactNode;
  controls?: ReactNode;
  expanded?: boolean;
  id: string;
  parentId: string;
  onClick: () => void;
};
export function AccordionItem(props: AccordionItemProps) {
  const { label, children, expanded, id, parentId, onClick, controls } = props;
  return (
    <div className="accordion-item bg-white border border-gray-200">
      <h2 className="accordion-header mb-0">
        <button
          onClick={onClick}
          className={`
      accordion-button
      relative
      flex
      items-center
      w-full
      py-4
      px-5
      text-base text-gray-800 text-left
      bg-white
      border-0
      rounded-none
      transition
      focus:outline-none
      ${expanded ? "" : "collapsed"}
    `}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${id}`}
          aria-expanded={expanded}
          aria-controls={id}
        >
          {label}
        </button>
        {controls}
      </h2>
      <div
        id={id}
        className={`accordion-collapse collapse ${expanded ? "show" : ""}`}
        aria-labelledby="headingOne"
        data-bs-parent={`#${parentId}`}
      >
        <div className="accordion-body py-4 px-5">{children}</div>
      </div>
    </div>
  );
}

type AccordionProps = {
  children: ReactNode;
  id: string;
};

export function Accordion(props: AccordionProps) {
  const { id, children } = props;
  return (
    <div className="accordion" id={id}>
      {children}
    </div>
  );
}
