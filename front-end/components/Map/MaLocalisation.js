import React from "react";
import { useGeolocated } from "react-geolocated";
import GoogleMapReact from "google-map-react";
import Map from "./Maps";
import { useSession } from "next-auth/react";

const Demo = (props) => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  return (
    <>
      <h1 className="text-center mb-12 mt-3">Ma localisation</h1>
      {!isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
      ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
      ) : coords ? (
        <>
          <table className="mx-auto mb-12">
            <tbody>
              <tr>
                <td>latitude</td>
                <td>{coords.latitude}</td>
              </tr>
              <tr>
                <td>longitude</td>
                <td>{coords.longitude}</td>
              </tr>
              <tr>
                <td>altitude</td>
                <td>{coords.altitude}</td>
              </tr>
              <tr>
                <td>Direction</td>
                <td>{coords.heading}</td>
              </tr>
              <tr>
                <td>Vitesse</td>
                <td>{coords.speed}</td>
              </tr>
            </tbody>
          </table>
          <div className="w-full h-[50vh]">
            <Map
              lat={coords.latitude}
              long={coords.longitude}
              markers={[{ lat: coords.latitude, lng: coords.longitude }]}
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
