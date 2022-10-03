import React from "react";

type ButtonProps = {
  href?: string;
  children: string;
  onClick?: () => void;
  htmlType?: "submit" | "button";
};
export function Button(props: ButtonProps) {
  const { htmlType, onClick, href, children } = props;

  let Component: "button" | "a" = "button";
  if (props.href) Component = "a";

  return (
    <Component
      className=" bg-skyblue h-20 px-10 text-black rounded-lg inline-grid place-items-center text-btn_32"
      onClick={onClick}
      href={href}
      type={htmlType}
    >
      {children}
    </Component>
  );
}
