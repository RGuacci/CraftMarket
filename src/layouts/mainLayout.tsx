import { Outlet } from "react-router";
import Navbar from "../components/navbar";

function MainLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      {/* <footer>Footer</footer> */}
    </>
  );
}

export default MainLayout;
