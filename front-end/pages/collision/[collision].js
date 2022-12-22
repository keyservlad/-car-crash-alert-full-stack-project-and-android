import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Collision from "../../components/Collisions/Collision";

export default function ProductPage({ collision }) {
  const session = useSession();
  console.log(session);
  return (
    <>
      <Head>
        <title>Collision : {collision.id}</title>
      </Head>
      <div className="text-center h-full w-full">
        <h1 className="my-10">
          {collision.user.id === session.data.user.id
            ? "Votre collision"
            : `Collision de ${collision.user.name}`}
        </h1>
        <Collision collision={collision} isMap={true} />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  let collisions = await axios.get(
    "http://localhost:3001/api_collision/collisions"
  );
  collisions = collisions.data;

  const paths = collisions.map((item) => {
    const collision = String(item.id);
    return {
      params: {
        collision,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let collision = await axios.get(
    "http://localhost:3001/api_collision/Onecollision/" + params.collision
  );
  collision = collision.data;

  return {
    props: {
      collision,
    },
    revalidate: 10,
  };
}
