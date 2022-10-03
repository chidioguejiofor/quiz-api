import React, { ReactNode } from "react";
import Link from "next/link";
import { Button } from "components/Button";
import { Typography } from "components/Typography";

type AuthFormProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  linkLabel: string;
  linkHref: string;
  bottomText: string;
};
export function AuthForm(props: AuthFormProps) {
  const { title, subtitle, children, linkLabel, linkHref, bottomText } = props;
  return (
    <div className="flex justify-center px-8 items-center h-full mt-8">
      <form className="65vw">
        <div className="mt-10 text-center md:text-left">
          <Typography type="h2" mobileType="h3">
            {title}
          </Typography>
        </div>

        <div className="mt-4 mb-4 md:mt-10 text-center">
          <Typography type="h3" mobileType="p_16">
            {subtitle}
          </Typography>
        </div>

        {children}

        <div className="mt-10 text-center text-p_18">
          <div className="mb-4">
            {bottomText}{" "}
            <Link href={linkHref}>
              <a className="text-blue hover:underline"> {linkLabel}</a>
            </Link>
          </div>
          <Button htmlType="submit" size="normal">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
