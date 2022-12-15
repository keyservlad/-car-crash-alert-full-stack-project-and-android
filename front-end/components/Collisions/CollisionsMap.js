import React from "react";
import { useGeolocated } from "react-geolocated";
import GoogleMapReact from "google-map-react";
import { useSession } from "next-auth/react";
import Map from "../Map/Maps";

const Demo = ({ collisions }) => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  const markers = collisions.map((collision) => {
    return {
      lat: Number(collision.latitude),
      lng: Number(collision.longitude),
    };
  });
  return (
    <>
      <h1 className="text-center mb-12 mt-3">Localisation des collisions</h1>
      {!isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
      ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
      ) : coords ? (
        <>
          <div className="w-[100vw] h-[50vh]">
            <Map
              lat={coords.latitude}
              long={coords.longitude}
              markers={markers}
            />
          </div>
        </>
      ) : (
        <div>Getting the location data&hellip; </div>
      )}
    </>
  );
};

export default Demo;
