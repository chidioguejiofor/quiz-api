import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { marketing } from "constants/pages/landing";
import React from "react";

export default function MarkettingMessage() {
  return (
    <div className="relative  bg-[url(/landing-bg-image.png)] bg-no-repeat  bg-center lg:bg-cover ">
      <div className="bg-[#000000b2] min-h-[calc(100vh-80px)] py-5 md:py-0  text-center h-full text-white w-full flex justify-center pb-5">
        <div className="md:w-[65vw] w-full grid place-items-center px-2">
          <div>
            <div>
              <Typography type="h1" mobileType="h2">
                {marketing.title}
              </Typography>
            </div>
            <div className="mt-20 mb-10 lg:mb-20">
              <Typography type="h3" mobileType="p_18">
                {marketing.subtitle}
              </Typography>
            </div>

            <div>
              <Button href="/page2">{marketing.btnLabel}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
