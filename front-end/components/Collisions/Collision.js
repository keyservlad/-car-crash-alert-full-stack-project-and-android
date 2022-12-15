import React from "react";

const Collision = ({ collision }) => {
  return (
    <>
      <div className="flex justify-center flex-row gap-20">
        <div className="flex flex-col my-2">
          <div className="text-xl font-bold">Date</div>
          <div className="text-xl font-bold">Adresse</div>
          <div className="text-xl font-bold">Utilisateur</div>
          <div className="text-xl font-bold">Latitude</div>
          <div className="text-xl font-bold">Longitude</div>
          <div className="text-xl font-bold">Capteur (X, Y, Z)</div>
          <div className="text-xl font-bold">Détail</div>
        </div>
        <div className="flex flex-col my-2">
          <div className="">
            {collision.dateCollision.split("T")[0].toString()}
          </div>
          <div className="">{collision.adresse}</div>
          <div className="">{collision.user.name}</div>
          <div className="">{collision.latitude}</div>
          <div className="">{collision.longitude}</div>
          <div className="">
            ({collision.sensorX}, {collision.sensorY}, {collision.sensorZ})
          </div>
          <div className="">{collision.detail}</div>
        </div>
      </div>
    </>
  );
};

export default Collision;
