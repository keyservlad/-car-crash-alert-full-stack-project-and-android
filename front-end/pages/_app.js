import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import Wrapper from "../components/Wrapper";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";
import AppProvider from "../context/appContext";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Collision App</title>{" "}
        {/* default title : customisable on each page */}
      </Head>
      <SessionProvider
        options={{ clientMaxAge: 0 }}
        session={pageProps.session}
      >
        <AppProvider>
          <Wrapper>
            <Layout>
              <Component {...pageProps} key={router.asPath} />
            </Layout>
          </Wrapper>
        </AppProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
