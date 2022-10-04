import { Header } from "components/Header";
import { Typography } from "components/Typography";
import { Quiz } from "core/api/Quiz";
import { useMakeAPICall } from "core/api/useResource";
import { BackendResponse, QuizData } from "core/models/quiz";
import { useUser } from "hooks/useUser";
import React, { SyntheticEvent, useState } from "react";
import { formDataToJSON } from "utils/formHelpers";
import CardSection from "./CardSection";
import QuizForm from "./QuizForm";

export function HomePage() {
  const [user] = useUser();
  const token = user?.token;

  const [show, setShow] = useState(false);
  const { data: quizesRes, refetch } = useMakeAPICall<
    BackendResponse<QuizData>
  >(token ? "/user/quiz" : null, {
    token,
  });
  const toggleShow = () => setShow(!show);

  const quizes = quizesRes?.data;
  const title = quizes?.length ? "List of Quizes" : "Create first Quiz";

  const createQuiz = async (e: SyntheticEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const quizInput = formDataToJSON(formData);
    await Quiz.createQuiz(quizInput, token as string);
    refetch();
    form.reset();
  };

  return (
    <>
      <Header />
      <div>
        <div className="mt-2 mb-9 text-center">
          <Typography type="h3">{title}</Typography>
        </div>

        <div className=" ml-16">
          <QuizForm onSubmit={createQuiz} toggleShow={toggleShow} show={show} />

          <CardSection quizes={quizes} />
        </div>
      </div>
    </>
  );
}
