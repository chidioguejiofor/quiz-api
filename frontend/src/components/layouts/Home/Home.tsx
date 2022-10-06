import { Header } from "components/Header";
import { Typography } from "components/Typography";
import { Quiz } from "core/api/Quiz";
import { useMakeAPICall } from "core/api/useResource";
import { BackendResponse, QuizData } from "core/models/quiz";
import { useUser } from "hooks/useUser";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import { formDataToJSON } from "utils/formHelpers";
import CardSection from "./CardSection";
import QuizForm from "./QuizForm";

export function HomePage() {
  const router = useRouter();
  const [user] = useUser();
  const token = user?.token as string;

  const [show, setShow] = useState(false);
  const { json: quizesRes, refetch } = useMakeAPICall<
    BackendResponse<QuizData[]>
  >(
    router.isReady && token ? "/user/quiz" : null,
    {
      token,
    },
    true
  );

  console.log("user==>", user);

  const toggleShow = () => setShow(!show);

  const quizes = quizesRes?.data;
  const title = quizes?.length ? "List of Quizes" : "Create first Quiz";

  const createQuiz = async (e: SyntheticEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const quizInput = formDataToJSON(formData);
    await Quiz.create(quizInput, token);
    refetch();
    form.reset();
  };

  const handleDelete = async (quizId: string) => {
    await Quiz.delete(quizId, token);
    refetch();
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

          {quizes?.length ? (
            <CardSection
              onDelete={handleDelete}
              quizes={quizes}
              currentUserId={user?.id}
            />
          ) : null}

          {!quizes?.length && (
            <Typography type="p_18">
              No quiz has been created yet. Please create your first Quiz
            </Typography>
          )}
        </div>
      </div>
    </>
  );
}
