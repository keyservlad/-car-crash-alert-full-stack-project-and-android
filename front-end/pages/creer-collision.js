import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import api from "../lib/api";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

export default function CreerCollision() {
  const session = useSession();
  const router = useRouter();

  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [level, setLevel] = useState("");
  const [sensorX, setSensorX] = useState("");
  const [sensorY, setSensorY] = useState("");
  const [sensorZ, setSensorZ] = useState("");
  const [detail, setDetail] = useState("");

  const [errors, setErrors] = useState("");

  const createCollision = async (event) => {
    event.preventDefault();

    const data = {
      idUser: session.data.user.id,
      addresse: address,
      latitude: latitude,
      longitude: longitude,
      level: level,
      sensorX: sensorX,
      sensorY: sensorY,
      sensorZ: sensorZ,
      detail: detail,
      dateCollision: new Date(),
    };
    console.log(data);
    try {
      await axios.post(
        "http://localhost:3001/api_collision/createCollision",
        data
      );
    } catch (error) {
      setErrors("Erreur lors de la création de l'utilisateur");
    }

    // router.push vers la page de collision
  };

  return (
    <div className="text-center">
      <h1 className="my-5">Créer une collision</h1>

      <form className="flex flex-col gap-3" onSubmit={createCollision}>
        <label>
          Adresse:{" "}
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          Latitude:{" "}
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </label>
        <label>
          Longitude:{" "}
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </label>
        <label>
          Niveau:{" "}
          <input
            type="text"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />
        </label>
        <label>
          CapteurX:{" "}
          <input
            type="text"
            value={sensorX}
            onChange={(e) => setSensorX(e.target.value)}
          />
        </label>
        <label>
          CapteurY:{" "}
          <input
            type="text"
            value={sensorY}
            onChange={(e) => setSensorY(e.target.value)}
          />
        </label>
        <label>
          Capteurz:{" "}
          <input
            type="text"
            value={sensorZ}
            onChange={(e) => setSensorZ(e.target.value)}
          />
        </label>
        <label>
          Details:{" "}
          <input
            type="text"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </label>
        <p className="text-red-500">{errors ?? <>Erreur : {errors}</>}</p>
        <p className="text-red-500">Attention Bug côté backend: Fait crash le serveur...</p>
        <button type="submit">Créer une nouvelle collision</button>
      </form>
    </div>
  );
}
