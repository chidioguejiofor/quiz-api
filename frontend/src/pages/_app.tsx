import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from "react-hot-toast";
import { ToastContainer, toast } from "react-toastify";
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
        <Toaster />
        <ToastContainer />
      </SessionValidator>
    </SessionProvider>
  );
}
export default MyApp;
