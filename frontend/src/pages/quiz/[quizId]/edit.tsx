import { pages } from "constants/pages";
import { getSession } from "next-auth/react";

import { GetServerSidePropsContext } from "next";

import { EditQuizPage } from "components/layouts/EditQuiz/EditQuizPage";
import React from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: pages.login,
      },
    };
  }

  return { props: {} };
}

const EditQuiz = () => {
  return <EditQuizPage />;
};

export default EditQuiz;
