import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Overlay from "../components/overlay/Overlay";
import PostForm from "../components/post-form/PostForm";

const MainLayout = () => {
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    posting
      ? document.body.setAttribute("style", `position: fixed`)
      : document.body.setAttribute("style", "");
  }, [posting]);

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
          <PostForm setPosting={setPosting} />
        </>
      )}
    </>
  );
};

export default MainLayout;
