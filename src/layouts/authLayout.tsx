import { Outlet } from "react-router";
import Navbar from "../components/navbar";

function AuthLayout() {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
}

export default AuthLayout;
