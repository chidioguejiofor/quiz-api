import React from "react";
import { Header } from "components/Header";
import { AuthInput } from "./AuthInput";
import { AuthForm } from "./AuthForm";
import { pages } from "constants/pages";

export function Signup() {
  return (
    <div>
      <Header />
      <AuthForm
        title="Register"
        subtitle="One step away from seeing how best you match the field"
        linkLabel="Login"
        linkHref={pages.login}
        bottomText="Already have an account?"
      >
        <AuthInput
          type="text"
          name="firstName"
          placeholder="Enter first name"
        />

        <AuthInput type="text" name="lastName" placeholder="Enter last name" />

        <AuthInput
          type="email"
          name="email"
          placeholder="Enter email address"
        />

        <AuthInput
          placeholder="Enter a valid password"
          type="password"
          name="password"
        />
      </AuthForm>
    </div>
  );
}
