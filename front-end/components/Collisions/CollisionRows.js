import React from "react";

import dynamic from "next/dynamic";
import Link from "next/link";
import Collision from "./Collision";

const ComponentName = dynamic(() => import("./CollisionsMap"), { ssr: false });

const CollisionRows = ({ collisions }) => {
  return (
    <>
      <div className="">
        {(!collisions || collisions.length === 0) ?? (
          <div className="text-2xl">Aucune collision</div>
        )}
        {collisions?.map((collision, i) => {
          return (
            <Link
              href={`/collision/${collision.id}`}
              key={collision.id}
              className="flex flex-col my-10 hover:shadow-sm"
            >
              <h1 className="text-2xl">Collision {i + 1}</h1>
              <Collision collision={collision} />
            </Link>
          );
        })}
      </div>
      <div className="">
        <ComponentName collisions={collisions} />
      </div>
    </>
  );
};

export default CollisionRows;
