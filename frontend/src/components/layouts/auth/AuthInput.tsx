import React from "react";
import { Input, InputProps } from "components/Input";

export const AuthInput = (props: InputProps) => {
    const { name, type, placeholder } = props;

    return (
        <div className="mt-4 mb-4 w-full">
            <Input type={type} name={name} placeholder={placeholder} />
        </div>
    );
};
