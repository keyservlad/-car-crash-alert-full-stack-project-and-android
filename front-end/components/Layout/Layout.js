import Footer from "./Footer";
import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen max-w-[100vw]">
      {/* <Nav /> */}
      <Nav />
      <main className="overflow-hidden min-h-[64.4vh]">{children}</main>
      <Footer />
    </div>
  );
}
