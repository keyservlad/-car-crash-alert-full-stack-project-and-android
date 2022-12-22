import { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import api from "../lib/api";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import { useGeolocated } from "react-geolocated";

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

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const createCollision = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const data = {
      idUser: session.data.user.id,
      adresse: address,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      level: level,
      sensorX: sensorX,
      sensorY: sensorY,
      sensorZ: sensorZ,
      detail: detail,
      dateCollision: new Date().toISOString(),
    };
    console.log(data);
    let res;
    try {
      res = await axios.post(
        "http://localhost:3001/api_collision/createCollision",
        data
      );
    } catch (error) {
      setErrors("Erreur lors de la création de l'utilisateur");
      setIsLoading(false);
      return;
    }
    console.log(res.data);
    // router.push vers la page de collision
    router.push("/collision/" + res.data.id);
    // setIsLoading(false);
  };

  useEffect(() => {
    if (coords) {
      setLatitude(coords.latitude);
      setLongitude(coords.longitude);
    }
  }, [coords]);

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
        {/* <p className="text-red-500">
          Attention Bug côté backend: Fait crash le serveur...
        </p> */}
        {isLoading ? (
          <div
            type="submit"
            disabled
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit mx-auto flex flex-row gap-4 items-center justify-center"
          >
            Chargement...
            {/* svg loading */}
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z"
              ></path>
            </svg>
          </div>
        ) : (
          // how to get the size of the button fitting the text
          // https://stackoverflow.com/questions/59202075/how-to-make-a-button-as-wide-as-its-text-in-tailwind-css
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit mx-auto"
          >
            Créer une nouvelle collision
          </button>
        )}
      </form>
    </div>
  );
}
