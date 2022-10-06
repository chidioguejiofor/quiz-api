import { Header } from "components/Header";
import React from "react";
import { Controls } from "./Controls";
import QuestionContent from "./QuestionContent";

function AttemptQuizPage() {
  return (
    <div>
      <Header />
      <div className=" flex justify-center overflow-y-scroll p-4 ">
        <div className="w-full max-w-[1200px]">
          <QuestionContent />
          <Controls />
        </div>
      </div>
    </div>
  );
}

export default AttemptQuizPage;
