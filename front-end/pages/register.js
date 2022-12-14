import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import api from "../lib/api";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [emergency_contact, setEmergencyContact] = useState("");

  const registerUser = async (event) => {
    event.preventDefault();

    const data = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      emergency_contact: emergency_contact,
    };

    await api.post("/api/register", data);
    signIn("credentials", {
      email,
      password,
      callbackUrl: `${window.location.origin}/dashboard`,
      redirect: false,
    })
      .then(function (result) {
        router.push(result.url);
      })
      .catch((err) => {
        console.log("Failed to register: " + err.toString());
      });
  };

  return (
    <>
      <h1>S'inscrire</h1>

      <form onSubmit={registerUser}>
        <label>
          Nom:{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:{" "}
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Mot de passe:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Numéro de téléphone:{" "}
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label>
          Numéro de téléphone d'urgence:{" "}
          <input
            type="text"
            value={emergency_contact}
            onChange={(e) => setEmergencyContact(e.target.value)}
          />
        </label>
        <button type="submit">Créer un nouvel utilisateur</button>

        <Link href="/">Se connecter</Link>
      </form>
    </>
  );
}
