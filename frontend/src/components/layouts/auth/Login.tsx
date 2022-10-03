import React from "react";
import { Header } from "components/Header";
import { AuthInput } from "./AuthInput";
import { AuthForm } from "./AuthForm";
import { pages } from "constants/pages";

export function Login() {
  return (
    <div>
      <Header />
      <AuthForm
        title="Login"
        subtitle="One step away from seeing how best you match the field"
        linkLabel="Signup"
        linkHref={pages.register}
        bottomText="Don't have an account?"
      >
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
