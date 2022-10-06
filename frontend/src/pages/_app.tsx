import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import { SessionValidator } from "../components/SessionValidator/SessionValidator";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<any>) {
  return (
    <SessionProvider session={session}>
      <SessionValidator>
        <Component {...pageProps} />
      </SessionValidator>
    </SessionProvider>
  );
}
export default MyApp;
