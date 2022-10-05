import React from "react";

const BUTTON_SIZES = {
  lg: "text-btn_32 h-20",
  normal: "text-btn_18 h-12",
  small: "text-btn_14 h-8 w-fit",
};

type ButtonProps = {
  href?: string;
  children: string;
  onClick?: () => void;
  htmlType?: "submit" | "button";
  outlined?: boolean;
  size?: keyof typeof BUTTON_SIZES;
};
export function Button(props: ButtonProps) {
  const {
    htmlType,
    onClick,
    href,
    children,
    size = "normal",
    outlined = false,
  } = props;

  let Component: "button" | "a" = "button";

  const outlinedStyles = outlined ? "border border-skyblue" : "bg-skyblue";
  if (props.href) Component = "a";

  const sizeClasses = BUTTON_SIZES[size];
  return (
    <Component
      className={` px-4 text-black rounded-lg inline-grid place-items-center ${sizeClasses} ${outlinedStyles}`}
      onClick={onClick}
      href={href}
      type={htmlType}
    >
      {children}
    </Component>
  );
}
