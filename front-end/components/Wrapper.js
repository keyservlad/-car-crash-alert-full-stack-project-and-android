import * as React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "./Layout/Layout";

export default function Wrapper(props) {
  const session = useSession();
  const router = useRouter();

  if (
    (session !== null && session?.status === "authenticated") ||
    router.pathname === "/login" ||
    router.pathname === "/register" ||
    router.pathname === "/ma-localisation" ||
    router.pathname === "/"
  ) {
    return props.children;
  } else {
    if (session?.status === "loading") return <h1>Loading...</h1>;
    return (
      <Layout>
        <div className="text-center mt-12">
          <h1>Vous n'êtes pas authentifié</h1>

          <Link className="underline" href="/login">
            Se connecter
          </Link>
        </div>
      </Layout>
    );
  }
}
