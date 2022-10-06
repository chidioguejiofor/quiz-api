import React from "react";

const BADGE_COLORS = {
  blue: "bg-blue",
  green: "bg-green-500",
};
type BadgeProps = {
  color: keyof typeof BADGE_COLORS;
  children: string;
};

const capitalize = (text: string) => {
  return text[0].toUpperCase() + text.slice(1);
};
export function Badge(props: BadgeProps) {
  const colorClass = BADGE_COLORS[props.color];
  return (
    <span
      className={`text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold ${colorClass} text-white rounded`}
    >
      {capitalize(props.children)}
    </span>
  );
}

export default Badge;
