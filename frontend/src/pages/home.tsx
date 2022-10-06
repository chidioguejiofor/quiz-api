import { pages } from "constants/pages";
import { getSession } from "next-auth/react";

import { GetServerSidePropsContext } from "next";
import React from "react";
import { HomePage } from "components/layouts/Home";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: `${pages.login}?next=/home`,
      },
    };
  }

  return { props: {} };
}

function Home() {
  return <HomePage />;
}

export default Home;
