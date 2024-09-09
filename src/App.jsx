import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";

function App() {
  return (
    <BrowserRouter>
      <section className="layout">
        <header className="header">{/* <Navbar /> */}</header>

        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        <footer className="footer">{/* <Footer /> */}</footer>
      </section>
    </BrowserRouter>
  );
}

export default App;
