import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { pages } from "constants/pages";
import { Session } from "next-auth";

type SessionData = Session & {
  valid: boolean;
  [x: string]: unknown;
};

export function SessionValidator(props: any) {
  const session = useSession();
  const sessionData = session.data as SessionData;
  useEffect(() => {
    if (session.status === "authenticated" && !sessionData.valid) {
      signOut({ callbackUrl: pages.login });
    }
  }, [session.data, session.status]);

  return <>{props.children}</>;
}
