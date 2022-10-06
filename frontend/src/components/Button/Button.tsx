import React, { ReactNode } from "react";

const BUTTON_SIZES = {
  lg: "text-btn_32 h-20",
  normal: "text-btn_18 h-12",
  small: "text-btn_14 h-8 w-fit",
};

const BUTTON_TYPES = {
  cta: "bg-red-600 hover:bg-red text-white focus-visible:ring-red focus-visible:ring-2 focus-visible:ring-offset-2 text-btn_14 ",
  skyblue: "text-black bg-skyblue",
  outlined: "text-black border border-skyblue",
};

export type ButtonProps = {
  href?: string;
  children: ReactNode;
  onClick?: () => void;
  htmlType?: "submit" | "button";
  size?: keyof typeof BUTTON_SIZES;
  type?: keyof typeof BUTTON_TYPES;
};
export function Button(props: ButtonProps) {
  const {
    htmlType,
    onClick,
    href,
    children,
    size = "normal",
    type = "skyblue",
  } = props;

  let Component: "button" | "a" = "button";

  const styles = BUTTON_TYPES[type];
  if (props.href) Component = "a";

  const sizeClasses = BUTTON_SIZES[size];
  return (
    <Component
      className={` px-4  rounded-lg inline-grid place-items-center ${sizeClasses} ${styles}`}
      onClick={onClick}
      href={href}
      type={htmlType}
    >
      {children}
    </Component>
  );
}
