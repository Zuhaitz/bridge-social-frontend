import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Overlay from "../components/overlay/Overlay";
import PostForm from "../components/post-form/PostForm";

const MainLayout = () => {
  const [posting, setPosting] = useState(false);

  // https://medium.com/yet-sh/in-react-how-to-prevent-body-from-scrolling-when-a-modal-is-opened-bf3b90647902
  useEffect(() => {
    posting
      ? document.body.setAttribute(
          "style",
          `position: fixed; left: 0; right: 0;`
        )
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
          <Overlay setVariable={setPosting} />
          <PostForm setPosting={setPosting} />
        </>
      )}
    </>
  );
};

export default MainLayout;
