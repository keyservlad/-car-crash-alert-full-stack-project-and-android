import dynamic from "next/dynamic";

const ComponentName = dynamic(
  () => import("../components/Map/MaLocalisation"),
  { ssr: false }
);

export default function Home() {
  return (
    <div>
      <ComponentName />
    </div>
  );
}
