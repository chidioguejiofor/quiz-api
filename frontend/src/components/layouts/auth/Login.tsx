import React, { SyntheticEvent, useEffect } from "react";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { Header } from "components/Header";
import { FormInput } from "./FormInput";
import { AuthForm } from "./AuthForm";
import { pages } from "constants/pages";
import { useRouter } from "next/router";

export function Login() {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && router.query.error) {
      const errorObject = JSON.parse(router.query.error as string);
      if (errorObject.message) {
        toast.error(errorObject.message);
      }
    }
  }, [router.isReady, router.query]);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await signIn("credentials", { email, password, callbackUrl: pages.home });
  };

  return (
    <div>
      <Header />
      <AuthForm
        title="Login"
        subtitle="One step away from seeing how best you match the field"
        linkLabel="Signup"
        linkHref={pages.register}
        bottomText="Don't have an account?"
        onSubmit={handleSubmit}
      >
        <FormInput
          type="email"
          name="email"
          placeholder="Enter email address"
          required
        />

        <FormInput
          placeholder="Enter a valid password"
          type="password"
          name="password"
          required
        />
      </AuthForm>
    </div>
  );
}
