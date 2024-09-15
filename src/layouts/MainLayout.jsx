import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Overlay from "../components/overlay/Overlay";

const MainLayout = () => {
  const [posting, setPosting] = useState(false);

  return (
    <>
      <header className="header">
        <Navbar setPosting={setPosting} />
      </header>
      <main className="main">
        <div className="container">
          <Outlet />
        </div>
        <div>
          <Sidebar />
        </div>
      </main>

      {posting && (
        <>
          <Overlay />
        </>
      )}
    </>
  );
};

export default MainLayout;
