import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import CollisionRows from "../components/Collisions/CollisionRows";

const dashboard = ({ collisions }) => {
  const session = useSession();
  collisions = collisions.filter(
    (collision) => collision.user.id === session.data.user.id
  );
  console.log(collisions);
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <h1 className="my-10">Liste de mes collisions</h1>
      <CollisionRows collisions={collisions} />
    </div>
  );
};

export default dashboard;

export async function getStaticProps() {
  let collisions = await axios.get(
    "http://localhost:3001/api_collision/collisions"
  );
  collisions = collisions.data;

  return {
    props: { collisions },
    revalidate: 10,
  };
}
