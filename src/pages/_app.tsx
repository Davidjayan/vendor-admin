import "@/styles/globals.css";
import { AlertProvider } from "@/utils/providers/AlertProvider";
import { ConfimationAlertProvider } from "@/utils/providers/ConfirmationAlertProvider";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AlertProvider>
        <ConfimationAlertProvider>
          <Component {...pageProps} />
        </ConfimationAlertProvider>
      </AlertProvider>
    </SessionProvider>
  );
}
