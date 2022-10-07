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

const settings = {
  published: {
    title: "List of all published quizes",
  },
  myQuizes: {
    title: "List of my quizes",
  },
};

export function HomePage() {
  const router = useRouter();
  const [user] = useUser();
  const token = user?.token as string;

  const [show, setShow] = useState(false);
  const { json: userQuizesRes, refetch } = useMakeAPICall<
    BackendResponse<QuizData[]>
  >(
    router.isReady && token ? "/user/quiz" : null,
    {
      token,
    },
    true
  );

  const [status, setStatus] = useState<keyof typeof settings>("published");

  const { json: publishedQuiz, refetch: refetchPublished } = useMakeAPICall<
    BackendResponse<QuizData[]>
  >(router.isReady ? "/published/quiz/" : null, {}, true);

  const toggleShow = () => setShow(!show);

  const quizes =
    status === "myQuizes" ? userQuizesRes?.data : publishedQuiz?.data;

  const createQuiz = async (e: SyntheticEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const quizInput = formDataToJSON(formData);
    await Quiz.create(quizInput, token);
    refetch();
    refetchPublished();
    form.reset();
  };

  const handleDelete = async (quizId: string) => {
    await Quiz.delete(quizId, token);
    refetch();
    refetchPublished();
  };
  const handleSelectChange = (e: SyntheticEvent) => {
    e.preventDefault();
    const { value } = e.target as HTMLInputElement;
    setStatus(value as any);
  };

  return (
    <>
      <Header />
      <div>
        <div className="mt-2 mb-9 text-center">
          <Typography type="h3">{settings[status].title}</Typography>
        </div>

        <div className=" ml-16">
          {token && (
            <QuizForm
              onSubmit={createQuiz}
              toggleShow={toggleShow}
              show={show}
            />
          )}

          <select className="py-2 px-2 mb-4" onChange={handleSelectChange}>
            {token && <option value="myQuizes">Your Quizes</option>}
            <option value="published">Published Quizes</option>
          </select>

          {quizes?.length ? (
            <CardSection
              onDelete={handleDelete}
              quizes={quizes}
              currentUserId={user?.id}
            />
          ) : null}

          {token && !quizes?.length && (
            <Typography type="p_18">
              No quiz has been created yet. Please create your first Quiz
            </Typography>
          )}
        </div>
      </div>
    </>
  );
}
