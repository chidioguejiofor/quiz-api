import { signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Session } from "next-auth";
import { pages } from "constants/pages";

type SessionData = Session & {
  valid: boolean;
  [x: string]: unknown;
};

export function SessionValidator(props: any) {
  const session = useSession();
  const sessionData = session.data as SessionData;
  useEffect(() => {
    let callback = pages.login;
    if (typeof window !== "undefined") {
      callback = `${callback}?next=${location.pathname}`;
    }

    if (session.status === "authenticated" && !sessionData.valid) {
      toast.info("Your session expired. Please login again");

      signOut({ callbackUrl: callback });
    }
  }, [session.data, session.status]);

  return <>{props.children}</>;
}
