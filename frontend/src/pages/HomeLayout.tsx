
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
  return (
    <>
      <Navbar />

      <main className="pt-[7vh]">
        <Outlet />
      </main>
    </>
  );
};

export default HomeLayout;
