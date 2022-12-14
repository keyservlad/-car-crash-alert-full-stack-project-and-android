import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const res = await signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: `${window.location.origin}/dashboard`,
      redirect: false,
    });
    console.log(res);
    if (res.error !== null) {
      if (res.status === 401) {
        setLoginError(
          "Your username/password combination was incorrect. Please try again"
        );
      } else {
        setLoginError(res.error);
      }
    } else {
      router.push(res.url);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <p>{loginError ?? <>Erreur : {loginError}</>}</p>
      <label>
        Email:{" "}
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Se connecter</button>

      <Link href="/register">S'enregistrer</Link>
    </form>
  );
}
