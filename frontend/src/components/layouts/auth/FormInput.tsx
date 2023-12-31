import React from "react";
import { Input, InputProps } from "components/Input";

export const FormInput = (props: InputProps) => {
  const { name, type, placeholder, required, value, onChange } = props;

  return (
    <div className="mt-4 mb-4 w-full">
      <Input
        required={required}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
