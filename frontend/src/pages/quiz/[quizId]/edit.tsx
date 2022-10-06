import { pages } from "constants/pages";
import { getSession } from "next-auth/react";

import { GetServerSidePropsContext } from "next";

import { EditQuizPage } from "components/layouts/EditQuiz/EditQuizPage";
import React from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const quizId = context.params?.quizId as string;
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: `${pages.login}?next=/quiz/${quizId}/edit`,
      },
    };
  }

  return { props: {} };
}

const EditQuiz = () => {
  return <EditQuizPage />;
};

export default EditQuiz;
