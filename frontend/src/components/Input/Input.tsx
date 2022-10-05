import React, { SyntheticEvent } from "react";

type Controlled = {
  type?: "text" | "password" | "email";
  name: string;
  placeholder?: string;
  required?: boolean;
  value?: string | number;
  onChange?: (e: SyntheticEvent) => void;
};

export type InputProps = Controlled;

export function Input(props: InputProps) {
  return (
    <input
      required={props.required}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
      className="py-3.5 sm:py-3 grow rounded-lg outline-none inline-block w-full h-10 border border-black px-4 "
      value={props.value}
      onChange={props.onChange}
    />
  );
}
