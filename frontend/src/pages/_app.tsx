import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<any>) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Toaster />
      <ToastContainer />
    </SessionProvider>
  );
}
export default MyApp;
