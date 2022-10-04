import React from "react";
import { useWindowSize } from "hooks/useWindowSize";

type HTMLTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

type TypographyOption = [string, HTMLTags];

const TYPES = {
  h1: ["text-h1", "h1"],
  h2: ["text-h2", "h2"],
  h3: ["text-h3", "h3"],
  p_18: ["text-p_18", "p"],
  p_16: ["text-p_16", "p"],
};

type Props = {
  type: keyof typeof TYPES;
  mobileType?: keyof typeof TYPES;
  children: string;
};

export function Typography(props: Props) {
  const { children, type, mobileType } = props;
  const [isMobile] = useWindowSize();
  const finalType = isMobile ? mobileType || type : type;

  const [className, Component] = TYPES[finalType] as TypographyOption;

  return <Component className={className}>{children}</Component>;
}
