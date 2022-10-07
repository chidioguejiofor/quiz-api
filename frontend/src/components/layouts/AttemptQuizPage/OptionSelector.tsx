import Image from "next/image";
import React from "react";

const optionStatuses = {
  active: {
    className: "bg-blue2 text-white",
    checkImage: "/check-mark.png",
    radioImage: "/radio-button-white.png",
  },
  inactive: {
    className: "",
    checkImage: "/check-mark-black.png",
    radioImage: "/radio-button-outline.png",
  },
};
type OptionSelectorProps = {
  children: string;
  state?: keyof typeof optionStatuses;
  multichoice?: boolean;
  onClick?: () => void;
};
export const OptionSelector = (props: OptionSelectorProps) => {
  const { state = "inactive", multichoice = false, onClick } = props;
  const settings = optionStatuses[state];
  const imgSrc = multichoice ? settings.checkImage : settings.radioImage;
  return (
    <button
      className={`border w-full pl-4 mb-5 text-left border-[#B4B4B4] flex items-center  h-16 rounded-lg ${settings.className}`}
      onClick={onClick}
    >
      <Image
        alt="Checkmark"
        src={imgSrc}
        layout="fixed"
        width={24}
        height={24}
      />

      <div className="ml-4">{props.children}</div>
    </button>
  );
};
