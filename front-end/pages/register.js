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

  const [errors, setErrors] = useState("");

  const registerUser = async (event) => {
    event.preventDefault();

    const data = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      emergency_contact: emergency_contact,
    };
    try {
      await api.post("/api/register", data);
    } catch (error) {
      setErrors("Erreur lors de la création de l'utilisateur");
    }
    
    signIn("credentials", {
      email,
      password,
      callbackUrl: `${window.location.origin}`,
      redirect: false,
    })
      .then(function (result) {
        router.push(result.url);
      })
      .catch((err) => {
        setErrors("Erreur lors de la création de l'utilisateur");
      });
  };

  return (
    <div className="text-center">
      <h1 className="my-5">S'inscrire</h1>

      <form className="flex flex-col gap-3" onSubmit={registerUser}>
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
        <p className="text-red-500">{errors ?? <>Erreur : {errors}</>}</p>
        <button type="submit">Créer un nouvel utilisateur</button>

        <Link href="/">Se connecter</Link>
      </form>
    </div>
  );
}
