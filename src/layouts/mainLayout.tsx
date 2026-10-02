import { Outlet } from "react-router";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function MainLayout() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;
