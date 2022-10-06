import { Button } from "components/Button";
import React from "react";

export function Controls() {
  return (
    <div className="  mt-10">
      <div className="flex">
        <Button type="outlined" size="normal">
          Previous
        </Button>

        <div className="ml-4 ">
          <Button type="skyblue" size="normal">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
