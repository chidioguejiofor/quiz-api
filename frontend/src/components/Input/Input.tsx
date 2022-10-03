import React from "react";

export type InputProps = {
  type?: "text" | "password"|"email";
  name: string;
  placeholder?: string;
};
export function Input(props: InputProps) {
  return (
    <input
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
      className="py-3.5 sm:py-3 grow rounded-lg outline-none inline-block w-full h-12 border border-black px-4 "
    />
  );
}
