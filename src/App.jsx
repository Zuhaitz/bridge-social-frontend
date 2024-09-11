import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <section className="layout">
        <div className="page">
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="/login" element={<Login />} />
          </Routes>
        </div>

        <footer className="footer">
          <Footer />
        </footer>
      </section>
    </BrowserRouter>
  );
}

export default App;
