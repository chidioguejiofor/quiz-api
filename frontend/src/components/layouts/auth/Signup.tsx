import React, { SyntheticEvent } from "react";
import { Header } from "components/Header";
import { AuthInput } from "./AuthInput";
import { AuthForm } from "./AuthForm";
import { pages } from "constants/pages";
import { Auth } from "core/api/Auth";
import { useRouter } from "next/router";

export function Signup() {
  const router = useRouter();
  
  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const signupInput: any = {};
    formData.forEach((value, key) => (signupInput[key] = value));
    const data = await Auth.signup(signupInput);
    if (data) {
      router.push(pages.login);
    }
  };

  return (
    <div>
      <Header />
      <AuthForm
        title="Register"
        subtitle="One step away from seeing how best you match the field"
        linkLabel="Login"
        linkHref={pages.login}
        bottomText="Already have an account?"
        onSubmit={handleSubmit}
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
