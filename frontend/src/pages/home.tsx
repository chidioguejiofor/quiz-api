import { pages } from "constants/pages";
import { getSession } from "next-auth/react";

import { GetServerSidePropsContext } from "next";
import React from "react";
import { useUser } from "hooks/useUser";

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

function Home() {
  const [user] = useUser();
  return (
    <div>
      Welcome Home!! {user?.firstName} {user?.lastName}
    </div>
  );
}

export default Home;
