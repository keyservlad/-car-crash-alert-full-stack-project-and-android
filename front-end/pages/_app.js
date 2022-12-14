import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider options={{ clientMaxAge: 0 }} session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
