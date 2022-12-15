import { React, useMemo } from "react";

import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  MarkerF,
} from "@react-google-maps/api";

const Map = ({ lat, long, markers }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  const center = useMemo(() => ({ lat: lat, lng: long }), []);
  // const center1 = useMemo(() => ({ lat: -31.292038, lng: 151.118896 }), []);

  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };

  const options = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className="w-full h-full">
      <GoogleMap
        zoom={7}
        options={options}
        center={center}
        mapContainerClassName="w-full h-full"
      >
        {markers.map((marker, i) => (
          <MarkerF onLoad={onLoad} key={i} position={marker} />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
