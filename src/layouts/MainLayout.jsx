import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

const MainLayout = () => {
  return (
    <>
      <header className="header">
        <Navbar />
      </header>
      <main className="main">
        <div className="container">
          <Outlet />
        </div>
        <div>
          <Sidebar />
        </div>
      </main>
    </>
  );
};

export default MainLayout;
