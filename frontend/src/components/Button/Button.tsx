import React from "react";

const BUTTON_SIZES = {
  lg: "text-btn_32 h-20",
  normal: "text-btn_18 h-12",
};

type ButtonProps = {
  href?: string;
  children: string;
  onClick?: () => void;
  htmlType?: "submit" | "button";
  size?: keyof typeof BUTTON_SIZES;
};
export function Button(props: ButtonProps) {
  const { htmlType, onClick, href, children, size = "normal" } = props;

  let Component: "button" | "a" = "button";
  if (props.href) Component = "a";

  const sizeClasses = BUTTON_SIZES[size];
  return (
    <Component
      className={`bg-skyblue  px-10 text-black rounded-lg inline-grid place-items-center ${sizeClasses}`}
      onClick={onClick}
      href={href}
      type={htmlType}
    >
      {children}
    </Component>
  );
}
