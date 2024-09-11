import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <section className="layout">
        <div className="page">
          <header className="header">
            <Navbar />
          </header>
          <main className="main">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </div>
            <div>
              <Sidebar />
            </div>
          </main>
        </div>

        <footer className="footer">
          <Footer />
        </footer>
      </section>
    </BrowserRouter>
  );
}

export default App;
