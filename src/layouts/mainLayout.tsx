import { Outlet } from "react-router";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ScrollToHash from "../components/scrollToHash";

function MainLayout() {
  return (
    <>
      <ScrollToHash />
      <Navbar />
      <main className="bg-base-100 min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
